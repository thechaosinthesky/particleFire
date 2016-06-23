var bcrypt = require('bcryptjs'),
    Q = require('q'),
    config = require('../config.js'),
    db = config.db,
    Users = db.get('users'),
    Profiles = db.get('profiles'),
    Devices = db.get('devices'),
    IOs = db.get('ios');
var _ = require('underscore');

// //used in local-signup strategy
exports.localReg = function (email, password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "email": email,
    "password": hash
  };
  //check if username is already assigned in our database
  Users.findOne({email: email}).then(function (data) {
    if (data) {
      console.log('username already exists');
      deferred.resolve(false); //username already exists
    }
    else {
      Users.insert(user).then(function (user) {
        console.log("USER: " + user);
        deferred.resolve(user);
      });
    }
  });

  return deferred.promise;
};

// //check if user exists
//     //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
//       //if password matches take into website
//   //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (email, password) {
  var deferred = Q.defer();

  Users.findOne({email: email})
  .then(function (data){
    if (data) {
      var hash = data.password;
      if (bcrypt.compareSync(password, hash)) {
        deferred.resolve(data);
      } else {
        console.log("PASSWORDS NOT MATCH");
        deferred.resolve(false);
      }
    }
    else {
      if(err.body.message == 'The requested items could not be found.'){
        console.log("COULD NOT FIND USER IN DB FOR SIGNIN");
        deferred.resolve(false);
      } else {
        deferred.reject(new Error(err));
      }
    }
  });

  return deferred.promise;
};

exports.updateUser = function (req, callback) {
  var params = req.body;
  var user_id = req.params.user_id;
  var user = req.user;
  var valid = false;
  var result = {
    "status":200,
    "data": {},
    "user": user
  };
  var userObj = {};
  
  if(params.password && params.password.length > 0){
    valid = true;
    userObj['password'] = bcrypt.hashSync(params.password, 8);
  }
  if(params.pin && params.pin.length == 4){
    valid = true;
    userObj['pin'] = params.pin;
  }

  if(valid){
    if(req.user.admin || req.user._id == user_id){
      Users.findAndModify({
        "query": {'_id': user_id},
        "update": {$set: userObj}
      },
      { "upsert": true }, function (err, user) {
        result.data = user;
        result.user = user;
        if (err){
          result.status = 400;
          result.error = err;
        }

        callback(result);
      });
    }
    else{
      result.status = 403;
      result.error = "Unauthorized.";
      callback(result);
    }
  }
  else{
    callback(result);
  }
};

exports.listUsers = function (req, callback) {
  var params = req.params;

  Users.find({}, function (err, users) {
    callback(users);
  });
};

exports.getUser = function (req, callback) {
  var params = req.params;
  var user_id = params.user_id;
  var result = {
    "status":403,
    "data": {
      "user": req.user,
      "devices": []
    }
  };

  if(req.user._id == user_id || req.user.admin){
    Users.findOne({_id:Users.id(user_id)}, function (err, user) {
      result.status = 200;
      result.data.user = user;
      if(user.device_ids){
        var obj_ids = user.device_ids.map(function(obj_id){ return Devices.id(obj_id) });
        Devices.find({_id:{$in: obj_ids}}, function (err, devices) {
          result.data.devices = devices; 
          if (err) {
            result.status = 400;
            result.error = "There was an error fetching the devices. Please try again.";
          }
          callback(result);
        });
      }
      else{
        callback(result);
      }
    }); 
  }
  else{
    result.error = "Unauthorized.";
    callback(result);
  }
};

exports.addProfile = function (req, callback) {
  var params = req.body;
  var user = req.user;
  var result = {
    "status":400,
    "data": {},
    "error": "There was an error saving the profile. Please try again.",
    "user": user
  };

  if(params.name && params.name.length > 0){
    var profileObj = {
      "name": params.name,
      "io_ids": [],
      "accesses": [
        {
          "user_id": user._id,
          "role": "owner"
        }
      ]
    };

    Profiles.insert(profileObj, function (err, profile) {
      result.data = profile; 
      if (!err) {
        Users.findAndModify({
            "query": {'_id': user._id},
            "update": { 
                "$push": {"profile_ids": profile._id}
            }
        },
        { "upsert": true }, function (err, user) {
          if (!err){
            result = {
              "status":200,
              "data": profile,
              "user": user
            };
          }

          callback(result);
        }); 
      }
    });
  }
  else{
    callback(result);
  }
};

exports.deleteIO = function (req, callback) {
  result = {
    "status":200
  };

  Profiles.remove({_id:Profiles.id(req.profile_id.io_id)});
  callback(result);
}; 

exports.updateProfile = function (req, callback) {
  var params = req.body;
  var profile_id = req.params.profile_id;
  var user = req.user;
  var result = {
    "status":400,
    "data": {},
    "error": "There was an error saving the profile. Please try again.",
    "user": user
  };

  if(params.name && params.name.length > 0){
    result = {
      "status":200,
      "data": {},
      "user": user
    };
    Profiles.update({_id:Profiles.id(profile_id)}, {$set: {"name": params.name}}, function (err, profile) {
      result.data = profile; 
      if(err){
        result.error = "There was an error saving the profile. Please try again.";
      }
      callback(result);
    });
  }
  else{
    callback(result);
  }
};

exports.listProfiles = function (req, callback) {
  var user = req.user;
  var user_id = user._id;
  var result = {
    "status":200,
    "data": []
  };

  if(user.profile_ids){
    var obj_ids = user.profile_ids.map(function(obj_id){ return Profiles.id(obj_id) });
    Profiles.find({_id:{$in: obj_ids}}, function (err, profiles) {
      result.data = profiles; 
      if (err) {
        result.status = 400;
        result.error = "There was an error fetching the profiles. Please try again.";
      }
      callback(result);
    });
  }
  else{
    callback(result);
  }

// CLEAR PROFILES
  // Users.findAndModify({'_id': user._id}, {$set: {"profile_ids": []}}, function (err, user) {
  //   if (err){
  //     result.status = 400;
  //     result.error = "There was an error saving the profile. Please try again.";
  //   }
  //   else{
  //     result.user = user;
  //   }

  //   callback(result);
  // }); 

};

exports.addDevice = function (req, callback) {
  var params = req.body;
  var user_id = req.params.user_id;
  var valid = true;
  var result = {
    "status":400,
    "data": {},
    "errors": []
  };
  var deviceObj = {
    "external_id": params.external_id,
    "name": params.name
  };

  if(!params.external_id || params.external_id.length == 0){
    result.errors.push("Please enter a device id.");
    valid = false;
  }
  if(!params.name || params.name.length == 0){
    result.errors.push("Please enter a device name.");
    valid = false;
  }
  
  if(valid){
    Devices.insert(deviceObj, function (err, device) {
      result.data = device; 
      if (err) {
        result.errors = ["There was an error saving the device."];
        callback(result);
      }
      else{
        Users.findAndModify({'_id': Users.id(user_id)}, {$push: {"device_ids": device._id}}, function (err, user) {
          if (err){
            result.errors = ["There was an error saving the device."];
          }
          else{
            result.status = 200;
            result.user = user;
          }

          callback(result);
        }); 
      }
    });
  }
  else{
    callback(result);
  }
};

exports.listDevices = function (req, callback) {
  console.log("WHAAA");
  var user = req.user;
  var result = {
    "status":200,
    "data":{
      "devices": []
    }
  };

  if(user.device_ids){
    var obj_ids = user.device_ids.map(function(obj_id){ return Devices.id(obj_id) });
    Devices.find({_id:{$in: obj_ids}}, function (err, devices) {
      result.data.devices = devices; 
      if (err) {
        result.status = 400;
        result.error = "There was an error fetching the devices. Please try again.";
      }
      callback(result);
    });
  }
  else{
    callback(result);
  }
};

exports.addIO = function (req, callback) {
  var params = req.body;
  var result = {
    "status":400,
    "data": {},
    "error": "There was an error saving the profile. Please try again.",
  };
  var obj = {
    "name": params.name,
    "device_id": params.device_id,
    "type": params.type
  };

  if((params.name && params.name.length > 0)
    && (params.type && params.type.length > 0)
    && (params.device_id && params.device_id.length > 0)){
    if(req.user.admin || _.indexOf(params.device_id, req.user.device_ids) > -1){
      IOs.insert(obj, function (err, io) {
        result.data = io; 
        if (!err) {
          Profiles.findAndModify({'_id': Profiles.id(params.profile_id)}, {$push: {"io_ids": io._id}}, function (err, profile) {
            if (!err){
              result = {
                "status":200,
                "data": io
              };
            }

            callback(result);
          }); 
        }
      });
    }
    else{
      result.errors = "Unauthorized.";
      callback(result);
    }
  }
  else{
    callback(result);
  }
};

exports.deleteIO = function (req, callback) {
  result = {
    "status":200
  };

  IOs.remove({_id:IOs.id(req.params.io_id)});
  callback(result);
}; 

exports.updateIO = function (req, callback) {
  var params = req.body;
  var io_id = req.params.io_id;
  var user = req.user;
  var valid = true;
  var result = {
    "status":400,
    "data": {},
    "errors": [],
    "user": user
  };
  
  if(!params.name || params.name.length == 0){
    valid = false;
    result.errors.push("Please enter a name.");
  }
  if(!params.type || params.type.length == 0){
    valid = false;
    result.errors.push("Please enter a type.");
  }
  if(!params.device_id || params.device_id.length == 0){
    valid = false;
    result.errors.push("Please select a device.");
  }
  
  if(valid){
    var device_id = params.device_id.toString();
    var user_device_id = _.find(req.user.device_ids, function(id){
      return device_id == id;
    });

    if(req.user.admin || user_device_id){
      result = {
        "status":200,
        "data": {},
        "user": user
      };
      IOs.findAndModify({
            "query": {_id:IOs.id(io_id)},
            "update": { 
                "$set": {"name": params.name, "type": params.type, "device_id": params.device_id}
            }
        },
        { "upsert": true }, function (err, io) {

          result.data = io; 
          if(err){
            result.errors = ["There was an error saving the io. Please try again."];
            result.errors = [err];
          }
          callback(result);
      });
    }
    else{
      result.errors = ["Unauthorized."];
      callback(result);
    }
  }
  else{
    callback(result);
  }
};

exports.listIOs = function (req, callback) {
  var params = req.query;
  var result = {
    "status":200,
    "data": []
  };

  Profiles.findOne({_id:Profiles.id(params.profile_id)}, function (err, profile) {
    IOs.find({_id:{$in: profile.io_ids}}, function (err, ios) {
      result.data = ios; 
      if (err) {
        result.status = 400;
        result.error = "There was an error fetching the profiles. Please try again.";
      }
      callback(result);
    }); 
  }); 

};

exports.getIO = function (req, callback) {
  var params = req.params;
  var result = {
    "status":200,
    "data": {}
  };

  IOs.findOne({_id:IOs.id(params.io_id)}, function (err, io) {
    result.data = io; 
      if (err) {
        result.status = 400;
        result.error = "There was an error fetching the profiles. Please try again.";
      }
      callback(result);
  }); 

};

exports.getIODevice = function (req, callback) {
  var params = req.params;
  var result = {
    "status":200,
    "data": {}
  };

  IOs.findOne({_id:IOs.id(params.io_id)}, function (err, io) {
    Devices.findOne({_id:Devices.id(io.device_id)}, function (err, device) {
      result.data = device; 
      if (err) {
        result.status = 400;
        result.error = "There was an error fetching the profiles. Please try again.";
      }
      callback(result);
    }); 
  }); 

};
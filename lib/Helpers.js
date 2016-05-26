var bcrypt = require('bcryptjs'),
    Q = require('q'),
    config = require('../config/config.js'),
    db = config.db,
    Users = db.get('users'),
    Profiles = db.get('profiles'),
    Devices = db.get('devices'),
    IOs = db.get('ios');

// //used in local-signup strategy
exports.localReg = function (email, password) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "email": email,
    "password": hash,
    "avatar": "http://placepuppy.it/images/homepage/Beagle_puppy_6_weeks.JPG"
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
      console.log(hash);
      console.log(bcrypt.compareSync(password, hash));
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

exports.addProfile = function (req, callback) {
  var params = req.body;
  var user = req.user;
  var result = {
    "status":200,
    "data": {},
    "user": user
  };
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
    if (err) {
      result.status = 400;
      result.error = "There was an error saving the profile. Please try again.";
    }
    else{
      Users.findAndModify({'_id': user._id}, {$push: {"profile_ids": profile._id}}, function (err, user) {
        if (err){
          result.status = 400;
          result.error = "There was an error saving the profile. Please try again.";
        }
        else{
          result.user = user;
        }

        callback(result);
      }); 
    }
  });
};

exports.listProfiles = function (req, callback) {
  var user = req.user;
  var result = {
    "status":200,
    "data": []
  };

  var obj_ids = user.profile_ids.map(function(user_id){ return Profiles.id(user_id) });

  Profiles.find({_id:{$in: obj_ids}}, function (err, profiles) {

    result.data = profiles; 
    if (err) {
      result.status = 400;
      result.error = "There was an error fetching the profiles. Please try again.";
    }
    callback(result);
  });

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
  var user = req.user;
  var result = {
    "status":200,
    "data": {},
    "user": user
  };
  var deviceObj = {
    "external_id": params.external_id
  };

  Devices.insert(deviceObj, function (err, device) {
    result.data = device; 
    if (err) {
      result.status = 400;
      result.error = "There was an error saving the device. Please try again.";
    }
    else{
      Users.findAndModify({'_id': user._id}, {$push: {"device_ids": device._id}}, function (err, user) {
        if (err){
          result.status = 400;
          result.error = "There was an error saving the device. Please try again.";
        }
        else{
          result.user = user;
        }

        callback(result);
      }); 
    }
  });
};

exports.listDevices = function (req, callback) {
  var user = req.user;
  var result = {
    "status":200,
    "data":{
      "devices": []
    }
  };

  var obj_ids = user.device_ids.map(function(user_id){ return Devices.id(user_id) });

  Devices.find({_id:{$in: obj_ids}}, function (err, devices) {
    result.data.devices = devices; 
    if (err) {
      result.status = 400;
      result.error = "There was an error fetching the devices. Please try again.";
    }
    callback(result);
  });
};

exports.addIO = function (req, callback) {
  var params = req.body;
  var result = {
    "status":200,
    "data": {},
  };
  var obj = {
    "name": params.name,
    "device_id": params.device_id,
    "type": params.type
  };

  IOs.insert(obj, function (err, io) {
    result.data = io; 
    if (err) {
      result.status = 400;
      result.error = "There was an error saving the IO. Please try again.";
    }
    else{
      Profiles.findAndModify({'_id': Profiles.id(params.profile_id)}, {$push: {"io_ids": io._id}}, function (err, profile) {
        if (err){
          result.status = 400;
          result.error = "There was an error saving the IO. Please try again.";
        }

        callback(result);
      }); 
    }
  });
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
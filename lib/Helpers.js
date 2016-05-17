var bcrypt = require('bcryptjs'),
    Q = require('q'),
    config = require('../config/config.js'),
    db = config.db,
    Users = db.get('users'),
    Profiles = db.get('profiles');

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
  var deferred = Q.defer();
  var result = {
    "status":200,
    "obj": {},
    "user": user
  };
  var profileObj = {
    "name": params.name,
    "io": [],
    "accesses": [
      {
        "user_id": user._id,
        "role": "owner"
      }
    ]
  };

  Profiles.insert(profileObj, function (err, profile) {
    result.obj = profile; 
    if (err) {
      result.status = 400;
      result.error = "There was an error saving the profile. Please try again.";
    }
    else{
      Users.findAndModify({_id: user._id}, {$push: {"profile_ids": profile._id}}, function (err, user) {
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

// Set the client credentials and the OAuth2 server
var config = require('../config.js'),
    particle_api_config = config.particle_api;
var site =  'https://api.particle.io';
var credentials = {
  clientID: particle_api_config.client_id,
  clientSecret: particle_api_config.client_secret,
  site: site,
  tokenPath: '/oauth/token'
};

var oauth2 = require('simple-oauth2')(credentials);
var request = require('request');
var token;

var ParticleAPI = {
  versionPath: '/v1',
  token: function(callback){
    if(token){
      // Create the access token wrapper
      var tokenObj = oauth2.accessToken.create(token);

      // Check if the token is expired. If expired it is refreshed.
      if (tokenObj.expired()) {
        // Callbacks
        tokenObj.refresh(function(error, result) {
          token = result;
          callback(token.access_token);
        });
      }
      else{
        callback(token.access_token);
      }
    }
    else{
      console.log("GETTING TOKEN");
      oauth2.client.getToken({}, function saveToken(error, result) {
        if (error) { console.log('Access Token Error', error.message); }
        console.log("TEST TOKEN");
        console.log(result);
        token = result;
        // token = oauth2.accessToken.create(result);
        callback(token.access_token);
      });
    }
  },
  url: function(resource){
    return site + this.versionPath + resource;
  },
  getDevices: function(callback){
    console.log("Start Get Deices");
    console.log(this.url('/devices'));
    var url = this.url('/devices');
    this.token(function(token){
      var options = {
        "url": url,
        "headers": { "Authorization": "Bearer " + token }
      };

      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("DEVICES RESPONSE");
          console.log(body);
          console.log(response);
          var info = JSON.parse(body);
          console.log(info);
          callback(info);
        }
      });
    });
  },
  triggerDevice: function(device_id, callback){
    console.log("Start TRIgger Deices");
    console.log(this.url('/devices'));
    var url = this.url('/devices') + '/' + device_id + '/triggerPulse';
    this.token(function(token){
      var options = {
        "url": url,
        "headers": { "Authorization": "Bearer " + token },
        "form": { "arg": "pulse" }
      };

      console.log("REq");
      console.log(url);
      console.log(options);

      request.post(options, function(error, response, body) {
        console.log("TRIGGER RESPONSE");
          console.log(body);
        if (!error && response.statusCode == 200) {
          console.log(response);
          var info = JSON.parse(body);
          console.log(info);
          callback(info);
        }
      });
    });
  },
  readDevice: function(params, callback){
    console.log("Start TRIgger Deices");
    

    var url = this.url('/devices') + '/' + params.external_id + '/' + params.functionName;
    console.log(url);
    this.token(function(token){
      var options = {
        "url": url,
        "headers": { "Authorization": "Bearer " + token },
        "form": { "arg": params.arg }
      };

      console.log("REq");
      console.log(url);
      console.log(options);

      request.post(options, function(error, response, body) {
        console.log("TRIGGER RESPONSE");
          console.log(body);
        if (!error && response.statusCode == 200) {
          console.log(response);
          var info = JSON.parse(body);
          console.log(info);
          callback(info);
        }
      });
    });
  },
  postAction: function(params, callback){
    console.log("Start POST Deices");
    var result = {
      "status":400,
      "data": {}
    };
    

    var url = this.url('/devices') + '/' + params.external_id + '/' + params.functionName;
    console.log(url);
    this.token(function(token){
      var options = {
        "url": url,
        "headers": { "Authorization": "Bearer " + token },
        "form": { "arg": params.arg }
      };

      console.log("REq");
      console.log(url);
      console.log(options);

      request.post(options, function(error, response, body) {
        console.log("TRIGGER RESPONSE");
        if (!error && response.statusCode == 200) {
          // console.log(response);
          var info = JSON.parse(body);
          console.log(info);
          result.status = 200;
          result.data = info;
        }
        else{
          result.error = error;
        }
        callback(result);
      });
    });
  }
};

exports.ParticleAPI = ParticleAPI;
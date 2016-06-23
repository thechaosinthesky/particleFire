ParticleFire.Models.User = Backbone.Model.extend({
  idAttribute: "_id",

  defaults: {
    username: '',
    password: '',
    password2: '',
    pin: ''
  },

  validation: {
    pin: {
      required: false,
      length: 4,
      msg: 'Pin must be 4 characters.'
    },
    password: [
      {
        required: false,
        equalTo: 'password2',
        msg: 'The passwords entered did not match.'
      },
      {
        minLength: 8,
        maxLength: 25,
        msg: 'Please enter a password of at least 8 characters.'
      },
      {
        pattern: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
        msg: 'Password must contain at least 1 letter and 1 number.'
      }
    ]
  },

  url: function() {
    var base = '/register';
    if(this.id){
      base = '/accounts/' + this.id;
    }
    return base;
  },

  initialize: function() {
    this.devices = new Backbone.Collection();
    if(this.isNew()){
      this.validation.password.unshift({
        required: true,
        msg: "Please enter a password."});
      this.validation.username = [
      {
       required: true,
       msg: 'Please enter an email address'
      },{
       pattern: 'email',
       msg: 'Please enter a valid email'
      }
    ]
    }
    else{
      this.devices.url = '/account/' + this.id + '/devices';
    }
  }
});

ParticleFire.Collections.User = Backbone.Collection.extend({
  model: ParticleFire.Models.User,
  url: function() {
    return '/accounts';
  },
  initialize: function() {

  }
});
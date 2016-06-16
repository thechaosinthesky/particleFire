ParticleFire.Models.User = Backbone.Model.extend({
  idAttribute: "_id",

  defaults: {
    username: '',
    password: ''
  },

  validation: {
    username: [{
		required: true,
		msg: 'Please enter an email address'
    },{
		pattern: 'email',
		msg: 'Please enter a valid email'
    }],
    password: [
	    {
	    	required: true,
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
module.exports = {
  "db": require('monk')('localhost/particle-fire-dev' || 'mongodb://heroku_4x9BLAHBLAHBLAH')
}
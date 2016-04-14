module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      'public/app.min.js': [
        'public/javascripts/*.js',
        'public/javascripts/widgets/*.js',
        'public/javascripts/templates/*.js',
        'public/javascripts/models/*.js',
        'public/javascripts/views/*.js', 
        'public/javascripts/routers/*.js']
    },
    watch: {
      javascript: {
        files: 'public/javascripts/**/*.js',
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
}
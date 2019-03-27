module.exports=function(grunt)
{
    grunt.initConfig({
        uglify: {
          my_target:{
            files: {
              'profile.js': ['app.js']
            }
          }
        }
      });
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.registerTask('default', ['uglify']);   
}
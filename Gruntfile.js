module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dom_munger: {
      your_target: {
        options: {
          suffix: {selector:'a',attribute:'href',value:'.html'},
        },
        src: 'www/**/*.html' //could be an array of files
      },
    },
  });

  grunt.loadNpmTasks('grunt-dom-munger');
  // Default task(s).
  grunt.registerTask('harp-html', ['dom_munger']);
  grunt.registerTask('default', ['dom_munger']);

};

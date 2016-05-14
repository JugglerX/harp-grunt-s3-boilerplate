module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-keys.json'), // Read the file
    dom_munger: {
      your_target: {
        options: {
          suffix: {selector:'a',attribute:'href',value:'.html'},
        },
        src: 'www/**/*.html' //could be an array of files
      },
    },
    aws_s3: {
      options: {
          accessKeyId: '<%= aws.AWSAccessKeyId %>',
          secretAccessKey: '<%= aws.AWSSecretKey %>',
          region: '<%= aws.AWSRegion %>',
          uploadConcurrency: 5, // 5 simultaneous uploads
          downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
          options: {
              bucket: 'myharpbucket',
          },
          files: [
              {expand: true, cwd: 'www', src: ['**'], dest: '/'}
          ]
      },
    }
  });

  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-aws-s3');
  // Default task(s).
  grunt.registerTask('harp', ['dom_munger']);
  grunt.registerTask('default', ['dom_munger']);
  grunt.registerTask('deploy', ['aws_s3']);

};

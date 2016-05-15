module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsLibs = [

  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-keys.json'), 

    dom_munger: {
      your_target: {
        options: {
          suffix: {selector:'a',attribute:'href',value:'.html'},
        },
        src: 'www/**/*.html' //could be an array of files
      },
    },

    sass: {
      options: {
        outputStyle: 'expanded',
        sourceComments: true,
        sourceMap: false,
      },
      style: {
        files: {
          'public/css/style.css': 'public/css/style.scss'
        }
      },
    },

    uglify: {
      options: {
        sourceMap: false,
        compress: false,
        beautify: false,
        preserveComments: 'some',
        mangle: false
      },
      dist: {
        files: {
          'public/js/libs.min.js': [jsLibs]
        }
      }
    },

    watch: {
      js: {
        files: [
          jsLibs
        ],
        tasks: ['jshint', 'uglify']
      },
      scss: {
        files: 'public/**/*.scss',
        tasks: ['sass:style'],
      },
      css: {
        files: 'public/css/*.css',
        options: {
          livereload: true
        }
      }
    },

    copy: {
      assets: {
        files: [
          {expand: true, cwd: 'public/images/', src: ['*.*'], dest: 'sites/assets/fonts/'},
          {expand: true, cwd: 'public/js',    src: ['*.*'], dest: 'site/js/'},
          {expand: true, cwd: 'public/css',    src: ['*.*'], dest: 'site/css/'},
        ]
      }
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
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      target: {
        files: [{
          expand: true,
          cwd: 'www/css',
          src: ['*.css', '!*.min.css'],
          dest: 'www/css',
          ext: '.css'
        }]
      }
    },

    cleanempty: {
      options: {
        folders: true,
        noJunk: true
      },
      src: ['www/css/*'],
    },

  });

  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-aws-s3');
  // Default task(s).
  grunt.registerTask('harp', ['dom_munger','cssmin','cleanempty']);
  grunt.registerTask('default', ['dom_munger']);
  grunt.registerTask('deploy', ['aws_s3']);

};

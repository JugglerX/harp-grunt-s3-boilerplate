module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsLibs = [
    "public/js/prism.js",
    "public/js/push-menu.js",

  ];
  var jsFoundation = [
    "public/js/foundation/foundation.js",
    "public/js/foundation/foundation.tooltip.js",
    "public/js/foundation/foundation.reveal.js",
    "public/js/foundation/foundation.equalizer.js",
    "public/js/foundation-init.js"
  ]

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-keys.json'), 

    dom_munger: {
      htmllinks: {
        options: {
          suffix: {selector:'a',attribute:'href',value:'.html'},
        },
        src: 'www/**/*.html' //could be an array of files
      }
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
        preserveComments: 'false',
        mangle: false
      },
      dist: {
        files: {
          'public/js/libs.min.js': [jsLibs],
          'public/js/foundation.min.js': [jsFoundation]
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
          { expand: true, cwd: 'public/images/', src: ['*.*'], dest: 'sites/assets/fonts/'},
          { expand: true, cwd: 'public/js',    src: ['*.*'], dest: 'site/js/'},
          { expand: true, cwd: 'public/css',    src: ['*.*'], dest: 'site/css/'}
        ]
      },
      cleanurls: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'www',
            dest: 'www/',
            src: [
              '**/*.html'
            ],
            rename: function(dest, src) {
              return dest + src.replace('.html','');
            }
          }
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
              {dest: '/', cwd: 'www', action: 'delete',  differential: true},
              {action: "upload", expand: true, cwd: 'www', src: ['**'], dest: '/', differential: true}
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

    clean: {
      images: ['www/images/raw/'],
      html: ['www/**/*.html']
    },

    cleanempty: {
      options: {
        folders: true,
        noJunk: true
      },
      src: ['www/css/*'],
    },

    responsive_images: {
      myTask: {
        options: {
          sizes: [{
            width: 320,
          },{
            width: 640,
          },{
            width: 1024,
          }]
        },
        files: [{
          expand: true,
          src: ['**/*.{jpeg,jpg,gif,png}'],
          cwd: 'public/images/raw/',
          custom_dest: 'public/images/processed/{%= path %}/{%= width %}'
        }]
      }
    },

  });

  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-aws-s3');
  // Default task(s).
  grunt.registerTask('compile', ['copy:cleanurls','cssmin','cleanempty','clean:html',]);
  grunt.registerTask('compilehtml', ['dom_munger','cssmin','clean:images']);
  grunt.registerTask('default', ['dom_munger']);
  grunt.registerTask('deploy', ['aws_s3']);

};

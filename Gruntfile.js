module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  //require('time-grunt')(grunt);

  var jsLibs = [
    "public/assets/js/prism.js",
    "public/assets/js/push-menu.js"
  ];
  var jsFoundation = [
    "public/assets/js/foundation/foundation.js",
    "public/assets/js/foundation/foundation.tooltip.js",
    "public/assets/js/foundation/foundation.reveal.js",
    "public/assets/js/foundation/foundation.equalizer.js",
    "public/assets/js/foundation-init.js"
  ];

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
        sourceMap: false
      },
      style: {
        files: {
          'public/assets/css/style.css': 'public/assets/css/style.scss'
        }
      }
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
          'public/assets/js/min/libs.min.js': [jsLibs],
          'public/assets/js/min/foundation.min.js': [jsFoundation]
        }
      }
    },

    watch: {
      js: {
        files: [
          jsLibs
        ],
        tasks: ['uglify']
      },
      images: {
        files: ['public/assets/images/raw/*.*','public/assets/images/raw/**/*.*'],
        tasks: ['responsive_images']
      },
      scss: {
        files: 'public/assets/**/*.scss',
        tasks: ['sass:style']
      }
    },

    copy: {
      assets: {
        files: [
          { expand: true, cwd: 'public/assets/fonts', src: ['*.*'], dest: 'www/assets/fonts/'},
          { expand: true, cwd: 'public/assets/images', src: ['*.*'], dest: 'www/assets/images/'},
          { expand: true, cwd: 'public/assets/min/js', src: ['*.*'], dest: 'www/assets/js/'},
          { expand: true, cwd: 'public/assets/css', src: ['*.*'], dest: 'www/assets/css/'}
        ]
      },
      js: {
        files: [
          { expand: true, cwd: 'public/assets/js/min', src: ['*.*'], dest: 'www/assets/js/min/'}
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
              bucket: '<%= aws.AWSBucket %>'
          },
          files: [
              {dest: '/', cwd: 'www', action: 'delete',  differential: true},
              {action: "upload", expand: true, cwd: 'www', src: ['**'], dest: '/', differential: true}
          ]
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      target: {
        files: [{
          expand: true,
          cwd: 'www/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'www/assets/css',
          ext: '.css'
        }]
      }
    },

    clean: {
      images: ['www/assets/images/raw/','www/images'],
      js: ['www/assets/js/'],
      html: ['www/**/*.html']
    },

    cleanempty: {
      options: {
        folders: true,
        noJunk: true
      },
      src: ['www/assets/css/*']
    },

    responsive_images: {
      raw: {
        options: {
          sizes: [{
            width: 320,
            name: "small"
          },{
            name: "medium",
            width: 640
          },{
            name: "large",
            width: 1024
          }]
        },
        files: [{
          expand: true,
          src: ['**/*.{jpeg,jpg,gif,png}'],
          cwd: 'public/assets/images/raw/',
          custom_dest: 'public/assets/images/processed/{%= path %}/{%= name %}-{%= width %}/'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-aws-s3');
  // Default task(s).

  grunt.registerTask('compile', ['dom_munger','cssmin','clean:images','clean:js','cleanempty','copy:js']);
  grunt.registerTask('compilecleanurls', ['copy:cleanurls','cssmin','cleanempty','clean:html']);
  grunt.registerTask('images', ['responsive_images']);
  grunt.registerTask('default', ['dom_munger']);
  grunt.registerTask('deploy', ['aws_s3']);

};

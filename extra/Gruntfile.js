module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsLibs = [

  ];

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    pkg: grunt.file.readJSON('package.json'),

    // Before generating any new files, remove files from previous build.
    clean: {
      example: ['site/*.html']
    },

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'templates/helpers/*.js', jsLibs],
      options: {
        jshintrc: '.jshintrc'
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
          'public/css/style.css': 'public/scss/style.scss'
        }
      },
    },

    assemble: {
      options: {
        assets: "assets",
        data:   "views/*.json"
      },
      project: {
        options: {
          layout: "views/layouts/main.hbs",
          partials: "views/includes/*.hbs"
        },
        files: {
          'site/': ["views/*.hbs" ]
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
      grunt: {
        files: ['Gruntfile.js']
      },
      js: {
        files: [
          jsLibs
        ],
        tasks: ['jshint', 'uglify']
      },
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['sass:autodesk', 'exec'],
      },
      css: {
        files: 'css/*.css',
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

    'compile-handlebars': {
      allStatic: {
        files: [{
          src: 'views/',
          dest: 'tmp/allStatic.html'
        }],
        preHTML: 'test/fixtures/pre-dev.html',
        postHTML: 'test/fixtures/post-dev.html',
        templateData: 'test/fixtures/data.json'
      }
    },

    handlebars: {
      all: {
        /*
          The output will be formatted as a Common JS module, using a require()
          statement where the argument is the Handlebars path provided in the option.
        */
        files: {
          'pkg/template-compile-test.js': 'template/*.handlebars'
        },
        options: {
          exportCommonJS: 'handlebars'
        }
      },
      some: {
        /*
          The output will be set to register two templates under 'myApp.templates'
          namespace after stripping the templateRoot:
            * myApp.templates.template1
            * myApp.templates.template2
        */
        files: {
          'pkg/template-compile-test2.js': [
            'template/webApp-template1.handlebars',
            'template/webApp-template2.handlebars'
          ]
        },
        options: {
          namespace: 'myApp.templates',
          templateRoot: 'webApp-',
          knownHelpers: ['if', 'each']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-compile-handlebars');

  grunt.registerTask('build-sass', ['sass:style']);
  grunt.registerTask('build-handlebars', ['compile-handlebars']);
  grunt.registerTask('build-assemble', ['assemble','jshint','sass','uglify','copy']);
  grunt.registerTask('default', ['jshint','sass','uglify']);

};

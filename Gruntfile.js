'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
    'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
    'assets/js/plugins/*.js',
    'assets/js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true,
          // SASS source map
          // To disable, set sourcemap to false
          // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
          sourcemap: true
        },
        files: {
          'assets/css/main.css': [
            'assets/sass/main.scss'
          ]
        }
      },
      build: {
        options: {
          style: 'compressed',
          compass: true,
          // SASS source map
          // To disable, set sourcemap to false
          // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
          sourcemap: true
        },
        files: {
          'assets/css/main.min.css': [
            'assets/sass/main.scss'
          ]
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/css/'
          }
        },
        src: 'assets/css/main.css'
      },
      build: {
        src: 'assets/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'assets/vendor/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['assets/js/scripts.min.js'],
            ['assets/css/main.min.css']
          ]
        },
        uglify: true,
        parseFiles: true
      }
    },
    version: {
      default: {
        options: {
          format: true,
          length: 32,
          manifest: 'assets/manifest.json',
          querystring: {
            style: 'roots_css',
            script: 'roots_js'
          }
        },
        files: {
          'lib/scripts.php': 'assets/{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js',
          'templates/*.php',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'sass:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'sass:build',
    'autoprefixer:build',
    'uglify',
    'modernizr',
    'version'
  ]);
};

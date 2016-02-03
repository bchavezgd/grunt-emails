module.exports = function ( grunt ) {


  grunt.initConfig( {

    pkg: grunt.file.readJSON( 'package.json' ),

    // secrets.json is ignored in git because it contains sensitive data
    //secrets: grunt.file.readJSON('secrets.json'),


    // Re-usable filesystem paths
    paths: {
      site: './_site/2016',
      src: './src',
      src_img: './src/img',
      dist: './dist',
      dist_img: './dist/img'
    },

    // Takes your scss files and compiles them to css


    sass: {
      options: {
        sourceComments: true
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: [{
          src: '<%= paths.src %>/scss/nccpt.scss',
          dest: '<%= paths.dist %>/nccpt.css'
        }]
      },
      static: {
        options: {
          outputStyle: 'compact'
        },
        files: [{
          src: '<%= paths.src %>/scss/nccpt.scss',
          dest: '<%= paths.site %>/nccpt.css'
        }]
      }
    },


    postcss: {
      options: {
        processors: [
          // add fallbacks for rem units
          require( 'pixrem' )(),
          // add vendor prefixes
          require( 'autoprefixer' )( {
            browsers: 'last 5 versions'
          } ),
        ]
      },
      files: [{
        src: '<%= paths.dist %>/nccpt.css',
        dest: '<%= paths.dist %>/nccpt.css'
      }],
      static: {
        options: {
          processors: [
            //	add fallbacks for rem units
            require( 'pixrem' )(),
            //	add vendor prefixes
            require( 'autoprefixer' )( {
              browsers: 'last 2 versions'
            } ),
          ]
        },
        files: [{
          src: '<%= paths.site %>/nccpt.css',
          dest: '<%= paths.site %>/nccpt.css'
        }]
      }
    },

    // Assembles your email content with html layout
    assemble: {
      options: {
        layoutext: '.hbs',
        layout: 'nccpt',
        plugins: [ 'assemble-markdown-data' ],
        layoutdir: '<%= paths.src %>/layouts',
        partials: [ '<%= paths.src %>/partials/**/*.hbs' ],
        data: '<%= paths.src %>/data/*.{json,yml}',
        flatten: true
      },
      pages: {
        expand: true,
        cwd: '<%= paths.src %>/emails/',
        src: [ '*.{hbs,md}' ],
        dest: '<%= paths.dist %>/'
      },
      static: {
        expand: true,
        cwd: '<%= paths.src %>/emails/',
        src: [ '*.{hbs,md}' ],
        dest: '<%= paths.site %>/'
      }
    },





    // Replace compiled template images sources from ../src/html to ../dist/html
    replace: {
      src_images: {
        options: {
          usePrefix: false,
          patterns: [ {
            // Matches <img * src="../src/img or <img * src='../src/img'
            match: /(<img[^>]+[\"'])(\.\.\/src\/img\/)/gi,
            replacement: '$1../<%= paths.dist_img %>/'
          }, {
            // Matches url('../src/img') or url(../src/img) and even url("../src/img")
            match: /(url\(*[^)])(\.\.\/src\/img\/)/gi,
            replacement: '$1../<%= paths.dist_img %>/'
          } ]
        },
        files: [ {
          expand: true,
          flatten: true,
          src: [ '<%= paths.dist %>/*.html' ],
          dest: '<%= paths.dist %>'
        } ]
      }
    },

    // Inlines your css
    premailer: {
      html: {
        options: {
          removeComments: true
        },
        files: [ {
          expand: true,
          src: [ '<%= paths.dist %>/*.html' ],
          dest: ''
        } ]
      },
      txt: {
        options: {
          mode: 'txt'
        },
        files: [ {
          expand: true,
          src: [ '<%= paths.dist %>/*.html' ],
          dest: '',
          ext: '.txt'
        } ]
      }
    },

    // Optimize images
    imagemin: {
      dev: {
        options: {
          optimizationLevel: 0,
          svgoPlugins: [ {
            removeViewBox: false
          } ]
        },
        files: [ {
          expand: true,
          cwd: '<%= paths.src_img %>',
          src: [ '**/*.{png,jpg,gif}' ],
          dest: '<%= paths.dist_img %>'
        } ]
      }
    },

    // setting up dev server with livereload
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: '3300',
          livereload: true,
          base: '<%= paths.dist %>'
        }
      }
    },

    // Watches for changes to source files
    watch: {
    
      files: [
        '<%= paths.src %>/scss/*',
        '<%= paths.src %>/emails/*',
        '<%= paths.src %>/layouts/*',
        '<%= paths.src %>/partials/*',
        '<%= paths.src %>/data/*'
      ],
      tasks: [
        'sass',
        'postcss',
        'assemble',
        'newer:imagemin'
      ],
      options: {
        spawn: false,
        event: ['all'],
        livereload: true
      }
    }
  } );

  // Load all grunt-* tasks
  require( 'load-grunt-tasks' )( grunt );

  // registering grunt tasks.
  grunt.registerTask( 'done', [
    'dev',
    'premailer',
    'static'
  ] );

  grunt.registerTask( 'dev', [
    'sass:dev',
    'postcss:dev',
    'assemble:dev',
    'newer:imagemin:dev',
  ] );

  grunt.registerTask( 'static', [
    'sass:static',
    'postcss:static',
    'assemble:static',
  ] );

  grunt.registerTask( 'default', [
    'sass',
    'postcss',
    'assemble',
    'newer:imagemin',
    'connect',
    'watch'
  ] );
};

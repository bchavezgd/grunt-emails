module.exports = function (grunt) {


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

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
      dev: {
        options: {
          outputStyle: 'expanded',
          sourceComments: true
        },
        file: {
          src: '<%= paths.src %>/scss/nccpt.scss',
          dest: '<%= paths.dist %>/nccpt.css'
        }
      },
      static: {
        options: {
          outputStyle: 'compressed',
          sourceComments: true
        },
        files: {
          '<%= paths.site %>/nccpt.css': '<%= paths.src %>/scss/nccpt.scss'
        }
      }
    },


    postcss: {
      options: {
        processors: [
					//	add fallbacks for rem units
        	require('pixrem')(),
        	//	add vendor prefixes
					require('autoprefixer')({
            browsers: 'last 5 versions'
          }),
				]
      },
      file: {
        src: '<%= paths.dist %>/css/nccpt.css',
        dest: '<%= paths.dist %>/css/nccpt.css'
      },
      static: {
        options: {
          processors: [
            //	add fallbacks for rem units
            require('pixrem')(),
            //	add vendor prefixes
            require('autoprefixer')({
              browsers: 'last 2 versions'
            }),
          ]
        },
        file: {
          src: '<%= paths.site %>/css/nccpt.css',
          dest: '<%= paths.site %>/css/nccpt.css'
        }
      }
    },

    // Assembles your email content with html layout
    assemble: {
      options: {
        layoutext: '.hbs',
        layout: 'nccpt',
        plugins: ['assemble-markdown-data'],
        layoutdir: '<%= paths.src %>/layouts',
        partials: ['<%= paths.src %>/partials/**/*.hbs'],
        data: '<%= paths.src %>/data/*.{json,yml}',
        flatten: true
      },
      pages: {
        expand: true,
        cwd: '<%= paths.src %>/emails/',
        src: ['*.{hbs,md}'],
        dest: '<%= paths.dist %>/'
      },
      static: {
        expand: true,
        cwd: '<%= paths.src %>/emails/',
        src: ['*.{hbs,md}'],
        dest: '<%= paths.site %>/'
      }
    },





    // Replace compiled template images sources from ../src/html to ../dist/html
    replace: {
      src_images: {
        options: {
          usePrefix: false,
          patterns: [{
            match: /(<img[^>]+[\"'])(\.\.\/src\/img\/)/gi, // Matches <img * src="../src/img or <img * src='../src/img'
            replacement: '$1../<%= paths.dist_img %>/'
          }, {
            match: /(url\(*[^)])(\.\.\/src\/img\/)/gi, // Matches url('../src/img') or url(../src/img) and even url("../src/img")
            replacement: '$1../<%= paths.dist_img %>/'
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= paths.dist %>/*.html'],
          dest: '<%= paths.dist %>'
        }]
      }
    },

    // Inlines your css
    premailer: {
      html: {
        options: {
          removeComments: true
        },
        files: [{
          expand: true,
          src: ['<%= paths.dist %>/*.html'],
          dest: ''
        }]
      },
      txt: {
        options: {
          mode: 'txt'
        },
        files: [{
          expand: true,
          src: ['<%= paths.dist %>/*.html'],
          dest: '',
          ext: '.txt'
				}]
      }
    },

    // Optimize images
    imagemin: {
      options: {
        optimizationLevel: 0,
        svgoPlugins: [{
          removeViewBox: false
        }]
      },
      files: [{
        expand: true,
        cwd: '<%= paths.src_img %>',
        src: ['**/*.{png,jpg,gif}'],
        dest: '<%= paths.dist_img %>'
     }]
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
        event: 'all',
        livereload: true
      }
    }
  });

  // Load all grunt-* tasks
  require('load-grunt-tasks')(grunt);

  // registering grunt tasks.
  grunt.registerTask('done', [
		'sass:dev',
		'postcss',
		'assemble',
		'premailer',
		'newer:imagemin',
		'newer:replace:src_images',
    'static'
	]);

  grunt.registerTask('static', [
		'sass:static',
		'postcss:static',
		'assemble:static',
	]);

  grunt.registerTask('default', [
		'sass',
		'postcss',
		'assemble',
		'newer:imagemin',
		'connect',
		'watch'
	]);
};

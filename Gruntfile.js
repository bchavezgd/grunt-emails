module.exports = function (grunt) {


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // secrets.json is ignored in git because it contains sensitive data
    // See the README for configuration settings
    //secrets: grunt.file.readJSON('secrets.json'),


    // Re-usable filesystem paths (these shouldn't be modified)
    paths: {
      src: './src',
      src_img: './src/img',
      dist: './dist',
      dist_img: './dist/img'
    },

    // Takes your scss files and compiles them to css


    sass: {
      options: {
        style: 'expanded',
        //sourceMap: false,
        sourceComments: true
      },
      file: {
        src: '<%= paths.src %>/scss/nccpt.scss',
        dest: '<%= paths.dist %>/css/nccpt.css'
      }
    },


    postcss: {
      options: {
        //map: true, // inline sourcemaps
       // parser: require('postcss-scss'),
        // or

        /*
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
        },
        */

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
        src: '<%= paths.dist %>/css/nccpt.css',
        dest: '<%= paths.dist %>/css/nccpt.css'
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
        src: ['<%= paths.src %>/emails/*.hbs'],
        dest: '<%= paths.dist %>/'
      }
    },





    // Replace compiled template images sources from ../src/html to ../dist/html
    replace: {
      src_images: {
        options: {
          usePrefix: false,
          patterns: [
            {
              match: /(<img[^>]+[\"'])(\.\.\/src\/img\/)/gi, // Matches <img * src="../src/img or <img * src='../src/img'
              replacement: '$1../<%= paths.dist_img %>/'
                },
            {
              match: /(url\(*[^)])(\.\.\/src\/img\/)/gi, // Matches url('../src/img') or url(../src/img) and even url("../src/img")
              replacement: '$1../<%= paths.dist_img %>/'
                }
              ]
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
      dynamic: {
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
      }
    },

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




    // Watches for changes to css or email templates then runs grunt tasks
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




  // Load all grunt tasks
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  // Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('done', [
		'sass',
		'postcss',
		'assemble',
		'premailer',
		'newer:imagemin',
		'replace:src_images'
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

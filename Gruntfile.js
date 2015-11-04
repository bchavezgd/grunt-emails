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
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'<%= paths.dist %>/css/nccpt.css': '<%= paths.src %>/css/scss/nccpt.scss'
				}
			}
		},





		// Assembles your email content with html layout
		assemble: {
			options: {
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
				'<%= paths.src %>/css/scss/*',
				'<%= paths.src %>/emails/*',
				'<%= paths.src %>/layouts/*',
				'<%= paths.src %>/partials/*',
				'<%= paths.src %>/data/*'
			],
			tasks: ['sass', 'assemble', 'newer:imagemin'],
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
		'assemble',
		'premailer',
		'newer:imagemin',
		'replace:src_images'
	]);
	
	
	grunt.registerTask('default', [
		'sass',
		'assemble',
		'newer:imagemin',
		'connect',
		'watch'
	]);
	// Use grunt send if you want to actually send the email to your inbox
	grunt.registerTask('send', ['mailgun']);

	// Upload images to our CDN on Rackspace Cloud Files
	grunt.registerTask('cdnify', ['default', 'cloudfiles', 'cdn:cloudfiles']);

	// Upload image files to Amazon S3
	grunt.registerTask('s3upload', ['aws_s3:prod', 'cdn:aws_s3']);

};


		// Use Mailgun option if you want to email the design to your inbox or to something like Litmus
		// grunt send --template=transaction.html
		mailgun: {
			mailer: {
				options: {
					key: '<%= secrets.mailgun.api_key %>', // See README for secrets.json or replace this with your own key
					sender: '<%= secrets.mailgun.sender %>', // See README for secrets.json or replace this with your preferred sender
					recipient: '<%= secrets.mailgun.recipient %>', // See README for secrets.json or replace this with your preferred recipient
					subject: 'This is a test email'
				},
				src: ['<%= paths.dist %>/' + grunt.option('template')]
			}
		},





		// Use Rackspace Cloud Files if you're using images in your email
		cloudfiles: {
			prod: {
				'user': '<%= secrets.cloudfiles.user %>', // See README for secrets.json or replace this with your user
				'key': '<%= secrets.cloudfiles.key %>', // See README for secrets.json or replace this with your own key
				'region': '<%= secrets.cloudfiles.region %>', // See README for secrets.json or replace this with your region
				'upload': [{
					'container': '<%= secrets.cloudfiles.container %>', // See README for secrets.json or replace this with your container name
					'src': '<%= paths.src_img %>/*',
					'dest': '/',
					'stripcomponents': 0
            }]
			}
		},

		// CDN will replace local paths with your CDN path
		cdn: {
			cloudfiles: {
				options: {
					cdn: '<%= secrets.cloudfiles.uri %>', // See README for secrets.json or replace this with your cdn uri
					flatten: true,
					supportedTypes: 'html'
				},
				cwd: './<%= paths.dist %>',
				dest: './<%= paths.dist %>',
				src: ['*.html']
			},
			aws_s3: {
				options: {
					cdn: '<%= secrets.s3.bucketuri %>/<%= secrets.s3.bucketname %>/<%= secrets.s3.bucketdir %>', // See README for secrets.json or replace this with your Amazon S3 bucket uri
					flatten: true,
					supportedTypes: 'html'
				},
				cwd: './<%= paths.dist %>',
				dest: './<%= paths.dist %>',
				src: ['*.html']
			}
		},





		// Use Amazon S3 for images
		aws_s3: {
			options: {
				accessKeyId: '<%= secrets.s3.key %>', // See README for secrets.json
				secretAccessKey: '<%= secrets.s3.secret %>', // See README for secrets.json
				region: '<%= secrets.s3.region %>', // Enter region or leave blank for US Standard region
				uploadConcurrency: 5, // 5 simultaneous uploads
				downloadConcurrency: 5 // 5 simultaneous downloads
			},
			prod: {
				options: {
					bucket: '<%= secrets.s3.bucketname %>', // Define your S3 bucket name in secrets.json
					differential: true, // Only uploads the files that have changed
					params: {
						CacheControl: '2000'
					}
				},
				files: [
					{
						expand: true,
						cwd: '<%= paths.dist_img %>',
						src: ['**'],
						dest: '<%= secrets.s3.bucketdir %>/<%= paths.dist_img %>'
              }
            ]
			}
		},





		// Send your email template to Litmus for testing
		// grunt litmus --template=transaction.html
		litmus: {
			test: {
				src: ['<%= paths.dist %>/' + grunt.option('template')],
				options: {
					username: '<%= secrets.litmus.username %>', // See README for secrets.json or replace this with your username
					password: '<%= secrets.litmus.password %>', // See README for secrets.json or replace this with your password
					url: 'https://<%= secrets.litmus.company %>.litmus.com', // See README for secrets.json or replace this with your company url
					clients: ['android4', 'aolonline', 'androidgmailapp', 'aolonline', 'ffaolonline',
              'chromeaolonline', 'appmail6', 'iphone6', 'ipadmini', 'ipad', 'chromegmailnew',
              'iphone6plus', 'notes85', 'ol2002', 'ol2003', 'ol2007', 'ol2010', 'ol2011',
              'ol2013', 'outlookcom', 'chromeoutlookcom', 'chromeyahoo', 'windowsphone8'] // https://#{company}.litmus.com/emails/clients.xml
				}
			}
		}

postcss: {
  options: {
    parser: require('postcss-scss'),
    map: {
      inline: false, // save all sourcemaps as separate files...
      annotation: 'dist/css/maps/' // ...to the specified directory
    },

    processors: [
      //	to import sass partials
      //	require('postcss-partial-import')({/* options */}),
      //	flag for sass
    require('precss')({
      /* options */
      import: {
        extension: ['scss', 'sass']
      }
    }),
      //	add fallbacks for rem units
      require('pixrem')(),
      //	add vendor prefixes
      require('autoprefixer')({
        browsers: 'last 2 versions'
      }),
    ]
  },
  file: {
    src: '<%= paths.src %>/scss/nccpt.scss',
    dest: '<%= paths.dist %>/css/nccpt.css'
  }
},

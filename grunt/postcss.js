module.exports = {
  dev: {
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
    files: [ {
      src: '<%= paths.dist %>/nccpt.css',
      dest: '<%= paths.dist %>/nccpt.css'
    } ]
  },
  static: {
    options: {
      processors: [
        //	add fallbacks for rem units
        require( 'pixrem' )(),
        //	add vendor prefixes
        require( 'autoprefixer' )( {
          browsers: 'last 2 versions'
        } ),
				require('cssnano')(),
				require('perfectionist')({
					format: 'compact'
				}),
      ]
    },
    files: [ {
      src: '<%= paths.site %>/nccpt.css',
      dest: '<%= paths.site %>/nccpt.css'
    } ]
  }
};

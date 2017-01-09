module.exports = {
  options: {},
  dev: {
    options: {
      outputStyle: 'expanded',
      sourceComments: true
    },
    files: [ {
      src: '<%= paths.src %>/scss/nccpt.scss',
      dest: '<%= paths.dist %>/nccpt.css'
    } ]
  },
  static: {
    // options: {
    //   outputStyle: 'compact'
    // },
    files: [ {
      src: '<%= paths.src %>/scss/nccpt.scss',
      dest: '<%= paths.site %>/nccpt.css'
    } ]
  }
};

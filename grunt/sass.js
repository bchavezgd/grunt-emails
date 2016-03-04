module.exports = {
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
};
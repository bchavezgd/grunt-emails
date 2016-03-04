module.exports = {
  content: {
    files: [
          '<%= paths.src %>/emails/*',
          '<%= paths.src %>/layouts/*',
          '<%= paths.src %>/partials/*',
          '<%= paths.src %>/data/*'
        ],
    tasks: ['assemble:pages']
  },
  styles: {
    files: ['<%= paths.src %>/scss/*'],
    tasks: ['sass:dev', 'postcss:dev']
  },
  graphics: {
    files: ['<%= paths.src_img %>/*'],
    tasks: ['newer:imagemin:dev']
  },
  options: {
    spawn: false,
    event: ['all'],
    livereload: true
  }
};

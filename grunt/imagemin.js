module.exports = {
  options: {
    optimizationLevel: 3,
    svgoPlugins: [{
      removeViewBox: false
    }]
  },
  dev: {
    files: [{
      expand: true,
      cwd: '<%= paths.src_img %>',
      src: ['**/*.{png,jpg,gif}'],
      dest: '<%= paths.dist_img %>'
  }]
  }
};
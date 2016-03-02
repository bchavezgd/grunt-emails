module.exports = {
  done: {
    options: {},
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: ''
    }]
  }
};

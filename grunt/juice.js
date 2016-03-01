module.exports = {
  done: {
    options: {
      removeStyleTags: false,
      preserveMediaQueries: true
    },
    file: [{
      src: '<%= paths.dist %>/*.html',
      dest: '<%= paths.dist %>/'
    }]
  }
};

module.exports = {
  done: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
      collapseBooleanAttributes: true,
      removeEmptyElements: true
    },
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: ''
  }]
  }
};

module.exports = {
  done: {
    options: {},
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: ''
    }]
  },
  test: {
    options: {
      applyStyleTags: true, 
      removeStyleTags: true,
      
    },
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: ''
    }]
  }
};
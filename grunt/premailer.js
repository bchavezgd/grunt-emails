module.export = {
  html: {
    options: {
      removeComments: true
    },
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: ''
        }]
  },
  txt: {
    options: {
      mode: 'txt'
    },
    files: [{
      expand: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: '',
      ext: '.txt'
        }]
  }
};

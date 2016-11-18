module.exports = {
  options: {
    layoutext: '.hbs',
    layout: 'nccpt',
    plugins: ['assemble-markdown-data'],
    layoutdir: '<%= paths.src %>/layouts',
    partials: ['<%= paths.src %>/partials/**/*.hbs'],
    data: '<%= paths.src %>/data/*.{json,yml}',
    helpers: '<%= paths.src %>/helpers/*.js',
    flatten: true
  },
  pages: {
    expand: true,
    cwd: '<%= paths.src %>/emails/',
    src: ['*.{hbs,md}'],
    dest: '<%= paths.dist %>/'
  },
  static: {
    expand: true,
    cwd: '<%= paths.src %>/emails/',
    src: ['*.{hbs,md}'],
    dest: '<%= paths.site %>/'
  }
};

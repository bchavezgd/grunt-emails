module.exports = function (grunt) {
  // Load all grunt-* tasks
  require('load-grunt-config')(grunt, {
    pkg: grunt.file.readJSON('package.json'),
    // Re-usable filesystem paths
    paths: {
      site: './_site/2016',
      src: './src',
      src_img: './src/img',
      dist: './dist',
      dist_img: './dist/img'
    }
  });
};

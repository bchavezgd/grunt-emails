module.exports = function (grunt) {
  // Load all grunt-* tasks
  require('load-grunt-config')(grunt, {
    data: {
      pkg: grunt.file.readJSON('package.json'),
      // Re-usable filesystem paths
      paths: {
        site: './docs',
        src: './src',
        src_img: './src/img',
        dist: './dist',
        dist_img: './dist/img'
      }
    }
  });
};

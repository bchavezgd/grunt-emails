module.exports = {
  src_images: {
    options: {
      usePrefix: false,
      patterns: [{
        // Matches <img * src="../src/img or <img * src='../src/img'
        match: /(<img[^>]+[\"'])(\.\.\/src\/img\/)/gi,
        replacement: '$1../<%= paths.dist_img %>/'
          }, {
        // Matches url('../src/img') or url(../src/img) and even url("../src/img")
        match: /(url\(*[^)])(\.\.\/src\/img\/)/gi,
        replacement: '$1../<%= paths.dist_img %>/'
          }]
    },
    files: [{
      expand: true,
      flatten: true,
      src: ['<%= paths.dist %>/*.html'],
      dest: '<%= paths.dist %>'
        }]
  }
};

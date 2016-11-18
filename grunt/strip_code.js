module.exports = {
	done: {
		options: {
			blocks: [ {
				start_block: "<!-- strip-code-from -->",
				end_block: "<!-- strip-code-to -->"
			} ]
		},
		files: [ {
			expand: true,
			src: [ '<%= paths.dist %>/*.html' ]
		} ]
	}
};

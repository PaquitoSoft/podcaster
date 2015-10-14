module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: ['dist']
		},

		copy: {
			html: {
				src: 'index.html',
				dest: 'dist/'
			},
			fonts: {
				expand: true,
				cwd: 'node_modules/bootstrap/dist',
				src: 'fonts/*',
				dest: 'dist'
			}
		},

		filerev: {
			options: {
				algorithm: 'md5',
				length: 8
			},
			styles: {
				src: 'dist/css/**/*.css'
			},
			scripts: {
				src: 'dist/js/**/*.js'
			}
		},

		useminPrepare: {
			main: {
				src: 'index.html',
				dest: '/dist'
			}
		},

		usemin: {
			html: 'dist/index.html'
		},

		surge: {
			'podcaster': {
				options: {
					project: 'dist/',
					domain: 'podcaster.surge.sh'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-surge');

	grunt.registerTask('build', [
		'clean',
		'copy',
		'useminPrepare',
		'concat:generated',
		'cssmin:generated',
		'uglify:generated',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('deploy', ['build', 'surge']);

};

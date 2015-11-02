var webpack = require('webpack');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		eslint: {
			target: ['app/js/**/*.js']
		},

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

		webpack: {
			options: require('./webpack.config.js'),
			build: {
				output: {
					path: './dist/js',
					filename: 'app.js'
				},
				plugins: [
					new webpack.optimize.UglifyJsPlugin()
				]
			}
		},

		surge: {
			'podcaster': {
				options: {
					project: 'dist/',
					domain: 'podcaster-vanilla.surge.sh'
				}
			}
		}

	});

	grunt.registerTask('validate', ['eslint']);

	grunt.registerTask('build', [
		'validate',
		'clean',
		'copy',
		'useminPrepare',
		'concat:generated',
		'cssmin:generated',
		'webpack',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('deploy', ['build', 'surge']);

};

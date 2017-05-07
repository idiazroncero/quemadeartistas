module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		sass: {
		    options: {
		        precision: 3
		    },
		    prod: {
		    	options: {
		    	    sourceMap: false,
		    	    outputStyle: 'compressed', // expanded, compact, compressed,
		    	    sourceComments: false
		    	},
		        files: {
		            'dist/css/style.css': 'scss/style.scss'
		        }
		    },
		    dev: {
		    	options: {
		    	    sourceMap: true,
		    	    outputStyle: 'nested', // expanded, compact, compressed,
		    	    sourceComments: true
		    	},
		        files: {
		            'dist/css/style.css': 'scss/style.scss'
		        }
		    }
		},

		concat: {
		  js: {
		    src: 	[	
		    			'node_modules/jquery/dist/jquery.js',
		    			'node_modules/rellax/rellax.min.js',
		    			'node_modules/waypoints/lib/jquery.waypoints.js',
		    			'js/script.js'
		    		 ],
		    dest: 'dist/js/script.js'
		  }
		},

		uglify: {
		  prod: {
		    files: {
		      'dist/js/script.min.js': ['dist/js/script.js']
		    }
		  }
		},

		jshint: {
		  // define the files to lint
		  files: ['Gruntfile.js'],
		  // configure JSHint (documented at http://www.jshint.com/docs/)
		  options: {
		    // more options here if you want to override JSHint defaults
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    }
		  }
		},

		postcss : {
			options : {
				map : {
					inline: false, // save all sourcemaps as separate files...
          			annotation: 'dist/css/maps' // ...to the specified directory
				},
				processors: [
                    require('autoprefixer')({
                        browsers: ['> 0.1%']
                    })
                ]
			},
			css: {
				src: 'dist/css/*.css'
			},
		},

		includes: {
		  files: {
		    src: ['index.html'], // Source files
		    dest: 'dist', // Destination directory
		    flatten: true,
		    cwd: '.',
		    options: {
		    	includePath: ['partials'],
		    }
		  }
		},

		watch : {
			dist: {
				files: ['scss/**/*.scss', '**/*.html', 'js/**/*.js'],
				tasks: ['dev']
			}
		},

		surge: {
		  'quema': {
		    options: {
		      // The path or directory to your compiled project
		      project: 'dist/',
		      // The domain or subdomain to deploy to
		      domain: 'quema.surge.sh'
		    }
		  }
		}
	});


	// Carga los plugins
	grunt.registerTask('default', ['prod']);
	grunt.registerTask('dev', ['includes', 'jshint', 'concat', 'sass:dev', 'postcss']);
	grunt.registerTask('prod', ['includes', 'jshint', 'concat', 'sass:prod', 'postcss', 'uglify', 'surge']);

}; // Función wrapper
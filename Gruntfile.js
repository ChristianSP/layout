module.exports = function(grunt) {
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.initConfig({
        clean: [
            'build',
            'scss/main.scss',
            'scss/bootstrap/bootstrap.scss',
        ],
        concat: {
            js: {
                src: ['js/*.js'],
                dest: 'build/js/main.js',
            },
            scss: {
                src: ['scss/*.scss'],
                dest: 'scss/build/main.scss',
            },
            bootstrap: {
                src: ['scss/bootstrap/bootstrap-reboot.scss','scss/bootstrap/bootstrap-grid.scss','scss/bootstrap/*.scss'],
                dest: 'scss/bootstrap/bootstrap.scss',
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'build/css/main.css': 'scss/build/main.scss',
                    'build/css/bootstrap.css': 'scss/bootstrap/bootstrap.scss',
                    'build/css/tether.css': 'scss/tether/tether.sass',
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: 'scss/*.scss',
                tasks: ['reload']
            },
            bootstrap: {
                files: ['scss/bootstrap/*.scss','scss/bootstrap/**/*.scss'],
                tasks: ['reload']
            },
            js: {
                files: 'js/*.js',
                tasks: ['reload']
            },
            pug: {
                files: 'views/*.pug',
                tasks: ['reload']
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'build/*.html',
                        'build/css/*.css',
                        'build/js/*.js',
                        ]
                },
                options: {
                    watchTask: true,
                    server: './build'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'build/js/main.min.js': ['build/js/main.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                'build/css/main.min.css': ['build/css/main.css'],
                'build/css/bootstrap.min.css': ['build/css/bootstrap.css'],
                'build/css/tether.min.css': ['build/css/tether.css'],
                
                }
            }
        },
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'build/index.html': ['views/index.pug']
                }
            }
        }
    });

    grunt.registerTask('default', ['clean','concat','sass','pug','browserSync','watch']);
    grunt.registerTask('reload', ['clean','concat','sass','pug']);
    grunt.registerTask('prod', ['clean','concat','sass','uglify','cssmin','pug']);
}
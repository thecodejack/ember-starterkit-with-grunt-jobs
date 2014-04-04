// Generated on 2014-03-24 using generator-ember 0.8.3
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var emberApp = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        emberApp: emberApp,
        watch: {
            emberTemplates: {
                files: '<%= emberApp.app %>/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            neuter: {
                files: ['<%= emberApp.app %>/js/{,*/}*.js'],
                tasks: ['neuter']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'tmp/scripts/*.js',
                    '<%= emberApp.app %>/*.html',
                    '{.tmp,<%= emberApp.app %>}/styles/{,*/}*.css',
                    '<%= emberApp.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'tmp'),
                            mountFolder(connect, emberApp.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'test'),
                            mountFolder(connect, 'tmp')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, emberApp.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'tmp',
                        '<%= emberApp.dist %>/*',
                        '!<%= emberApp.dist %>/.git*'
                    ]
                }]
            },
            server: 'tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= emberApp.app %>/js/{,*/}*.js',
                '!<%= emberApp.app %>/js/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= emberApp.dist %>/scripts/{,*/}*.js',
                        '<%= emberApp.dist %>/styles/{,*/}*.css',
                        '<%= emberApp.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '!<%= emberApp.dist %>/images/no_image.png',
                        '<%= emberApp.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: 'tmp/index.html',
            options: {
                dest: '<%= emberApp.dist %>'
            }
        },
        usemin: {
            html: ['<%= emberApp.dist %>/{,*/}*.html'],
            css: ['<%= emberApp.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= emberApp.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= emberApp.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= emberApp.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= emberApp.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= emberApp.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= emberApp.dist %>/styles/main.css': [
                        'tmp/styles/{,*/}*.css',
                        '<%= emberApp.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= emberApp.app %>',
                    src: '*.html',
                    dest: '<%= emberApp.dist %>'
                }]
            }
        },
        replace: {
          app: {
            options: {
              variables: {
                ember: '../app/js/libs/ember.js',
                ember_data: 'bower_components/ember-data/ember-data.js'
              }
            },
            files: [
              {src: '<%= emberApp.app %>/index.html', dest: 'tmp/index.html'}
            ]
          },
          dist: {
            options: {
              variables: {
                ember: '../app/js/libs/ember.prod.js',
                ember_data: 'bower_components/ember-data/ember-data.prod.js'
              }
            },
            files: [
              {src: '<%= emberApp.app %>/index.html', dest: 'tmp/index.html'}
            ]
          }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [
                    { 
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: '<%= emberApp.app %>/bower_components/',
                        dest: '<%= emberApp.app %>/styles/fonts/',
                        src: [ 
                            'bootstrap-sass/dist/fonts/**', // Bootstrap
                            'font-awesome/fonts/**' // Font-Awesome
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= emberApp.app %>',
                        dest: '<%= emberApp.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            server: [
                'emberTemplates',
            ],
            test: [
                'emberTemplates',
            ],
            dist: [
                'emberTemplates',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    var templatePath = emberApp.app + '/templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            dist: {
                files: {
                    'tmp/scripts/compiled-templates.js': '<%= emberApp.app %>/templates/{,*/}*.hbs'
                }
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return emberApp.app + '/' + filepath;
                    }
                },
                src: '<%= emberApp.app %>/js/app.js',
                dest: 'tmp/scripts/combined-scripts.js'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open']);
        }

        grunt.task.run([
            'clean:server',
            'replace:app',
            'concurrent:server',
            'neuter:app',
            'copy:fonts',
            'connect:livereload',
            'open',
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'replace:app',
        'concurrent:test',
        'connect:test',
        'neuter:app',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev', //Adi
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};

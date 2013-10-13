/*jslint vars:true */
/*global module:false, require:false */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8888,
                    base: '.'
                }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:8888/test/index.html']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: {
                files: {
                    src: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/vendor/**/*.js']
                }
            },
            test: {
                files: {
                    src: ['test/js/**/*.js']
                }
            }
        },
        watch: {
            dev: {
                files: [
                    '.jshintrc',
                    'Gruntfile.js',
                    'src/**/*.html', 'src/**/*.js', 'src/**/*.css',
                    'test/**/*.html', 'test/**/*.js', 'test/**/*.css'
                ],
                tasks: ['jshint', 'reload']
            }
        },
        reload: {
            port: 6001,
            proxy: {
                host: 'localhost',
                port: 8888
            }
        },
        jssemicoloned: {
            files: [
                'Gruntfile.js',
                'src/js/**/*.js', '!src/js/vendor/**/*.js',
                'test/js/**/*.js'
            ]
        },
        clean: [
            'publish',
            'chart.zip'
        ],
        copy: {
            publish: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            '**',
                            '!**/*.js'
                        ],
                        dest: 'publish/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                beautify: false,
                lint: true,
                report: 'min'
            },
            piechart: {
                options: {
                    wrap: 'piechart'
                },
                files: {
                    'publish/js/piechart.js': [
                        'src/js/colors.js',
                        'src/js/geometry.js',
                        'src/js/drawing.js',
                        'src/js/piechart.js',
                        'src/js/export_piechartdraw.js'
                    ]
                }
            },
            datelinechart: {
                options: {
                    wrap: 'datelinechart'
                },
                files: {
                    'publish/js/datelinechart.js': [
                        'src/js/colors.js',
                        'src/js/geometry.js',
                        'src/js/drawing.js',
                        'src/js/objects.js',
                        'src/js/axis.js',
                        'src/js/dataset.js',
                        'src/js/datelinechart.js',
                        'src/js/export_datelinechartdraw.js'
                    ]
                }
            },
            excanvas: {
                options: {
                    compress: false
                },
                files: {
                    'publish/js/vendor/excanvas.js': [
                        'src/js/vendor/excanvas.js'
                    ]
                }
            }
        },
        compress: {
            options: {
                archive: 'chart.zip'
            },
            files: {
                expand: true,
                cwd: 'publish/',
                src: ['**'],
                dest: './'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-jssemicoloned');
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    grunt.registerTask('replaceScriptTags', function () {
        var piechartReplacement = grunt.file.read('publish/piechart.html');
        piechartReplacement = piechartReplacement.replace(
            /<!\-\-\s*BEGIN\s*REPLACE\s*\-\->[\s\S]*<!\-\-\s*END\s*REPLACE\s*\-\->/i,
            '<script src="js/piechart.js"></script>'
        );
        grunt.file.write('publish/piechart.html', piechartReplacement);
        var datelinechartReplacement = grunt.file.read('publish/datelinechart.html');
        datelinechartReplacement = datelinechartReplacement.replace(
            /<!\-\-\s*BEGIN\s*REPLACE\s*\-\->[\s\S]*<!\-\-\s*END\s*REPLACE\s*\-\->/i,
            '<script src="js/datelinechart.js"></script>'
        );
        grunt.file.write('publish/datelinechart.html', datelinechartReplacement);
    });

    grunt.registerTask('simpleHashres', function () {
        var renameFile = function (dir, from, to) {
            var crypto = require('crypto');
            var text = grunt.file.read(dir + '/' + from);
            var hash = crypto.createHash('md5');
            hash.update(text);
            var hashHex = hash.digest('hex').slice(0, 8);
            var newName = to.replace('${hash}', hashHex);
            grunt.file.copy(dir + '/' + from, dir + '/' + newName);
            return newName;
        };
        
        var piechartFileName = renameFile('publish/js', 'piechart.js', '${hash}.piechart.cache.js');
        var datelinechartFileName = renameFile('publish/js', 'datelinechart.js', '${hash}.datelinechart.cache.js');
        var excanvasFileName = renameFile('publish/js/vendor', 'excanvas.js', '${hash}.excanvas.cache.js');

        var piechartReplacement = grunt.file.read('publish/piechart.html');
        piechartReplacement = piechartReplacement.replace('="js/piechart.js"', '="js/' + piechartFileName + '"');
        piechartReplacement = piechartReplacement.replace('="js/vendor/excanvas.js"', '="js/vendor/' + excanvasFileName + '"');
        grunt.file.write('publish/piechart.html', piechartReplacement);

        var datelinechartReplacement = grunt.file.read('publish/datelinechart.html');
        datelinechartReplacement = datelinechartReplacement.replace('="js/datelinechart.js"', '="js/' + datelinechartFileName + '"');
        datelinechartReplacement = datelinechartReplacement.replace('="js/vendor/excanvas.js"', '="js/vendor/' + excanvasFileName + '"');
        grunt.file.write('publish/datelinechart.html', datelinechartReplacement);
    });
    
    grunt.registerTask('test', ['connect:server', 'qunit']);
    grunt.registerTask('default', ['jssemicoloned', 'jshint', 'test']);
    grunt.registerTask('publish', ['clean', 'default', 'uglify', 'copy', 'replaceScriptTags', 'simpleHashres', 'compress']);
    grunt.registerTask('dev', ['jshint', 'connect:server', 'reload', 'watch']);
    
};

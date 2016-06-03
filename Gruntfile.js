module.exports = function (grunt) {
    'use strict';

    var eslint = require('rollup-plugin-eslint');
    var babel = require('rollup-plugin-babel');
    var uglify = require('rollup-plugin-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
                    }, {
                        src: [
                            'src/js/vendor/excanvas.js'
                        ],
                        dest: 'publish/js/vendor/'
                    }
                ]
            }
        },
        rollup: {
            options: {
                format: 'iife',
                useStrict: true,
                sourceMap: true,
                plugins: [
                    eslint({
                        "parserOptions": {
                            "ecmaVersion": 6,
                            "sourceType": "module"
                        },
                        "rules": {
                            "indent": ["error", 4],
                            "linebreak-style": ["error", "windows"],
                            "no-extra-parens": ["error", "functions"]
                        }
                    }),
                    babel({
                      exclude: './node_modules/**',
                      presets: ['es2015-rollup']
                    }),
                    uglify()
                ]
            },
            piechart: {
                options: {
                    moduleName: 'piechart'
                },
                dest: 'publish/js/piechart.js',
                src: ['src/js/piechart.js']
            },
            datelinechart: {
                options: {
                    moduleName: 'datelinechart'
                },
                dest: 'publish/js/datelinechart.js',
                src: ['src/js/datelinechart.js']
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

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('publish', ['clean', 'copy', 'rollup' , 'compress']);

};

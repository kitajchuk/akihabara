/*!
 *
 * Akihabara config.
 *
 */
module.exports = function ( grunt ) {
    
    
    var topview = {
        src: [
            "node_modules/jsource/dist/MediaBox.js",
            "src/mediabox.js",
            "src/akihabara.js",
            "src/input.js",
            "src/debug.js",
            "src/trigo.js",
            "src/gbox.js",
            "src/iphopad.js",
            "src/toys.js",
            "src/tile.js",
            "src/helpers.js",
            "src/tools.js",
            "src/gamecycle.js",
            "src/devices.js",
            "src/plugins/topview.js"
        ]
    };
    var platformer = {
        src: [
            "node_modules/jsource/dist/MediaBox.js",
            "src/mediabox.js",
            "src/akihabara.js",
            "src/input.js",
            "src/debug.js",
            "src/trigo.js",
            "src/gbox.js",
            "src/iphopad.js",
            "src/toys.js",
            "src/tile.js",
            "src/helpers.js",
            "src/tools.js",
            "src/gamecycle.js",
            "src/devices.js",
            "src/plugins/platformer.js"
        ]
    };
    var shmup = {
        src: [
            "node_modules/jsource/dist/MediaBox.js",
            "src/mediabox.js",
            "src/akihabara.js",
            "src/input.js",
            "src/debug.js",
            "src/trigo.js",
            "src/gbox.js",
            "src/iphopad.js",
            "src/toys.js",
            "src/tile.js",
            "src/helpers.js",
            "src/tools.js",
            "src/gamecycle.js",
            "src/devices.js",
            "src/plugins/shmup.js"
        ]
    };
    
    
    // Project configuration.
    grunt.initConfig({
        // Project meta.
        meta: {
            version: "2.0.0"
        },
        
        
        // Project banner.
        banner:
            "/*!\n"+
            " * \n"+
            " * \n"+
            " * Akihabara - v<%= meta.version %> - <%= grunt.template.today('yyyy-mm-dd') %>\n"+
            " * Copyright (c) 2010 Francesco Cottone, http://www.kesiev.com/"+
            " * Copyright (c) <%= grunt.template.today('yyyy') %> Brandon Lee Kitajchuk\n"+
            " * Licensed MIT\n"+
            " * \n"+
            " * \n"+
            " */\n"+
            "\n",
        
        
        // Concat config.
        concat: {
            topview: {
                src: topview.src,
                dest: "dist/akihabara.topview.js"
            },
            platformer: {
                src: platformer.src,
                dest: "dist/akihabara.platformer.js"
            },
            shmup: {
                src: shmup.src,
                dest: "dist/akihabara.shmup.js"
            }
        },
        
        
        // Uglify config.
        uglify: {
            topview: {
                src: topview.src,
                dest: "dist/akihabara.topview.min.js"
            },
            platformer: {
                src: platformer.src,
                dest: "dist/akihabara.platformer.min.js"
            },
            shmup: {
                src: shmup.src,
                dest: "dist/akihabara.shmup.min.js"
            }
        },
        
        
        // Jshint config.
        jshint: {
            akihabara: {
                src: ["src/**/*.js"]
            },
            
            options: {
                jshintrc: ".jshintrc"
            }
        },
        
        
        // Clean config.
        clean: [
            "dist"
        ],
        
        
        // Watch config.
        watch: {
            akihabara: {
                files: ["src/**/*.js"],
                tasks: ["default"]
            }
        }
        
        
    });
    
    
    // Load the plugins.
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    
    
    // Register default task.
    grunt.registerTask( "default", ["jshint:akihabara", "clean", "concat", "uglify"] );
    
    
};
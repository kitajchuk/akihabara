/*!
 *
 * Akihabara config.
 *
 */
module.exports = function ( grunt ) {
    
    
    var akicore = [
        "banner.js",
        "node_modules/jsource/dist/MediaBox.js",
        "node_modules/gamed/dist/GameState.js",
        "node_modules/gamed/dist/GameQuest.js",
        "node_modules/gamed/dist/GameScreen.js",
        "src/includes/mediabox.js",
        "src/includes/gamestate.js",
        "src/includes/gamequest.js",
        "src/includes/gamescreen.js",
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
        "src/devices.js"
    ];
    var topview = {
        src: akicore.concat( ["src/plugins/topview.js"] )
    };
    var platformer = {
        src: akicore.concat( ["src/plugins/platformer.js"] )
    };
    var shmup = {
        src: akicore.concat( ["src/plugins/shmup.js"] )
    };
    
    
    // Project configuration.
    grunt.initConfig({
        // Project meta.
        meta: {
            version: "2.0.17"
        },
        
        
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
    
    
    // Register jsdoc task.
    grunt.registerTask( "jsdoc", function () {
        var spawn = require( "child_process" ).spawn,
            child = spawn( "node_modules/jsdoc/jsdoc", ["-r", "src", "-d", "docs"] );
    });
    
    
};
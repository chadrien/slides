module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            bootstrap: {
                src: [
                    "css/bootstrap.min.css",
                    "js/bootstrap.min.js",
                    "fonts/*"
                ],
                dest: "vendor/",
                cwd: "node_modules/twitter-bootstrap-3.0.0/dist/",
                expand: true
            },
            "reveal.js": {
                src: [
                    "css/reveal.min.css",
                    "css/theme/*",
                    "plugin/**/*",
                    "lib/**/*",
                    "js/reveal.min.js",
                ],
                dest: "vendor/",
                cwd: "node_modules/reveal.js/",
                expand: true
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 8000,
                    livereload: true,
                    base: '..'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
};

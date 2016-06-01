#Gulp

- Basics
    - It is a command line tool that provides task sequencing functionality.
    - It's often compared to Grunt, another popular task runner.
    - Grunt and Gulp have different paradigms though:
        - Grunt: Configuration
        - Gulp: The "configuration" is the javascript code you write
            - This gives you more fine-grain control on what happens and how the processing pipeline works.
    - Gulp by itself, is not very sophisticated.
        - It provides the basic services/plumbing and the specific tasks are typically implemented by grunt plugins.
    - The plugins are usually task specific and can be found on npm.
    - These plugins do tasks like minify, delint, compile a markup-file into html, etc.  You name it.
    - The services/pipeline Gulp exposes involve things like:
        - File Monitoring (for changes)
        - Selecting
        - General pipeline

- Task definition
    - The tasks you run are defined in a root level gulpfile.js.
    - Example:
    
        ```(javascript)
        var gulp = require('gulp');
        var markdown = require('gulp-markdown');

        gulp.task('markdown', function() {
            return gulp.src('**/*.md')
                .pipe(markdown())
                .pipe(gulp.dest(function(f) {
                    return f.base;
                }));
        });

        gulp.task('default', function() {
            gulp.watch('**/*.md', ['markdown']);
        });```

    - First, you declare them with a require statement.
    - Then you define the task with it's specific sequence of actions defined in an anonymous function passed into the gulp.task function.
    - The syntax you enter into src is called a glob (it's like a re, but different).  For documentation, see here: https://github.com/isaacs/node-glob
    - Other methods in gulp syntax:
        - src()
        - pipe()
        - watch()
        - dest()
        - task()
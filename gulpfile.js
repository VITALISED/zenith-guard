/*  eslint-disable  */
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var tsProject = ts.createProject('tsconfig.json');
var nodemon = require('gulp-nodemon')

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/**/*.ts')
                    .pipe(tsProject());
    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('dist/definitions')),
        tsResult.js.pipe(gulp.dest('dist/js'))
    ]);
});

gulp.task('scripts:watch', function() {
    gulp.watch('src/**/*.ts', gulp.series('scripts'))
})

gulp.task('nodemon', function() {
    var stream = nodemon({
        exec: 'node -r',
        args: ['dotenv/config', './dist/js/main.js', 'dotenv_config_path=./.env'],
        watch: "dist/",
    });
    return stream;});

gulp.task('default', gulp.parallel('nodemon', 'scripts', 'scripts:watch'))
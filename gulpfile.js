var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

var imgSrc = 'src/images/**';
var imgDest = 'dist/images';

gulp.task('images', function() {

    return gulp.src(imgSrc)
        .pipe(newer(imgDest))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ], {
            verbose:true
        }))
        .pipe(gulp.dest(imgDest));

});

gulp.task('watch', function() {
    gulp.watch(imgSrc, gulp.series('images'));
});



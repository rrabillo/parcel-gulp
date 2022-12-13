import gulp from 'gulp';
import newer from 'gulp-newer';
import imagemin,  {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';

var imgSrc = 'src/images/**';
var imgDest = 'dist/images';

gulp.task('images', function() {

    return gulp.src(imgSrc)
        .pipe(newer(imgDest))
        .pipe(imagemin([
            gifsicle({interlaced: true}),
            mozjpeg({quality: 75, progressive: true}),
            optipng({optimizationLevel: 5}),
            svgo({
                plugins: [
                    {
                        name: 'removeViewBox',
                        active: true
                    }
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

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

// task minifing css
gulp.task('css', () => {
    console.log('minifying css');
    // ** --> each and every folder and file name
    gulp.src('./assets/sass/**/*.scss')
    // pipe calls all the sub-middlewares in gulp
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

// task for js
gulp.task('js', (done) => {
    console.log('minifying js');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
}
);

// task for images
gulp.task('images', (done) => {
    console.log('minifying images');
    gulp.src('./assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
}
);

// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});
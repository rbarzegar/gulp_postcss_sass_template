var gulp = require('gulp'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    csslint = require('gulp-csslint'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify');

// Delete the dist folder and clear all files

gulp.task('clean', function() {
    return del('./dist');
});


// Optimise images

gulp.task('optimizeImages', ['clean'], function() {
    return gulp.src(['./app/images/**/*'])
        .pipe(imagemin([imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest('./dist/images'));
});

// Minify and lint CSS

gulp.task('minifyCSS', ['clean', 'css'], function() {
    return gulp.src('./app/css/styles.css')
        .pipe(csslint())
        .pipe(postcss(cssnano))
        .pipe(gulp.dest('./dist/css'))
});

// Minify and lint JavaScript

gulp.task('minifyJS', ['clean'], function() {
    return gulp.src('./app/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});

// Copy all other files

gulp.task('copyOtherFiles', ['clean'], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/postcss/**',
        '!./app/postcss',
        '!./app/scss/**',
        '!./app/scss',
        '!./app/js/**',
        '!./app/css/**',
        '!./app/images/**'
    ];
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./dist'));

});


gulp.task('build', ['clean', 'copyOtherFiles', 'optimizeImages', 'minifyCSS', 'minifyJS']);
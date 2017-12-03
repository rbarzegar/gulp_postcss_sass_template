var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    rucksack = require('rucksack-css'),
    pxtorem = require('postcss-pxtorem');

//Gulp SASS compiler task - don't use globs for sass compilation, focus on importing one file only

gulp.task('css', function() {
    var processors = [
        autoprefixer({
            browsers: 'last 2 versions'
        }), 
        rucksack({
            responsiveType: true,
            shorthandPosition: false,
            quantityQueries: false,
            alias: false,
            inputPseudo: false,
            clearFix: true,
            fontPath: true,
            hexRGBA: true,
            easings: true
        }), 
        pxtorem({
            rootValue: 16,
            unitPrecision: 3,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'padding', 'margin'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })
    ];
    return gulp.src('app/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('app/css'));
});
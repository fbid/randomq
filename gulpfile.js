var gulp          = require('gulp'),
    postcss       = require('gulp-postcss'),
    lost          = require('lost'),
    cssnano       = require('cssnano'),
    simplevars    = require('postcss-simple-vars'),
    nested        = require('postcss-nested'),
    uglify        = require('gulp-uglify'),
    plumber       = require('gulp-plumber'),
    autoprefixer  = require('autoprefixer'),
    imagemin      = require('gulp-imagemin'),
    concat        = require('gulp-concat')
    browserSync   = require('browser-sync'),
    sourcemaps    = require('gulp-sourcemaps');


/*====================================================
 Config
 ====================================================*/

var paths = {
  src: {
    js: './js/**/*.js',
    styles: './styles/main.css',
    imgs: ''
  },

  dest: {
    js: './dist/js',
    styles: './dist/css'
  }
}

var processors = [
  lost,
  simplevars,
  nested,
  autoprefixer(),
  cssnano()
];



/*====================================================
 Tasks
 ====================================================*/


// Minify js
gulp.task('scripts', function () {
    gulp.src(paths.src.js)
        .pipe(uglify({mangle: false}))
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest(paths.dest.js));
});

// Styles
gulp.task('styles', function() {

  return gulp.src(paths.src.styles)
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      .pipe(plumber())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dest.styles))

});

//Browser Sync
gulp.task('browser-sync', function() {

    var files = [
      '*.html',
      paths.src.styles,
      paths.src.js
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

// Imagemin
gulp.task('imagemin', function() {
    gulp.src([paths.src.imgs])
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest(paths.dest.imgs));
});

// Watcher
gulp.task('watch', function () {
    gulp.watch(paths.src.js, ['scripts']);
    gulp.watch(paths.src.styles, ['styles']);
});


/*====================================================
 MAIN
 ====================================================*/

gulp.task('default', [
    'scripts',
    'styles',
    'watch',
    'browser-sync'
]);

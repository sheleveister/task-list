import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import mustache from 'gulp-mustache';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './build',
    notify: false
  });

  gulp.watch('./build/*.html').on('change', browserSync.reload)
});

gulp.task('mustache-to-html', () => {
  gulp.src('./source/pages/*.mustache')
    .pipe(mustache({ext: '.html'}))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('mustache-to-html:watch', () => {
  gulp.watch('./source/pages/**/*.mustache', ['mustache-to-html'])
});

gulp.task('sass', () => {
  gulp.src(['./source/styles/*.scss', './source/pages/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: 'last 2 versions'
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/styles'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', () => {
  gulp.watch(['./source/styles/*.scss', './source/pages/**/*.scss'], ['sass'])
});

gulp.task('script', () => {
  gulp.src(['./source/script/*.js'])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./build/script'))
});

gulp.task('script:watch', () => {
  gulp.watch(['./source/script/*.js'], ['script'])
});

gulp.task('fonts', () => {
  gulp.src('./source/fonts/*')
    .pipe(gulp.dest('./build/fonts'))
});

gulp.task('default', [
  'mustache-to-html', 'mustache-to-html:watch',
  'sass', 'sass:watch',
  'script', 'script:watch',
  'fonts',
  'browser-sync'
]);

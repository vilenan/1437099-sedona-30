const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const rename = require('gulp-rename');
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const del = require('del');

//HTML
const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}
exports.html = html;

// Styles
const cssminify = () => {
  return gulp.src('source/css/style.css')
    .pipe(postcss([
      csso
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
};
exports.cssminify = cssminify;

//Images
const minImages = ()=> {
  return gulp.src('source/img/**/*.{jpg,png,svg')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
}
exports.minImages = minImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"))
}
exports.copyImages = copyImages;

// Webp
const createWebp = ()=> {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img'));
}
exports.createWebp = createWebp;

// Clean
const clean = ()=> {
  return del('build');
}
exports.clean = clean;

//Copy
const copy = ()=> {
  return gulp.src([
    'source/img/**/*.svg',
    'source/fonts/*.{woff,woff2}',
    'source/*.ico',
    'source/manifest.webmanifest'
    ],
    {base:'source'})
    .pipe(gulp.dest('build'));
}
exports.copy = copy;

const server = (done)=> {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
    });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  browserSync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/css/style.css", gulp.series(cssminify));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  minImages,
  gulp.parallel(
    cssminify,
    html,
    createWebp
  ),
);
exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    cssminify,
    html,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));

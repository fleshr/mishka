const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const postcss_autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const webp = require('gulp-webp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
}

exports.html = html;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Scripts

const scripts = () => {
  return gulp.src("source/js/**/*.js")
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

const cwebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
}

exports.cwebp = cwebp;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**/*.{jpg,png,svg}"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch("source/*.html"), gulp.series(html);
}

// Build

const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    styles,
    scripts,
    copy,
    images,
    cwebp
  )
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  gulp.parallel(
    html,
    styles,
    scripts,
    copy,
    images,
    cwebp
  ),
  gulp.series(
    server,
    watcher
  )
);

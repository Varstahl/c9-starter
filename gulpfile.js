// Defining requirements
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const rimraf = require("gulp-rimraf");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulpSequence = require("gulp-sequence");
const autoprefixer = require("gulp-autoprefixer");
const webpack_stream = require("webpack-stream");
const webpack_config = require("./webpack.config.js");

// Configuration file to keep your code DRY
const cfg = require("./buildconfig.json");
const paths = cfg.paths;

const scriptMain = paths.js + "/main.js";
const scriptDist = paths.dist + "/js";
const styleDist = paths.dist + "/css";

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task("watch", function() {
  // This happens once on running 'gulp watch'
  gulpSequence("dropdist", "webpack-once", "scripts", "styles")(function(err) {
    if (err) console.log(err);
  });
  // These happen each time a watched file is
  gulp.watch(scriptMain, function() {
    gulpSequence("webpack-watch", "scripts")(function(err) {
      if (err) console.log(err);
    });
  });
  gulp.watch(paths.styles + "/**/*.scss", ["styles"]);
  //Inside the watch task.
  gulp.watch(paths.img + "/**", ["imagemin-watch"]);
});

gulp.task("dropdist", function() {
  return gulp
    .src(paths.dist + "/**/*", { read: false }) // Much faster
    .pipe(rimraf());
});

gulp.task("webpack-once", function() {
  webpack_config.watch = false;
  return gulp
    .src(scriptMain)
    .pipe(webpack_stream(webpack_config))
    .on("error", function handleError() {
      this.emit("end"); // Recover from errors
    })
    .pipe(gulp.dest(scriptDist));
});

gulp.task("webpack-watch", function() {
  return (
    gulp
      .src(scriptMain)
      .pipe(webpack_stream(webpack_config))
      // .pipe(gzip())
      .on("error", function handleError() {
        this.emit("end"); // Recover from errors
      })
      .pipe(gulp.dest(scriptDist))
  );
});

// Run:
// gulp scripts.
// Uglifies and concat all JS files into one
gulp.task("scripts", function() {
  var scripts = [
    paths.node + "/babel-polyfill/dist/polyfill.js",

    paths.node + "/js/bootstrap4/bootstrap.js",

    scriptDist + "/main.bundle.js"
  ];
  gulp
    .src(scripts)
    .pipe(concat("theme.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(scriptDist));
});

// Run:
// gulp styles
// Runs gulp sass then gulp minify
gulp.task("styles", function(callback) {
  gulpSequence("sass", "minifycss")(callback);
});

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task("sass", function() {
  var stream = gulp
    .src(paths.styles + "/*.scss")
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit("end");
        }
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
    .pipe(gulp.dest(paths.styles));
  return stream;
});

gulp.task("minifycss", function() {
  return gulp
    .src(paths.styles + "/theme.css")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cleanCSS({ compatibility: "*" }))
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit("end");
        }
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(styleDist));
});

/**
 * Ensures the 'imagemin' task is complete before reloading browsers
 * @verbose
 */
gulp.task("imagemin-watch", ["imagemin"], function() {
  browserSync.reload();
});

// Run:
// gulp imagemin
// Running image optimizing task
gulp.task("imagemin", function() {
  gulp
    .src(paths.img + "/**")
    .pipe(imagemin())
    .pipe(gulp.dest(paths.img));
});

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task("browser-sync", function() {
  browserSync.init(cfg.browserSyncWatchFiles, cfg.browserSyncOptions);
});

// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task("watch-bs", ["browser-sync", "watch", "scripts"], function() {});

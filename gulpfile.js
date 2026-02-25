const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

/* CSS Minify */
function styles() {
    return gulp.src([
        "assets/css/*.css",
        "!assets/css/swiper-bundle.min.css"  // ignore this file
    ])
        .pipe(concat("style.css"))   // no .min here
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("assets/css"));
}

/* JS Combine + Minify */
function scripts() {
    return gulp.src([
        "assets/js/libs/*.js",
        "assets/js/utils/*.js",
        "assets/js/*.js"
    ])
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("assets/js"));
}

/* Watch */
function watchFiles() {
    gulp.watch("assets/css/*.css", styles);
    gulp.watch("assets/js/**/*.js", scripts);
}

exports.default = gulp.series(gulp.parallel(styles, scripts), watchFiles);
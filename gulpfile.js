var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var webpack = require("webpack-stream");
var rimraf = require("rimraf");
var less = require("gulp-less");
var concat = require("gulp-concat");

gulp.task("clean-dist", (cb) => {
    rimraf('./dist', cb);
});

gulp.task("clean-build", (cb) => {
    rimraf('./build', cb);
});

gulp.task("clean", ['clean-dist', 'clean-build']);

gulp.task("copy-html", () => (
    gulp.src('src/*html')
    .pipe(gulp.dest("dist"))
));

gulp.task("less", () => (
    gulp.src("src/**/*.less")
    .pipe(less())
    .pipe(concat("style.css"))
    .pipe(gulp.dest("build/"))
));

gulp.task("copy-css", ["less"], () => (
    gulp.src('./build/style.css')
    .pipe(gulp.dest("./dist/"))
));

gulp.task("typescript", ["copy-css"], () => (
    tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"))
));

gulp.task("default", ['typescript', 'copy-html', 'copy-css'], () => (
    gulp.src("build/src/index.js")
    .pipe(webpack({
        output: {
            filename: 'script.js',
        }
    }))
    .pipe(gulp.dest('dist'))
));

gulp.task("build-dev", ['typescript', "copy-html", "copy-css"], () => (
    gulp.src("build/src/index.js")
    .pipe(webpack({
        devtool: 'source-map',
        output: {
            filename: 'script.js',
        }
    }))
    .pipe(gulp.dest('dist'))
));

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var webpack = require("webpack-stream");
var rimraf = require("rimraf");

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

gulp.task("typescript", ['clean-build'], () => (
    tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"))
));

gulp.task("default", ['typescript', 'copy-html'], () => (
    gulp.src("build/index.js")
    .pipe(webpack({
        output: {
            filename: 'script.js'
        }
    }))
    .pipe(gulp.dest('dist'))
));

gulp.task("build-dev", ['typescript', 'clean-dist'], () => (
    gulp.src("build/index.js")
    .pipe(webpack({
        devtool: 'source-map',
        filename: 'script.js'
    }))
    .pipe(gulp.dest('dist'))
));

gulp.task("watch", () => (
    gulp.watch('src/**/*', ['build-dev', 'copy-html'])
));
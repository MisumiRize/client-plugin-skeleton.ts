var gulp = require("gulp"),
    tsc = require("gulp-tsc"),
    mocha = require("gulp-mocha"),
    Q = require("q"),
    browserify = require("browserify")
    source = require("vinyl-source-stream");

gulp.task("compile", function() {
    var defer = Q.defer();
    gulp.src("./test/{,**/}*.ts")
        .pipe(tsc())
        .pipe(gulp.dest("./.tmp/"))
        .on("end", function() {
            defer.resolve();
        });
    return defer.promise;
});

gulp.task("build", ["compile"], function() {
    return browserify("./.tmp/src/person.js", { standalone: "Person" })
        .bundle()
        .pipe(source("person.js"))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("test", ["build"], function() {
    return gulp.src("./.tmp/test/{,**/}*.js")
        .pipe(mocha());
});

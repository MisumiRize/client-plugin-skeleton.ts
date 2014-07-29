var gulp = require("gulp"),
    tsc = require("gulp-tsc"),
    mocha = require("gulp-mocha"),
    Q = require("q");

gulp.task("compile", function() {
    var defer = Q.defer();
    gulp.src("test/{,**/}*.ts")
        .pipe(tsc())
        .pipe(gulp.dest(".tmp/"))
        .on("end", function() {
            defer.resolve();
        });
    return defer.promise;
});

gulp.task("test", ["compile"], function() {
    gulp.src(".tmp/test/{,**/}*.js")
        .pipe(mocha());
});

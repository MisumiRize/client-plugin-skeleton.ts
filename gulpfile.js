"use strict";

var gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    tsd = require("tsd"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream");

gulp.task("definition", function() {
    var api = new tsd.API(new tsd.Context());
    return api.readConfig().then(function() {
        api.reinstall(tsd.Options.fromJSON({ saveToConfig: true }));
    });
});

gulp.task("compile", function() {
    return gulp.src("./test/{,**/}*.ts")
        .pipe($.tsc())
        .pipe(gulp.dest("./.tmp/"));
});

gulp.task("build", ["compile"], function() {
    return browserify("./.tmp/src/person.js", { standalone: "Person" })
        .bundle()
        .pipe(source("person.js"))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("test", ["build"], function() {
    return gulp.src("./.tmp/test/{,**/}*.js")
        .pipe($.mocha());
});

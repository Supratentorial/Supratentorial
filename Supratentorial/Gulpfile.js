/// <vs SolutionOpened='watch, default' />
var gulp = require("gulp");
var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var sass = require("gulp-sass");
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");
var fs = require("fs");
var wiredep = require('wiredep');
var inject = require('gulp-inject');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var series = require('stream-series');
var plumber = require('gulp-plumber');

var paths = {
    distFolder: "dist/",
    distVendorDir: "dist/lib",
    distCSSDir: "dist/css",
    distCSSFiles: "dist/css/app.css",
    distJSDir: "dist/js",
    distHTMLDir: "dist/html",
    distJSFiles: "dist/js/**/*.js",
    distIndexFile: "dist/index.html",
    srcSCSSFiles: "app/styles/**/*.scss",
    srcTSFiles: "app/**/*.ts",
    srcIndexFile: "app/index.html",
    srcHTMLFiles: "app/**/*.html",
    typings: "app/typings/**/*.d.ts",
    bower: "bower_components/**/*.min.js"
};

gulp.task("clean", function () {
    gulp.src(paths.distCSSDir, { read: false })
    .pipe(clean());
    gulp.src(paths.distVendorDir, { read: false })
    .pipe(clean());
    gulp.src(paths.distIndexFile, { read: false })
    .pipe(clean());
    gulp.src(paths.distHTMLDir, { read: false })
    .pipe(clean());
    return gulp.src(paths.distJSDir, { read: false })
    .pipe(clean());
});

//Transpiles app SCSS files into minifed CSS and writes them into dist.
gulp.task("transpile-scss", function () {
    return gulp.src(paths.srcSCSSFiles)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass({ style: "expanded" }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.distCSSDir));
});

//Transpiles app typescript files to javascript and writes them into dist.
gulp.task('transpile-ts', function () {
    var clientResult = gulp.src([paths.srcTSFiles, paths.typings])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(ts({
            target: 'ES6',
            declarationFiles: false,
            noExternalResolve: true
        }));
    return clientResult.js.pipe(gulp.dest(paths.distJSDir));
});

//Copies vendor javascript files as well as Angular templates to dist directory.
gulp.task('copy-vendor-libs', function () {
    gulp.src(wiredep().js) //Bower main JS source files
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
    .pipe(gulp.dest(paths.distVendorDir));
    gulp.src(wiredep().css).pipe(gulp.dest(paths.distCSSDir)); //Bower main CSS source files
    return gulp.src([paths.srcHTMLFiles, '!app/index.html']).pipe(gulp.dest(paths.distHTMLDir));
});

//Injects JS and CSS reference tags in index.html from Bower and app src files.
gulp.task('wiredep', ["copy-vendor-libs", "transpile-scss", "transpile-ts"], function () {
    return gulp.src(paths.srcIndexFile)
       .pipe(wiredep.stream({
           fileTypes: {
               html: {
                   replace: {
                       js: function (filePath) {
                           return '<script src="' + 'lib/' + filePath.split('/').pop() + '"></script>';
                       },
                       css: function (filePath) {
                           return '<link rel="stylesheet" href="' + 'css/' + filePath.split('/').pop() + '"/>';
                       }
                   }
               }
           }
       }))
   .pipe(inject(gulp.src([paths.distJSFiles], { read: false }), {
       addRootSlash: false,
       transform: function (filePath, file, i, length) {
           return '<script src="' + filePath.replace('dist/', '') + '"></script>';
       }
   }))
   //.pipe(inject(gulp.src(paths.distCSSFiles, { read: false }), {
   //    addRootSlash: false,
   //    transform: function (filePath, file, i, length) {
   //        return '<link rel="stylesheet" href="' + filePath.replace('dist/', '') + '"/>';
   //    }
   //}))
   .pipe(gulp.dest(paths.distFolder));
});

//Watches src SCSS, TS and Index files.
gulp.task("watch", function () {
    gulp.watch(paths.srcSCSSFiles, ["default"]);
    gulp.watch(paths.srcTSFiles, ["default"]);
    gulp.watch(paths.srcIndexFile, ["default"]);
    gulp.watch(paths.srcHTMLFiles, ["default"]);
});

gulp.task("default", ["wiredep"], function () { });
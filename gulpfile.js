/* eslint-disable */
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var removeLogging = require('gulp-remove-logging');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// CONFIG /////////////////////////////////////////////////////////////////////////
// 경로
var projectPath = {
    tmp: './.tmp',
    src: './src',
    dev: './dist',
    public: './dist',
};

var entryFile = {
    scss: projectPath.src + '/style/index.scss',
};

// 파일명
var fileName = {
    vendor: 'uipack-idus.vendor',
    jsFile: 'uipack-idus',
    cssFile: 'uipack-idus'
};

// js concat 순서
var clientJS = [
    projectPath.src + '/js/init.js',
    projectPath.src + '/js/modules/**.js' // load modules
];

var vendorJS = [
    './node_modules/jquery/dist/jquery.min.js'
];

var vendorCSS = [
];

// devTasks
function development() {
    bs.init({
        server: {
            baseDir: './dist',
        },
        notify: false
    });

    // watch dev src
    gulp.watch(projectPath.src + '/**/*.scss', styles);
    gulp.watch(projectPath.src + '/**/*.js', scripts);
}

function scripts() {
    return gulp.src(clientJS)
        .pipe(sourcemaps.init())
        .pipe(concat({
            path: fileName.jsFile + '.js'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(projectPath.dev + '/js'))
        .pipe(bs.stream());
}

function styles() {
    return gulp.src(entryFile.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: false,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(rename(fileName.cssFile + '.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(projectPath.dev + '/css'))
        .pipe(bs.stream());
}

function minScript() {
    return gulp.src(clientJS)
        .pipe(concat({
            path: fileName.jsFile + '.min.js'
        }))
        .pipe(removeLogging()) // remove console.log()
        .pipe(uglify())
        .pipe(gulp.dest(projectPath.tmp + '/js'));
}

function minCss() {
    return gulp.src(entryFile.scss)
        .pipe(sass({
            errLogToConsole: false,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['< 5%'],
            cascade: false
        }))
        .pipe(rename(fileName.cssFile + '.min.css'))
        .pipe(gulp.dest(projectPath.tmp + '/css'));
}

function vendorScript() {
    return gulp.src(vendorJS)
        .pipe(concat({
            path: fileName.vendor + '.min.js'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(projectPath.tmp + '/js'));
}

// function vendorStyle() {
//     return gulp.src(vendorCSS)
//         .pipe(concat({
//             path: fileName.vendor + '.min.css'
//         }))
//         .pipe(cssnano({
//             discardComments: {
//                 removeAll: true
//             }
//         }))
//         .pipe(gulp.dest(projectPath.tmp + '/css'));
// }

// build tasks
function cleanTmp() {
    return del(projectPath.tmp);
}

function tmpToPublic() {
    return gulp.src(projectPath.tmp + '/**/*')
        .pipe(gulp.dest(projectPath.public));
}


function deployment() {
    return gulp.src('./dist/**/*').pipe(ghPages())
}

gulp.task('deploy', deployment);

// development task
gulp.task('default', gulp.series(
    gulp.parallel(styles, scripts),
    // watch task
    development
));

// build task - minify resources
gulp.task('build', gulp.series(
    // clear tmp folder
    cleanTmp,

    // concat & minify src
    gulp.parallel(vendorScript, minScript, minCss),

    // move tmp to public
    tmpToPublic
));

// // gh-pages
// gulp.task('deploy', ghpages);
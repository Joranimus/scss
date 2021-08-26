let gulp = require('gulp'),
    fileInclude = require('gulp-file-include'),
    rigger = require('gulp-rigger'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    notify = require("gulp-notify"),
    svgSprite = require('gulp-svg-sprite');

const source = 'source/';
const sass_source = source + 'sass/';
const js_source = source + 'js/';
const sprite_source = source + 'img/icons/';
const html_source = source + 'html/';
const build = 'build/';
const css_build = build + 'css/';
const js_build = build + 'js/';
const html_build = build + 'html/';
const sprite_build = build + 'img/';

function html(done) {
    gulp.src(html_source+'*.html')
        .pipe(fileInclude())
        .pipe(rigger())
        .pipe(gulp.dest(html_build))
        .pipe(reload({stream: true}));
        done();
}
function js_libs(done) {
    gulp.src(js_source+'lib/*.js')
        .pipe(order([
            'jquery.js',
            js_source+'lib/*.js'
        ]))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(js_build))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(gulp.dest(js_build));
        done();
}
function js_index(done) {
    gulp.src(js_source+'index.js')
        .pipe(gulp.dest(js_build))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js"
        }))
        .pipe(gulp.dest(js_build));
    done();
}
function sass_style(done) {
    gulp.src(sass_source+'**/*.+(sass|scss)')
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", notify.onError()))
        .pipe(autoprefixer(['last 20 versions', '> 1%', 'ie > 10']))
        .pipe(rename(function (path) {
            path.extname = ".css"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(css_build))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.extname = ".min.css"
        }))
        .pipe(gulp.dest(css_build))
        .pipe(reload({stream: true}));
    done();
}
function sprite(done) {
    gulp.src(sprite_source+'*.svg')
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                },
                shape: {
                    transform: []
                }
            }
        ))
        .pipe(gulp.dest(sprite_build));
    done();
}
function watch(done){
    const js_index_watcher = gulp.watch([js_source + 'index.js']);
    const js_libs_watcher = gulp.watch([js_source + 'lib/*.js']);
    const sprite_watcher = gulp.watch([sprite_source + '*.svg']);
    const html_watcher = gulp.watch([html_source + '**/*.html']);
    const sass_watcher = gulp.watch([sass_source+'**/*.(sass|scss)']);

    js_index_watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        js_index(done);
    });
    js_libs_watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        js_libs(done);
    });
    js_libs_watcher.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
        js_libs(done);
    });
    js_libs_watcher.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
        js_libs(done);
    });
    sprite_watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        sprite(done);
    });
    sprite_watcher.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
        sprite(done);
    });
    sprite_watcher.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
        sprite(done);
    });
    html_watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        html(done);
    });
    html_watcher.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
        html(done);
    });
    html_watcher.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
        html(done);
    });
    sass_watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
        sass_style(done);
    });
    sass_watcher.on('add', function(path, stats) {
        console.log(`File ${path} was added`);
        sass_style(done);
    });
    sass_watcher.on('unlink', function(path, stats) {
        console.log(`File ${path} was removed`);
        sass_style(done);
    });

    // js_libs_watcher.close();
    done();
}

gulp.task('build', gulp.parallel(html, js_libs, js_index, sass_style, sprite));
gulp.task('watch', watch);

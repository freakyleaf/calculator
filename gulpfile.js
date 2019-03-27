const autoprefixer     = require('gulp-autoprefixer');
const browsersync      = require('browser-sync');
const cssnano          = require('gulp-cssnano');
const del              = require('del');
const gulp             = require('gulp');
const lintscript       = require('gulp-eslint');
const lintstyle        = require('gulp-stylelint');
const path             = require('path');
const plumber          = require('gulp-plumber');
const rename           = require('gulp-rename');
const sass             = require('gulp-sass');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');

// Better error reporting
require('pretty-error').start();

// Project settings
const settings = {
    _file: {
        dest: {
            style: 'style.css'
        },
        src: {
            style: 'style.scss'
        }
    },
    _path: {
        dest: {
            html: '/',
            root: path.join(__dirname, 'dist'),
            script: 'script',
            style: 'style'
        },
        src: {
            html: 'html',
            root: path.join(__dirname, 'src'),
            script: 'script',
            style: 'style'
        }
    },
    _plugin: {
        browsersync: {
            options: {
                notify: {
                    styles: [
                        'display: none',
                        'z-index: 9999',
                        'position: fixed',
                        'top: 0',
                        'right: 0',
                        'margin: 0',
                        'padding: 10px',
                        'font-family: sans-serif',
                        'font-size: 12px',
                        'text-align: center',
                        'color: #fff',
                        'background-color: #2a2a2a',
                    ],
                },
                port: 3000,
                reloadDelay: 1000,
                server: 'dist/',
                ui: {
                    port: 3001,
                },
            },
        },
        sass: {
            precision: 8,
        }
    }
}

const { _file, _path, _plugin } = settings;

// Clean task
gulp.task('clean', () => {
    return del([
        _path.dest.root,
    ]);
});

// HTML task
gulp.task('html', () => {
    return gulp.src(path.join(_path.src.root, _path.src.html, '**/*.html'))
        .pipe(gulp.dest(_path.dest.root, _path.dest.html));
});

// Script task
gulp.task('script', () => {
    return gulp.src(path.join(_path.src.root, _path.src.script, '**/*.js'))
        .pipe(plumber())
        .pipe(lintscript())
        .pipe(lintscript.format())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(_path.dest.root, _path.dest.script)));
});

// Style task
gulp.task('style', () => {
    return gulp.src(path.join(_path.src.root, _path.src.style, _file.src.style))
        .pipe(plumber())
        .pipe(lintstyle())
        .pipe(sourcemaps.init())
        .pipe(sass(_plugin.sass))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename(_file.dest.style))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(_path.dest.root, _path.dest.style)));
});

// Default task
gulp.task('default',
    gulp.series(
        'clean',
        'html',
        'script',
        'style',
    ));

// Server reload task
gulp.task('reload', (done) => {
    browsersync.reload();
    done();
});

// Watch task
gulp.task('watch',
    gulp.series(((done) => {

        browsersync.init(_plugin.browsersync.options);

        gulp.watch([
            'src/**/*.html',
        ], gulp.series(
            'html',
            'reload'));

        gulp.watch([
            'src/**/*.js',
        ], gulp.series(
            'script',
            'reload'));

        gulp.watch([
            'src/**/*.scss',
        ], gulp.series(
            'style',
            'reload'));

        done();

    })));

// Development task
gulp.task('dev',
    gulp.series(
        'default',
        'watch',
    ));

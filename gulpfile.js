const {src, dest, watch, parallel} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const del = require('del');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');

function styles() {
    return src([
        'node_modules/normalize.css/normalize.css',
        // 'node_modules/magnific-popup/dist/magnific-popup.css',
        // 'node_modules/swiper/swiper-bundle.css',
        'docs/scss/fonts.scss',
        'docs/scss/default.scss',
        'docs/scss/style.scss',
        'docs/scss/media.scss'
    ])
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(concat('style.min.css'))
        .pipe(dest('docs/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        // 'node_modules/jquery/dist/jquery.js',
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        // 'node_modules/swiper/swiper-bundle.js',
        'docs/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('docs/js'))
        .pipe(browserSync.stream())
}

function fonts() {
    return src('docs/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('docs/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('docs/fonts'))
}

function pages() {
    return src('docs/pages/*.html')
        .pipe(include({
            includePaths: 'docs/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function images() {
    return src('docs/img/src/*.*', '!docs/img/src/*.svg')
        .pipe(newer('docs/img'))
        .pipe(avif({quality: 50}))
        .pipe(src('docs/img/src/*.*'))

        .pipe(newer('docs/img'))
        .pipe(webp())
        .pipe(src('docs/img/src/*.*'))

        .pipe(newer('docs/img'))
        .pipe(imagemin())
        .pipe(dest('docs/img'))
}

function sprite() {
    return src('docs/img/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('docs/img'))
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "docs/"
        }
    });
    watch(['docs/scss/**/*.scss'], styles);
    watch(['docs/img/src/*.*'], images);
    watch(['docs/fonts/src/*.*'], fonts);
    // watch(['docs/components/*.*', 'docs/pages/*.*'], pages);         //несколько страниц
    watch(['docs/*.html']).on('change', browserSync.reload);
    watch(['docs/js/**/*.js', '!docs/js/**/main.min.js'], scripts);
}

function build() {
    del.sync('dist');
    images();
    return src([
        'docs/*.html',
        'docs/css/style.min.css',
        'docs/js/main.min.js',
        'docs/fonts/*.*',
        'docs/img/*.*',
        '!docs/img/*.svg',
        'docs/img/sprite.svg'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.watching = watching;
exports.scripts = scripts;
exports.build = build;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts;
exports.pages = pages;
exports.default = parallel(styles, scripts, images, fonts, pages, watching);

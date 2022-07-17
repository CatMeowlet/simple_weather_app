// FOR SASS
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sassGlob = require('gulp-sass-glob');
const mqpacker = require('css-mqpacker');
const normalize = require('postcss-normalize');
const postcssPresetEnv = require('postcss-preset-env');
const sortCSSmq = require('sort-css-media-queries');
// const sassImporter = require('sass-module-importer');
const packageImporter = require('node-sass-package-importer');
const size = require('gulp-size');

// FOR CSS
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss'); // remove unused css styles

// FOR ICON FONT
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const async = require('async');

// FOR JS
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const javascriptObfuscator = require('gulp-javascript-obfuscator'); // make the compiled code hard to read

// FOR IMAGE COMPRESSING
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');

// FOR SOURCEMAPPING
const sourcemaps = require('gulp-sourcemaps');

// FOR CLEAN AND DELETE FILES
const clean = require('gulp-clean');
const filter = require('gulp-filter');
// FOR PATH
const path = require('path');

// CHECK FILE IF NEW
const newer = require('gulp-newer');

const {
    src,
    dest,
    watch,
    parallel,
    series,
    gulp
} = require('gulp');

const browserSync = require('browser-sync').create();
// ROOT PATH
const SRC_ROOT_PATH = "./";
const SRC_JS_PATH = path.resolve(SRC_ROOT_PATH, 'js/**/*.js');
const SRC_SCSS_PATH = path.resolve(SRC_ROOT_PATH, 'scss/**/*.scss');
const SRC_IMG_PATH = [SRC_ROOT_PATH + 'image/**/*', '!' + SRC_ROOT_PATH + "image/raw/**/*"];
const SRC_IMG_PATH_COPY_ONLY = path.resolve(SRC_ROOT_PATH, "image/raw/**/*");
const SRC_FONT_PATH_COPY_ONLY = path.resolve(SRC_ROOT_PATH, "font/**/*");
const SRC_VENDOR_PATH_COPY_ONLY = path.resolve(SRC_ROOT_PATH, "vendor/**/*");
const SRC_VIDEO_PATH_COPY_ONLY = path.resolve(SRC_ROOT_PATH, "video/**/*");

// DESTINATION PATH
const DEST_ROOT_PATH = "../public/release";
const DEST_VENDOR_ROOT_PATH = "../public/vendor/gulp"
const DEST_SCSS_PATH = path.resolve(DEST_ROOT_PATH, 'mini');
const DEST_JS_PATH = path.resolve(DEST_ROOT_PATH, 'ugly');
const DEST_IMG_PATH = path.resolve(DEST_ROOT_PATH, 'tiny');
const DEST_IMG_PATH_COPY_ONLY = path.resolve(DEST_ROOT_PATH, 'tiny/raw');
const DEST_FONT_PATH_COPY_ONLY = path.resolve(DEST_ROOT_PATH, "font");
const DEST_VIDEO_PATH_COPY_ONLY = path.resolve(DEST_ROOT_PATH, "media");

// WATCH PATH
const WATCH_ROOT_PATH = "./";
const WATCH_JS_PATH = WATCH_ROOT_PATH + 'js/**/**';
const WATCH_SCSS_PATH = WATCH_ROOT_PATH + 'scss/**/**';
const WATCH_IMG_PATH = WATCH_ROOT_PATH + 'image/**/**';

// PURGE CONFIGURATION
const PURGE_CSS_SRC = path.resolve(DEST_SCSS_PATH, '**/*.css');
const PURGE_FILE_SRC = ['../**/*.php', '../**/*.html', '../resources/views/**/*.blade.php'];
const PURGE_DEST = DEST_SCSS_PATH;

function clean_files() {
    return src(DEST_ROOT_PATH, {
            read: false,
            allowEmpty: true,
        })
        .pipe(filter(['*', '!iconfont']))
        .pipe(clean({
            force: true
        }));
}

function clean_vendor() {
    return src(DEST_VENDOR_ROOT_PATH, {
            read: false,
            allowEmpty: true,
        })
        .pipe(clean({
            force: true
        }));
}

function clean_media() {
    return src(DEST_VIDEO_PATH_COPY_ONLY, {
        read: false,
        allowEmpty: true,
    }).pipe(clean({
        force: true
    }));
}

function purgeCSS() {
    return src(PURGE_CSS_SRC)
        .pipe(purgecss({
            content: PURGE_FILE_SRC
        }))
        .pipe(dest(PURGE_DEST))
}

function minify_scss() {
    return src(SRC_SCSS_PATH)
        .pipe(sassGlob())
        .pipe(sass({
            importer: packageImporter(),
            outputStyle: 'compressed',
            precision: 10
        }))
        .on("error", sass.logError)
        .pipe(postcss([normalize(), autoprefixer(), cssnano(), postcssPresetEnv(), mqpacker({
            sort: sortCSSmq
        })]))
        .pipe(size({
            showFiles: true
        }))
        .pipe(dest(DEST_SCSS_PATH))
        .pipe(browserSync.stream());
}

function generateIconFont() {
    return src(['icons/**/*.svg'])
        .pipe(iconfont({
            fontName: 'myfont',
            appendUnicode: false, // recommended option
            // prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
            normalize: true,
            fontHeight: 1001,
            centerHorizontally: true,
        })).on('glyphs', function (glyphs, options) {
            src('templates/iconfont.scss')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs.map(mapGlyphs),
                    fontName: 'myfont',
                    fontPath: '../../iconfont/',
                    className: 's'
                }))
                .pipe(dest('scss/font'))
        }).pipe(dest('../public/release/iconfont'));
}

function mapGlyphs(glyph) {
    return {
        name: glyph.name,
        codepoint: glyph.unicode[0].charCodeAt(0)
    }
}

function minify_js() {
    return src(SRC_JS_PATH)
        // .pipe(terser())
        .pipe(concat('all.js'))
        .pipe(size({
            showFiles: true
        }))
        // .pipe(javascriptObfuscator())
        .pipe(dest(DEST_JS_PATH))
        .pipe(browserSync.stream());
}

function minify_image() {
    return src(SRC_IMG_PATH)
        .pipe(newer(DEST_IMG_PATH))
        .pipe(imagemin([
            pngquant({
                quality: [0.5, 0.5]
            }),
            mozjpeg({
                quality: 50
            })
        ]))
        .pipe(size({
            showFiles: true
        }))
        .pipe(dest(DEST_IMG_PATH))
        .pipe(browserSync.stream());
}

function copy_animated_img() {
    return src(SRC_IMG_PATH_COPY_ONLY)
        .pipe(dest(DEST_IMG_PATH_COPY_ONLY));
}

function copy_font() {
    return src(SRC_FONT_PATH_COPY_ONLY)
        .pipe(dest(DEST_FONT_PATH_COPY_ONLY));
}

function copy_media() {
    return src(SRC_VIDEO_PATH_COPY_ONLY).pipe(dest(DEST_VIDEO_PATH_COPY_ONLY));
}

function publish_vendor() {
    return src(SRC_VENDOR_PATH_COPY_ONLY).pipe(dest(DEST_VENDOR_ROOT_PATH));
}

function broswer_watch() {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });

    watch(WATCH_SCSS_PATH, minify_scss);
    watch(WATCH_JS_PATH, minify_js);
    watch('../*.html').on('change', browserSync.reload);
    watch('../*.php').on('change', browserSync.reload);
}

function compile() {
    watch(WATCH_SCSS_PATH, minify_scss);
    watch(WATCH_JS_PATH, minify_js);
    watch(WATCH_IMG_PATH, series(minify_image, copy_animated_img));
}

// REMOVE DIST | DESTINATION FOLDER
exports.clean = clean_files;
// COMPILE AND BUILD DIST | DESTINATION FOLDER
exports.build = series(series(generateIconFont, series(clean_vendor, publish_vendor)), series(parallel(minify_scss, minify_js), minify_image), copy_animated_img, copy_font, series(clean_media, copy_media));
// COMPILE AND REBUILD DIST | DESTINATION FOLDER
exports.rebuild = series(series(clean_files, generateIconFont, series(clean_vendor, publish_vendor)), series(parallel(minify_scss, minify_js), minify_image), copy_animated_img, copy_font, series(clean_media, copy_media));
// COMPILE AND WATCH CHANGES FOR SCSS JS IMG
exports.watch = compile;
// COMPILE, WATCH AND SYNC CHANGES FOR SCSS JS IMG
exports.sync = broswer_watch;
// COPY FONT
exports.font = copy_font;
// COMPILE JS
exports.js = minify_js;
// GENERATE ICON FONT
exports.iconfont = generateIconFont;
// PURGE CSS
exports.purge = purgeCSS;
// COPY VENDOR
exports.vendor = series(clean_vendor, publish_vendor);

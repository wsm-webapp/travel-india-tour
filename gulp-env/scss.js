/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel : Babel :
// ==========================================================================
//import { src, dest, parallel, series, task } from 'gulp';

import { src, dest, series } from 'gulp';
import dartSass  from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import lineec from 'gulp-line-ending-corrector';
import browserSync from 'browser-sync';
import log from 'fancy-log';
const sass = gulpSass(dartSass);

import { pkgScss } from './theme.vars';

const scss = (done) => {
  Object.keys(pkgScss).forEach((libName) => {
    // console.log(pkg.cssdest + '/maps/')
    return (
      src(pkgScss[libName].filepath, { allowEmpty: true })
        .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))

        //.pipe(concat('style.min.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'bb >= 10', 'ie_mob >= 9'))
        .pipe(cleanCSS({ compatibility: 'ie8' | '*' | 'ie9' | 'ie7' }))
        .pipe(sourcemaps.write('/maps/'))
        .pipe(lineec())
        .pipe(
          browserSync.reload({
            stream: true,
          })
        )
        .on('error', log)
        .pipe(dest(pkgScss[libName].dest))
        // .pipe(notify(new Error(pkgScss[libName].filename + ' Scripts Has error')))
      // .pipe(errorNotifier.handleError(sass()))
      // .pipe(
      // 	notify({
      // 		message: 'Compile ' + pkgScss[libName].filename + ' css complete',
      // 		onLast: true,
      // 	})
      // )
    );
  });
  done();
};

module.exports = series(scss);

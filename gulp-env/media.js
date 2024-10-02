/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel :
// ==========================================================================

import { src, dest, series } from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
// import imageminAvif from 'imagemin-avif';
import log from 'fancy-log';

import { pkgMedia, pkgMediaWebp } from './theme.vars';

// copy media to output directory

const themeMedia = async () => {
  // function themeMedia() {
  //console.log(importScss);
  return (
    src(pkgMedia.filepath + pkgMedia.ext, { allowEmpty: true })
      //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(
        (imagemin(
          [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            // imageminAvif({ quality: 50 }),
            imagemin.svgo({
              plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
            }),
          ],
          {
            verbose: true,
            progressive: true,
          }
        ))
      )
      .on('error', log)
      .pipe(browserSync.reload({ stream: true }))
      .pipe(dest(pkgMedia.dest))
  );
  // .pipe(notify({ message: 'Images task complete', onLast: true }));
};

const themeMediaWebp = async () => {
  // function themeMedia() {
  //console.log(importScss);
  return (
    src(pkgMediaWebp.filepath + pkgMediaWebp.ext, { allowEmpty: true })
      //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(
        imagemin([
			imagemin.gifsicle({ interlaced: true }), 
			imagemin.mozjpeg({ progressive: true }), 
			imagemin.optipng({ optimizationLevel: 2 }), 
			// imageminAvif({ quality: 50 }),
			//  webp({ quality: 60 })
			], {
          verbose: true,
          progressive: true,
        })
      )
      // .pipe(clonesink.tap())
      .on('error', log)
      .pipe(browserSync.reload({ stream: true }))
      .pipe(dest(pkgMediaWebp.dest))
  );
  // .pipe(notify({ message: 'Images task complete', onLast: true }));
};

module.exports = series(themeMedia, themeMediaWebp);

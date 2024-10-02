/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel :
// ==========================================================================

import { src, dest, series } from 'gulp';
import log from 'fancy-log';

import { pkgImportScss, pkgImportFont } from './theme.vars';

const getScss = (done) => {
  //console.log(pkgImportScss);
  Object.keys(pkgImportScss).forEach((libName) => {
    //console.log(scss[libName])
    if (pkgImportScss[libName].ext !== undefined) {
      return console.error("pkgImportFont error", log);
    } else {
      return src(pkgImportScss[libName].filepath + pkgImportScss.filetype.ext, {
        base: pkgImportScss[libName].filepath,
        allowEmpty: true,
      })
        .on('error', log)
        .pipe(dest(pkgImportScss[libName].dest));
    }
  });
  done(); // <-- to avoid async problems using gulp 4
};

const getFonts = (done) => {
  Object.keys(pkgImportFont).forEach((libName) => {
    //console.log(scss[libName])
    if (pkgImportFont[libName].ext !== undefined) {
      return console.error("pkgImportFont error", log);
    } else {
      // console.log(pkgImportScss[libName].filename)
      return src(pkgImportFont[libName].filepath + pkgImportFont.filetype.ext, {
        base: pkgImportFont[libName].filepath,
        allowEmpty: true,
      })
        .on('error', log)
        .pipe(dest(pkgImportFont[libName].dest))
        .pipe(dest(pkgImportFont[libName].destbuild));
    }
  });
  done(); // <-- to avoid async problems using gulp 4
};

module.exports = series(getScss, getFonts);

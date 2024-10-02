/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel : compile handlebars
// ==========================================================================

import { src, dest, series } from 'gulp';
import ejs from 'gulp-ejs';
import log from 'fancy-log';
import browserSync from 'browser-sync';
import replace from 'gulp-replace';
import regexRename from 'gulp-regex-rename';
// import minifyejs from "gulp-ejs-minify";
import htmlmin from 'gulp-htmlmin';
import notify from 'gulp-notify';

import { pkgHtmlEjs } from './theme.vars';

const compileEjs = async () => {
  // console.log(pkgHtmlEjs.templatePagePath, pkgHtmlEjs.templatePageDest);
  return (
    src(pkgHtmlEjs.templatePagePath + '/**/*.page.ejs', { allowEmpty: true })
      .pipe(ejs({ async: true }).on('error', log))
      .pipe(regexRename(/\.page\.ejs$/, '.html'))
      .pipe(replace(/\uFEFF/gi, '')) //cut out zero width nbsp characters the compiler adds in
      // .pipe(minifyejs())
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
      .pipe(dest(pkgHtmlEjs.templatePageDest))
      .pipe(browserSync.reload({ stream: true }))
      .pipe(notify({ message: 'Compiled pages', onLast: true }))
  );
};

module.exports = series(compileEjs);

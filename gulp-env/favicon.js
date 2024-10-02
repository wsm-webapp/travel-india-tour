/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel : compile handlebars
// ==========================================================================

import { src, dest, series } from 'gulp';
import fs from 'fs';
import realFavicon from 'gulp-real-favicon';
import { pkgfavicon, themeInit } from './theme.vars';

// File where the favicon markups are stored
var favicon_data_file = themeInit.fileRoot.html + 'public/data-json/favicon-data.json';

// File where the favicon markups are stored

const createFavicon = async (done) => {
  realFavicon.generateFavicon(
    {
      masterPicture: pkgfavicon.filepath + pkgfavicon.filename,
      // dest: pkgfavicon.dest,
      dest: pkgfavicon.filepath + '/favicon',
      iconsPath: pkgfavicon.dest,
      html: [themeInit.fileRoot.html + 'views/partials/favicon.ejs'], //['TODO: List of the HTML files where to inject favicon markups'],
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '14%',
          assets: {
            ios6AndPriorIcons: true,
            ios7AndLaterIcons: true,
            precomposedIcons: true,
            declareOnlyDefaultIcon: true,
          },
          appName: themeInit.themename,
        },
        desktopBrowser: {
          design: 'background',
          backgroundColor: '#ffffff',
          backgroundRadius: 0.45,
          imageScale: 0.8,
        },
        windows: {
          pictureAspect: 'whiteSilhouette',
          backgroundColor: '#ffffff',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: true,
            windows10Ie11EdgeTiles: {
              small: true,
              medium: true,
              big: true,
              rectangle: true,
            },
          },
          appName: themeInit.themename,
        },
        androidChrome: {
          pictureAspect: 'backgroundAndMargin',
          margin: '17%',
          backgroundColor: '#ffffff',
          themeColor: '#ffffff',
          manifest: {
            name: themeInit.themename,
            startUrl: 'https://www.travel-india-tour.in/',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
          },
          assets: {
            legacyIcon: true,
            lowResolutionIcons: true,
          },
        },
        safariPinnedTab: {
          pictureAspect: 'silhouette',
          themeColor: '#ffffff',
        },
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: true,
        readmeFile: true,
        htmlCodeFile: true,
        usePathAsIs: false,
      },
      versioning: {
        paramName: themeInit.themename,
        paramValue: themeInit.version,
      },
      markupFile: favicon_data_file,
    },
    function () {
      done();
    }
  );
};

const injectFaviconMarkups = async () => {
  return src([themeInit.themename])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(favicon_data_file)).favicon.html_code))
    .pipe(dest('TODO: Path to the directory where to store the HTML files'));
};
const checkForFaviconUpdate = (done) => {
  var currentVersion = JSON.parse(fs.readFileSync(favicon_data_file)).version;
  realFavicon.checkForUpdates(
    currentVersion,
    function (err) {
      if (err) {
        throw err;
      }
    },
    function () {
      done();
    }
  );
};

const checkinfo = async () => {
  console.log(
    pkgfavicon.dest,
    themeInit.fileRoot.html
    // createFavicon.realFavicon.generateFavicon
  );
};

module.exports = series(createFavicon, injectFaviconMarkups, checkForFaviconUpdate, checkinfo);

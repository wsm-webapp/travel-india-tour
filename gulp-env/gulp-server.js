/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel : Compile handelbars
// ==========================================================================

import { series } from 'gulp';
import browserSync from 'browser-sync';
import { pkgConfig } from './theme.vars';

// craete localhost config

const localHostSync = (done) => {
	browserSync.init(pkgConfig.browserSync);
	// console.log(browserSync);
	done();
};

module.exports = series(localHostSync);

/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel :
// ==========================================================================

import { series } from 'gulp';
import googleWebFonts from 'goog-webfont-dl';
import { pkgWebFont } from './theme.vars';

const getWebfonts = (done) => {
	Object.keys(pkgWebFont).forEach((fontLibName) => {
		return googleWebFonts(pkgWebFont[fontLibName]);
	});
	done();
};

module.exports = series(getWebfonts);

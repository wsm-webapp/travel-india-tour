/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel :
// ==========================================================================
import { src, dest, series } from 'gulp';
import zip from 'gulp-zip';
import log from 'fancy-log';

import { themeInit, pkgFileRoot } from './theme.vars';

//compress theme html to theme name with currnt version
const compressTheme = async () => {
	//console.log(`${pkg.themename}`);
	return src([`${themeInit.themename}/**`, './readme.md'], { allowEmpty: true })
		.pipe(zip(`ich-${themeInit.themename}-V${themeInit.version}.zip`))
		.on('error', log)
		.pipe(dest('zip'));
	// .pipe(notify({ message: 'Compress for producation' }));
};

const compressSource = async () => {
	//console.log(`${pkg.themename}`);
	return src(
		[
			`${pkgFileRoot}/**/*.*`,
			'package.json',
			'gulpfile.babel.js',
			'gulp-env/**/*.*',
			'readme.md',
		],
		{ base: '../', nodir: true, allowEmpty: true }
	)
		.pipe(
			zip(`${themeInit.themename}-source-V${themeInit.version}.zip`, {
				allowEmpty: true,
			})
		)
		.on('error', log)
		.pipe(dest('zip'));
};

module.exports = series(compressTheme, compressSource);

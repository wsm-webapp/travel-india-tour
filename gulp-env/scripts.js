/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel :
// ==========================================================================
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const Os = require('os');
Os.tmpDir = Os.tmpdir;

import { src, dest, series } from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import sourcemaps from 'gulp-sourcemaps';
import lineec from 'gulp-line-ending-corrector';
import notify from 'gulp-error-notifier';
// import uglify from 'gulp-uglify-es';
import terserUglify from 'gulp-terser';
import header from 'gulp-header';
import gutil from 'gulp-util';
import stripdebug from 'gulp-strip-debug';
import deporder from 'gulp-deporder';
// import regexRename from 'gulp-regex-rename';
import log from 'fancy-log';
import replace from 'gulp-replace';
import browserSync from 'browser-sync';

const plugins = loadPlugins();

import { pkgJs } from './theme.vars';

var banner = [
	' ',
	' ',
	'/*!',
	' * =====================================',
	' * Theme Name : <%= pkg.name %>',
	' * Version :  v<%= pkg.version %>',
	' * Copyright : <%= pkg.author %>',
	// ' * @link <%= pkg.repository.url %>',
	' * @license : <%= pkg.license %>',
	' * About : <%= pkg.description %>',
	' * =====================================',
	' */',
	' ',
	' ',
].join('\n');
// Start Javascript task
const javaScripts = (done) => {
	Object.keys(pkgJs).forEach((libName) => {
		// 'val' will go two rounds, as 'dashboard' and as 'public'
		return (
			src(pkgJs[libName].filepath, { allowEmpty: true })
				.pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
				.pipe(deporder())
				.pipe(header(banner, { pkg: pkg }))
				.pipe(plugins.concat(pkgJs[libName].filename)) // .min.js if you Uglified it
				.on('error', log)
				.pipe(lineec())
				.pipe(stripdebug())
				.pipe(replace(/\uFEFF/gi, '')) //cut out zero width nbsp characters the compiler adds in
				// .pipe(uglify({ compress: true }).on('error', log))
				.pipe(
					terserUglify({ keep_fnames: true, mangle: true }).on(
						'error',
						function (error) {
							if (error.plugin !== 'gulp-terser-js') {
								console.log(error.message);
							}
							this.emit('end');
						}
					)
				)
				.pipe(sourcemaps.write('/js-maps/'))
				.pipe(dest(pkgJs[libName].dest))
				// .pipe(browserSync.reload({ stream: true }))
				.pipe(browserSync ? browserSync.reload({ stream: true }) : gutil.noop())
				.pipe(notify(new Error(pkgJs[libName].filename + ' Scripts Has error')))
				// .pipe(
				// 	notify({
				// 		title: pkgJs[libName].filename + ' Scripts task complete',
				// 		// onLast: true,
				// 	})
				// )
				.on('end', done)
		);
	});
	done(); // <-- to avoid async problems using gulp 4
};

module.exports = series(javaScripts);

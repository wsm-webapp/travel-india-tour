/* eslint-disable no-undef */
// ==========================================================================
// Project Config
// ==========================================================================
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const paths = {
	themename: pkg.name,
	version: pkg.version,
	views: {
		src: 'src/views/**/*.ejs',
		dest: '../config/theme.config.js',
	},
	fileRoot: {
		root: 'source/',
		scss: 'source/public/stylesheets/',
		js: 'source/public/javascripts/',
		components: 'source/public/components/',
		html: 'source/',
		fonts: 'source/public/fonts/',
		images: 'source/public/images/',
		favicon: 'source/public/images/',
	},
	filedest: {
		root: pkg.name + '/',
		css: pkg.name + '/css',
		scss: pkg.name + '/scss/',
		js: pkg.name + '/js',
		html: pkg.name + '/',
		fonts: pkg.name + '/fonts/',
		images: pkg.name + '/images/',
		favicon: pkg.name + '/images/favicon',
		apijson: pkg.name + 'components',
	},
};
//console.log(paths);
module.exports = paths;

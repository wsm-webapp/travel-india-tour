/* eslint-disable no-undef */
// ==========================================================================
// Gulp Babel : clean
// ==========================================================================

import { series } from 'gulp';
import del from "del";
import { themeInit } from './theme.vars';

// Clean output directory

const cleanDir = async () => {
    return del([themeInit.themename], function (err, paths) {
        process.stdout.write('Deleted files/folders:\n', paths.join('\n'));
    });
    
};

module.exports = series(cleanDir);

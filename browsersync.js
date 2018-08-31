/* eslint-disable */
/**
 * Require Browsersync
 */
const browserSync = require('browser-sync');

/**
 * Run Browsersync with server config
 */
browserSync({
    server: 'dev',
    files: ['dev/*.html', 'dev/*.css', 'dev/*js']
});
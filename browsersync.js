/* eslint-disable */
/**
 * Require Browsersync
 */
const browserSync = require('browser-sync');

/**
 * Run Browsersync with server config
 */
browserSync({
    ui: false,
    notify: false,
    server: 'dev',
    files: ['dev/*.html', 'dev/*.css', 'dev/*js']
});
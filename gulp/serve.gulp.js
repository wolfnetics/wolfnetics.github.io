const gulp = require('gulp');
const { baseDir, browserSync } = require('./utils.js');
const { compilePug } = require('./pug.gulp.js');

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Server
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('serve', () => {
  // BrowserSync
  browserSync.init({
    server: { baseDir },
    port: 3000,
    open: false,
    notify: false,
    middleware: compilePug,
  });
});

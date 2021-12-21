const gulp = require('gulp');
const { paths } = require('./utils');

/* -------------------------------------------------------------------------- */
/*                                    Build                                   */
/* -------------------------------------------------------------------------- */
gulp.task('build:static', () => gulp.src(paths.watch.map(dir => `${dir}/**/*`), {
  cwd: paths.dir.dev,
  base: `./${paths.dir.dev}`
})
  .pipe(gulp.dest(paths.dir.prod)));

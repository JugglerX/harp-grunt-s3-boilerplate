var gulp = require('gulp');
var panini = require('panini');

gulp.task('default', function() {
  gulp.src('views/pages/**/*.hbs')
    .pipe(panini({
      root: 'views/pages/',
      layouts: 'views/layouts/',
      partials: 'views/partials/',
      data: 'views/data/',
      helpers: 'views/helpers/'
    }))
    .pipe(gulp.dest('build'));
});


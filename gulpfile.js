var gulp  = require('gulp'),
    gutil = require('gulp-util');
    const runSequence = require('run-sequence')
    const pug = require('gulp-pug');
    const combine = require('stream-combiner2')
    const browserSync = require('browser-sync')
    const sass = require('gulp-sass')
    const del = require('del')

// create a default task and just log a message
// gulp.task('default', function() {
//   return gutil.log('Gulp is running!')
// });

gulp.task('develop', (cb) => {
  runSequence('clean','copy',['pug','sass'],'serve',cb);
})

gulp.task('pug', (cb) => {
  const task = combine.obj([
    gulp.src(['public/**/*.pug','public/**/**/**/*.pug', '!public/app/**/sections/**/*','!public/partial_script/*',]),
    pug(),
    gulp.dest('site'),
    browserSync.stream()
  ])
  return task.on('error', handleError)
})

gulp.task('sass', (cb) => {
  const task = combine.obj([
    gulp.src('public/styles/**/*.scss'),
    sass(),
    gulp.dest('site/styles'),
    browserSync.stream()
  ])

  return task.on('error', handleError)
})

gulp.task('serve', (cb) => {
  browserSync.init({

    port: 3000,
    server: {
      baseDir: 'site',
      index: 'index.html'
    },
    open: process.env.NODE_FIRST === true,
    brower: 'Google Chrome Canary'
  })
  gulp.watch('public/**/*.pug', ['pug'])
  gulp.watch('public/**/**/*.js', ['copy'])
  gulp.watch('public/styles/**/*.scss', ['sass'])
})


gulp.task('clean', (cb) => {
  del(['!site','site/*']).then(() => {
    cb()
  })
})

gulp.task('copy',(cb) => {
 const task = combine.obj([
   gulp.src(['public/**/*.js','public/**/*.css']),
   gulp.dest('site'),
   browserSync.stream()
 ]);
 const task2 = combine.obj([
   gulp.src(['public/**/*.png','public/**/*.jpg']),
   gulp.dest('site'),
   browserSync.stream()
 ]);

 return task.on('error', handleError)
});

function handleError (err) {
  gutil.log(gutil.colors.magenta(err.toString()))

  this.emit('end')
}

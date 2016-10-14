var gulp = require('gulp');
var markdown = require('gulp-markdown');
var zip = require('gulp-zip');

var fs = require('fs');
var notesTop = fs.readFileSync('notes/top.html');
var notesBottom = fs.readFileSync('notes/bottom.html');
var insert = require('gulp-insert');

gulp.task('notes',function() {
  return gulp.src('notes/**/*.md')
    .pipe(markdown({
      gfm: true
    }))
    .pipe(insert.prepend(notesTop))
    .pipe(insert.append(notesBottom))
    .pipe(gulp.dest('notes-export'))
    .pipe(zip('gulp-notes.zip'))
    .pipe(gulp.dest('.'));
});

// gulp.task('exercises', function() {
//   gulp.src('./CODE/*')
//     .pipe(zip('gulp-exercises.zip'))
//     .pipe(gulp.dest('.'))
// });

gulp.task('default',['notes']);

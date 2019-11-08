var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var custom = './src/js/custom/*.js';
var files = [
	'./src/js/components/*.js',
	custom
];

gulp.task('erros', function(){
	gulp.src(custom)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('concat', function(){
	gulp.src(files)
		.pipe(concat('./bin'))
		.pipe(rename('script.min.js'))
		.pipe(uglify()) 
		.pipe(gulp.dest('./bin'));
});

// gulp.task('default', function(){
// 	gulp.run('concatenar e minificar', 'procurar por erros');
// 	watch(files, function(event){
// 		gulp.run('concatenar e minificar', 'procurar por erros');
// 	})
// })

// gulp.task('default', function(){
// 	gulp.watch(files, gulp.series('concatenar e minificar', 'procurar por erros'));
// })
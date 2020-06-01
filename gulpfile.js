const { src, dest, series } = require('gulp');
const minify = require('gulp-minify');

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var behaviors = './src/js/behaviors/*.js';
var files = [
	'./src/js/modules/*.js',
	behaviors
];

function erros(retorna){
	gulp.src(behaviors)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
		retorna();
};

function minifica(){
	gulp.src(files)
		.pipe(concat('./bin'))
		.pipe(rename('script.js'))
		.pipe(minify())
		.pipe(gulp.dest('./bin'));
};

exports.default = function () {
	watch(files, series(erros, minifica));
}
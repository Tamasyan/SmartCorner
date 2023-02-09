const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
	return gulp.src('./sass/**/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions, > 1%']
		}))
		.pipe(gulp.dest('./css/'));
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

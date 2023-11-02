// const {src, dest, watch, series} = require('gulp');
// // import gulp from 'gulp';
// import imagemin from 'gulp-imagemin';
// // // const imagemin = require('gulp-imagemin');
// import('gulp-imagemin').then(gulpImagemin => {
//   // Now you can use gulpImagemin as needed
// });
// // const imagemin = require('gulp-imagemin');
// const sass = require('gulp-sass')(require('sass'));
// const prefix = require('gulp-autoprefixer');
// const minify = require('gulp-clean-css');
// const terser = require('gulp-terser');

// const imagewebp = require('gulp-webp');


// // scss
// function scss(){
//   return src('./assets/scss/**/*.scss')
//   .pipe(sass())
//   .pipe(prefix())
//   .pipe(minify())
//   .pipe(dest('public/assets/css'))
// }

// // js
// function jsmin(){
//   return src('assets/js/*.js')
//   .pipe(terser())
//   .pipe(dest('public/assets/js')) 
// }

// // images

// function optimizeimg(){
//   return src('assets/images/*.{jpg,png}')
//   .pipe(imagemin([
//     imagemin.mozjpeg({ quality:80, progressive:true}),
//     imagemin.optipng({ optimizationLevel: 2}),
//   ]))
//   .pipe(dest('public/images'))
// }

// // webp images
// function webpImage(){
//   return src('public/images/*.{jpg,png}')
//   .pipe(imagewebp())
//   .pipe(dest('public/images'))
// }

// // watch task

// function watchTask(){
//   watch('assets/scss/*.scss', scss);
//   watch('assets/js/*.js', jsmin);
//   // watch('assets/images/*.{jpg,png}', optimizeimg);
//   // watch('public/images/*.{jpg,png}', webpImage);
// }

// //  default gulp

// exports.default = series(
//   scss,
//   jsmin,
//   // optimizeimg,
//   // webpImage,
//   watchTask
// );

//   gulp.task('scripts', function() {
//     return gulp.src('./src/js/**/*.js')
//       // Minify the file
//       .pipe(uglify())
//       // Output
//       .pipe(gulp.dest('./dist/js'))
//   });




// import gulp from 'gulp';
// import imagemin from 'gulp-imagemin';


// const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');


// gulp.task('css', function(){
//     console.log('minifying css...');
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'))



//     return gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
// })

// const gulp = require('gulp');

// const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// const rev = require('gulp-rev');
// const uglify = require('gulp-uglify-es').default;
// const imagemin = require('gulp-imagemin');
// const del = require('del');



// gulp.task('css', function(done){
//     console.log('minifying css...');
//     gulp.src('./assets/sass/**/*.scss')
//     .pipe(sass())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//      gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// gulp.task('js', function(done){
//     console.log('minifying js...');
//      gulp.src('./assets/**/*.js')
//     .pipe(uglify())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done()
// });


// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// // empty the public/assets directory
// gulp.task('clean:assets', function(done){
//     del.sync('./public/assets');
//     done();
// });

// gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
//     console.log('Building assets');
//     done();
// });

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev2');
// const uglify = require('gulp-uglify-es').default;
// const  imagemin = require('imagemin');
// const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', async function(done){
    let uglify = await import('gulp-uglify-es').then(function (module){return module.default});
    uglify = uglify.default;
    console.log(uglify);
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images', async function(done){
    let imagemin = await import('gulp-imagemin').then(function (module){return module});
    imagemin = imagemin.default;
    console.log(imagemin);
    console.log('compressing immages...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});
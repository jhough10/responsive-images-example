var gulp = require('gulp'),
    responsive = require('gulp-responsive'),
    watermark = require('gulp-watermark');


gulp.task('images', function () {
  return gulp.src('./_site/originals/*.{jpg,png}')
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      '*.jpg': [{
        height: 200,
        width: 200,
        rename: { suffix: '-sm' },
        blur: 10,
      }, {
        height: 500,
        width: 500,
        rename: { suffix: '-md' },
        grayscale: true,
      }, {
        height: 800,
        width: 800,
        rename: { suffix: '-lg' },
        negate: true,
      }, {
        height: 1024,
        width: 1024,
        rename: { suffix: '-xl' },
      },
      {
        // Compress, strip metadata, and rename original image
        rename: { suffix: '-original' },
      }],

      // PNGs with retina version
      // Resize all PNG images to be retina ready
      '*.png': [{
        width: 250,
      }, {
        width: 250 * 2,
        rename: { suffix: '@2x' },
      }],
    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: true,
      crop: 'center',
    }))
    .pipe(gulp.dest('./_site/output'));
});



gulp.task('hover', function () {
  return gulp.src('./_site/originals/*.jpg')
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      '*.jpg': [{
        height: 200,
        width: 200,
        rename: { suffix: '-notHover' },
        blur: 2,
      }, {
        height: 200,
        width: 200,
        rename: { suffix: '-hover' },
        blur: 8,
      }]
    }, {
      // Global configuration for all images
      quality: 70,
      progressive: true,
      withMetadata: true,
      crop: 'center',
    }))
    .pipe(gulp.dest('./_site/output/hover'));
});



gulp.task('watermark', function () {
  return gulp.src('./_site/originals/*.jpg')
    .pipe(responsive({
      // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
      '*.jpg': [{
        height: 200,
        width: 200,
        rename: { suffix: '-sm-wm' },
        blur: 10,
      }, {
        height: 500,
        width: 500,
        rename: { suffix: '-md-wm' },
        grayscale: true,
      }, {
        height: 800,
        width: 800,
        rename: { suffix: '-lg-wm' },
        negate: true,
      }, {
        height: 1024,
        width: 1024,
        rename: { suffix: '-xl-wm' },
      },
      {
        rename: { suffix: 'original-wm' },
      }]
    }, {
      // Global configuration for all images
      quality: 70,
      progressive: true,
      withMetadata: true,
      crop: 'center'
    }))

    .pipe(watermark({
  		image: "./_site/originals/watermark.png",
      resize: '100x100', // <width>x<height>, <resize>%
      gravity: 'Center' // NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast
  	}))
    .pipe(gulp.dest('./_site/output/watermark'));
});

gulp.task('default', ['images', 'hover', 'watermark']);

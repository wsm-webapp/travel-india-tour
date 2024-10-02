/* eslint-disable no-undef */
// ==========================================================================
// Project Config
// ==========================================================================
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
//const paths = "theme.path";
const paths = require(path.join(__dirname, 'theme.path'));
// import downloader from 'goog-webfont-dl';

const themevars = {
  plugins: {
    browserSync: {
      //proxy: "localhost:6000",
      port: 3000,
      files: [paths.filedest.root + '**/*.*'],
      server: {
        baseDir: paths.filedest.root,
      },
      open: false,
      CORS: true,
      //https: true,
      xip: false,
      //routes: 5000,
      browser: ['chrome', 'Google Chrome'],
      notify: true,
      //httpModule: 'http2',
      watchTask: true,
      debugInfo: false,
      logConnections: false,
      online: true,
    },
  },
  compress: {
    theme: {
      filepath: `${pkg.name}/**`,
      extName: `${pkg.name}-${pkg.version}-html.zip`,
    },
    development: {
      filepath: [`${paths.fileRoot.root}**`, './faviconData.json', './package.json'],
      extName: `${pkg.name}-${pkg.version}-dev.zip`,
    },
  },
  importMedia: {
    //ext: "**/*",
    ext: '**/*.{ico,svg}',
    filename: 'images',
    filepath: paths.fileRoot.images,
    dest: paths.filedest.images,
  },
  imageminWebp: {
    //ext: "**/*",
    ext: '**/*.{png,jpg,svg,jpeg,gif,webp,avif}',
    filename: 'images',
    filepath: paths.fileRoot.images,
    dest: paths.filedest.images,
  },
  favicon: {
    //ext: "**/*",
    ext: '**/*.{png,jpg,jpeg,gif,webp,ico,svg,webmanifest,xml,md,avif}',
    filename: 'favicon.svg',
    filepath: paths.fileRoot.favicon,
    dest: paths.filedest.favicon,
  },
  ejs: {
    templatePagePath: paths.fileRoot.root + 'views/pages/',
    templatePageDest: paths.filedest.root,

    templatePartials: paths.fileRoot.root + 'templates/partials/',
    templatePartialsDest: paths.filedest.html + '/partials',

    templateIncludes: paths.fileRoot.root + 'templates/inc/',
    templateIncludesDest: paths.filedest.html + '/inc',

    templates: paths.fileRoot.root + '**/*.{ejs,html}',
  },
  importScss: {
    filetype: {
      ext: '/**/*',
    },
    bootstrap: {
      filename: 'bootstrap',
      filepath: 'node_modules/bootstrap/scss/',
      dest: paths.fileRoot.scss + 'bootstrap',
    },
    fontawesome: {
      filename: 'fontawesome',
      filepath: 'node_modules/@fortawesome/fontawesome-free/scss/',
      dest: paths.fileRoot.scss + 'fontawesome',
    },
    sweetalert: {
      filename: 'sweetalert',
      filepath: 'node_modules/sweetalert2/src/scss/',
      dest: paths.fileRoot.scss + 'sweetalert',
    },
  },
  webFonts: {
    poppins: {
      font: 'Poppins',
      //// formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      formats: 'all',
      styles: ['100,300,200,400,500,600,700,800,900'],
      destination: paths.fileRoot.fonts + 'poppins',
      subset: '',
      prefix: '../fonts/poppins',
      out: paths.fileRoot.scss + 'style/_poppins.scss',
    },
    nunito: {
      font: 'Nunito',
      // formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      formats: 'all',
      styles: ['100,300,200,400,500,600,700,800,900'],
      destination: paths.fileRoot.fonts + 'nunito',
      subset: '',
      prefix: '../fonts/nunito',
      out: paths.fileRoot.scss + 'style/_nunito.scss',
    },
    barlow: {
      font: 'Barlow',
      // formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      formats: 'all',
      styles: ['100,300,200,400,500,600,700,800,900'],
      destination: paths.fileRoot.fonts + 'barlow',
      subset: '',
      prefix: '../fonts/barlow',
      out: paths.fileRoot.scss + 'style/_barlow.scss',
    }, 
    heebo: {
      font: 'Heebo',
      // formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      formats: 'all',
      styles: ['100,300,200,400,500,600,700,800,900'],
      destination: paths.fileRoot.fonts + 'heebo',
      subset: '',
      prefix: '../fonts/heebo',
      out: paths.fileRoot.scss + 'style/_heebo.scss',
    },
    sourcesanspro: {
      font: 'Source Sans Pro',
      // formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      formats: 'all',
      styles: ['100,300,200,400,500,600,700,800,900'],
      destination: paths.fileRoot.fonts + 'source-sans-pro',
      subset: '',
      prefix: '../fonts/source-sans-pro',
      out: paths.fileRoot.scss + 'style/_source-sans-pro.scss',
    },
  },
  importFont: {
    filetype: {
      ext: '**/*.{eot,otf,svg,ttf,woff,woff2,woff3}',
    },
    bootstrap: {
      filename: 'bootstrap',
      filepath: './node_modules/bootstrap-sass/assets/fonts/bootstrap/',
      dest: paths.fileRoot.fonts + 'bootstrap',
      destbuild: paths.filedest.fonts + 'bootstrap',
    },
    fontawesome: {
      filename: 'fontawesome',
      filepath: './node_modules/@fortawesome/fontawesome-free/webfonts/',
      dest: paths.fileRoot.fonts + 'fontawesome',
      destbuild: paths.filedest.fonts + 'fontawesome',
    },
    poppins: {
      filename: 'poppins',
      filepath: paths.fileRoot.fonts + 'poppins',
      dest: paths.filedest.fonts + 'poppins',
      destbuild: paths.filedest.fonts + 'poppins',
    },
    nunito: {
      filename: 'nunito',
      filepath: paths.fileRoot.fonts + 'nunito',
      dest: paths.filedest.fonts + 'nunito',
      destbuild: paths.filedest.fonts + 'nunito',
    },
    barlow: {
      filename: 'barlow',
      filepath: paths.fileRoot.fonts + 'barlow',
      dest: paths.filedest.fonts + 'barlow',
      destbuild: paths.filedest.fonts + 'barlow',
    },
    heebo: {
      filename: 'heebo',
      filepath: paths.fileRoot.fonts + 'heebo',
      dest: paths.filedest.fonts + 'heebo',
      destbuild: paths.filedest.fonts + 'heebo', 
    },
    sourcesanspro: {
      filename: 'source-sans-pro',
      filepath: paths.fileRoot.fonts + 'source-sans-pro',
      dest: paths.filedest.fonts + 'source-sans-pro',
      destbuild: paths.filedest.fonts + 'source-sans-pro',
    }
  },
  scss: {
    bootstrap: {
      filename: 'bootstrap',
      filepath: paths.fileRoot.scss + 'bootstrap.scss',
      dest: paths.filedest.css,
    },
    style: {
      filename: 'style',
      filepath: paths.fileRoot.scss + 'style.scss',
      dest: paths.filedest.css,
    },
  },
  jscripts: {
    relativejs: {
      filename: 'app-jquery.js',
      filepath: [
        'node_modules/jquery/dist/jquery.js',
        // 'node_modules/jquery.easing/jquery.easing.js',
        'node_modules/jquery.mousewheel/jquery.mousewheel.js',
        'node_modules/masonry-layout/dist/masonry.pkgd.js',
        'node_modules/jquery-validation/dist/jquery.validate.js',
        'node_modules/jquery-validation/dist/additional-methods.js ',
        'node_modules/aos/dist/aos.js',
        'node_modules/swiper/swiper-bundle.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        // 'node_modules/jquery-ui-dist/jquery-ui.js',
        paths.fileRoot.js + 'scrollme.js',
        paths.fileRoot.js + 'resize-textarea.js',
        "node_modules/datatables.net/js/dataTables.js",
        "node_modules/datatables.net-bs4/js/dataTables.bootstrap4.js",
        "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",
        "../node_modules/sweetalert2/dist/sweetalert2.all.js",
        paths.fileRoot.js + 'filesize.js',
        paths.fileRoot.js + 'initial.js',
        paths.fileRoot.js + 'form-inputs.js',
        paths.fileRoot.js + 'wsm-validator.js',
      ],
      dest: paths.filedest.js,
    },
    themeGlobeljs: {
      filename: 'app-bundal.js',
      filepath: [paths.fileRoot.js + 'init.js'],
      dest: paths.filedest.js,
    },
  },
};
//console.log(themevars);
module.exports = themevars;

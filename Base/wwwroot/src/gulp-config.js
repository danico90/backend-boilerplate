var config = {
    serverRoot: './client/dist/',

    staticIndex: './client/dist/index.html',

    js: {
        app: {
            src: ['./client/app/app.main.js', './client/app/**/*.js'],
            outputName: 'app.js',
            dest: './client/dist/src/js/'
        },

        vendor: {
            src: './bower.json',
            outputName: 'vendor.js',
            dest: './client/dist/src/js/'
        }
    },

    sass: {
        src: './client/scss/style.scss',
        outputStyle: 'compressed',
        dest: './client/dist/src/css/'
    },

    htmlTemplate: {
        src: './client/app/**/*.html',
        dest: './client/app/'
    },

    assets: {
        stylesheet: {
            src: './client/assets/stylesheets/**',
            dest: './client/dist/src/css'
        },

        javascript: {
            src: './client/assets/javascripts/**',
            dest: './client/dist/src/js'
        },

        font: {
            src: './client/assets/fonts/**',
            dest: './client/dist/src/fonts'
        },

        images: {
            src: './client/assets/images/**',
            dest: './client/dist/src/img'
        }
    },

    env: {
        local: {},
        
        develop: {},

        qa: {},

        prod: {}
    },

    watch: {
        js: './client/app/**/*.js',
        sass: './client/scss/**/*.scss',
        templates: ['./client/dist/index.html', './client/app/**/*.html']
    },

    dist: {
      src: './client/dist/**/*',
      dest: '../../AllStar/AllStar.API/ClientApp/'
    },

    del: {
        src: ['./client/dist']
    }
};

module.exports = config;

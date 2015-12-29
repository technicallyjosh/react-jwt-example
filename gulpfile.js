'use strict';

const gulp    = require('gulp');
const webpack = require('gulp-webpack');
const wp      = require('webpack');

gulp.task('copy', () => {
    return gulp
        .src('src/**/*.html')
        .pipe(gulp.dest('dist'));
})

gulp.task('webpack', () => {
    return gulp
        .src('src/App.js')
        .pipe(webpack({
            entry: './src/App.jsx',
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            plugins: [
                new wp.ProvidePlugin({
                    'Promise': 'exports?module.exports.Promise!es6-promise',
                    'fetch': 'imports?self=>global!exports?global.fetch!isomorphic-fetch'
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['copy', 'webpack'], () => {
    gulp.watch(['src/**/*.html'], ['copy']);
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['webpack']);
});

gulp.task('default', ['copy', 'webpack']);

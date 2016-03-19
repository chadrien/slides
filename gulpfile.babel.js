import gulp from 'gulp'
import {dirname} from 'path'
import glob from 'glob'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'
import es from 'event-stream'

gulp.task(`build`, [`webpack`, `copy`])

gulp.task(`dev`, [`build`], () => {
  gulp.watch([`src/**/*.js`], [`webpack`])
  gulp.watch([`src/**/*`, `!src/**/*.js`], [`copy`])
})

gulp.task(`webpack`, () => {
  const entries = glob.sync(`src/**/*.js`)

  return es.merge(entries.map(entry => {
    const localConfig = {
      output: {
        filename: entry.replace(/^src\//, '')
      }
    }

    return gulp.src(entry)
      .pipe(webpack(Object.assign(localConfig, webpackConfig(dirname(entry.replace(/^src\//, ''))))))
      .pipe(gulp.dest(`dist`))
  }))
})

gulp.task(`copy`, () =>
  gulp.src([`src/**/*`, `!src/**/*.js`])
    .pipe(gulp.dest(`dist`))
)

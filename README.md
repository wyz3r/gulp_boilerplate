# Install
[install node](https://nodejs.org/es/)

[install yarn](https://yarnpkg.com/)


# Within the project in terminal

```
  $ yarn install
```

# run yarn and task of gulp in terminal

```
  $ yarn run dev
```

# browser  config port

in the file gulp.js

```javascript
  gulp.task('serve', (cb) => {
  browserSync.init({

    port: 3000,
    server: {
      baseDir: 'site',
      index: 'index.html'
    },

```

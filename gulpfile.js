var gulp = require('gulp');
var shelljs = require('shelljs');

/** Deploy to GitHub pages */
gulp.task('deploy', function (done) {
  console.log(process.env);
  shelljs.exec('git config --global user.email "' + process.env.USER_MAIL + '"');
  shelljs.exec('git config --global user.name "' + process.env.USER + '"');
  shelljs.exec('git config pull.rebase false');
  var gitPath = 'https://' + process.env.USER + ':' + process.env.TOKEN + '@github.com/' + process.env.USER + '/' + process.env.USER + '.github.io.git';
  console.log('Clone has been started..!');
  var clone = shelljs.exec('git clone ' + gitPath + ' ' + './repo', { silent: false });
  if (clone.code !== 0) {
    console.log('Clone failed due to ' + clone.stderr);
  } else {
    console.log('Clone has been completed..!');
    shelljs.rm('-rf', './repo/*');
    shelljs.cp('-rf', './dist/' + process.env.USER + '/*', './repo');
    shelljs.cd('./repo');
    shelljs.exec('git add .');
    shelljs.exec('git pull');
    shelljs.exec('git commit -m \"latest profile changes refreshed\" --no-verify');
    shelljs.exec('git push');
    shelljs.cd('../');
    console.log('Latest profile changes refreshed..!');
  }
  done();
});

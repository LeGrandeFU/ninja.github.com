/*
  Copyright 2008-2012 Jamie Hoover.
  Licensed per the terms of the Apache License v2.0. See Readme.md for more details.
*/

/*globals desc: false, task: false, file: false, directory: false, complete: false*/

/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, node: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: false, undef: true, white: true*/

var
  exec = require('child_process').exec,
  fs = require('fs'),
  pkg = JSON.parse(fs.readFileSync(__dirname + '/../ui/package.json', 'utf8')),
  version = pkg.version;

desc('Default task.');
task('default', ['cdn/' + version, 'css/style.min.css', 'js/script.min.js', 'license'], function () {
  console.log(pkg.name + ' v' + version + ' website built.');
});

desc('Display version number.');
task('version', function (options) {
  console.log(pkg.name + ' v' + version);
});

desc('Create CDN directory.');
directory('cdn/' + version);

desc('Copy license.');
task('license', function () {
  exec('cp ../ui/LICENSE LICENSE.txt');
});

desc('Minify CSS.');
file('css/style.min.css', ['css/style.css', '../ui/themes/ninjaui.theme.dojo.css'], function () {
  var
    cleanCSS = require('clean-css'),
    css = cleanCSS.process(fs.readFileSync('css/style.css', 'utf8') + fs.readFileSync('../ui/themes/ninjaui.theme.dojo.css', 'utf8'));
  fs.writeFileSync('css/style.min.css', css, 'utf8');
});

desc('Build Ninja UI');
task('build', function () {
  exec('jake --directory cdn/' + version + ' --jakefile ../ui/jakefile.js', function () {
    complete();
  });
}, true);

desc('Minify JavaScript.');
file('js/script.min.js', ['build', 'js/lib/jquery-1.7.1.min.js', 'cdn/' + version + '/jquery.ninjaui.min.js', 'js/lib/bootstrap-scrollspy.min.js'], function () {
  var
    uglify = require('uglify-js'),
    js =  fs.readFileSync('js/lib/jquery-1.7.1.min.js', 'utf8') + fs.readFileSync('cdn/' + version + '/jquery.ninjaui.min.js', 'utf8') + fs.readFileSync('js/lib/bootstrap-scrollspy.min.js', 'utf8') + uglify(fs.readFileSync('js/script.js', 'utf8'));
  fs.writeFileSync('js/script.min.js', js, 'utf8');
});

desc('Remove generated files.');
task('clean', function () {
  exec('jake --directory cdn/' + version + ' --jakefile ../ui/jakefile.js clean');
  fs.unlink('css/style.min.css');
  fs.unlink('js/script.min.js');
});

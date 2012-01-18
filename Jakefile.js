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
task('default', ['cdn/' + version, 'build', 'ninjaui', '_includes/css/themes.min.css', 'license'], function () {
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
  exec('cp ../ui/LICENSE.txt .');
});

desc('Build Ninja UI.');
task('build', function () {
  exec('jake --directory cdn/' + version + ' --jakefile ../ui/Jakefile.js', function () {
    complete();
  });
}, true);

desc('Copy Ninja UI.');
task('ninjaui', function () {
  exec('cp cdn/' + version + '/jquery.ninjaui.min.js _includes/js/lib/');
});

desc('Build themes.');
file('_includes/css/themes.min.css', ['../ui/themes/bitmap.css', '../ui/themes/dojo.css'], function () {
  var
    cleanCSS = require('clean-css'),
    css = cleanCSS.process(fs.readFileSync('../ui/themes/dojo.css', 'utf8') + fs.readFileSync('../ui/themes/bitmap.css', 'utf8'));
  fs.writeFileSync('_includes/css/themes.min.css', css, 'utf8');
});

desc('Remove generated files.');
task('clean', function () {
  exec('jake --directory cdn/' + version + ' --jakefile ../ui/Jakefile.js clean');
  fs.unlink('themes.min.css');
});

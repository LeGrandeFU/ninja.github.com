/*global
  pageName: false, google: false, console
*/

/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, jquery: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: true, undef: true, white: true*/

(function ($) {

  'use strict';

  var
    downloadFileName = 'jquery.ninjaui.js',
    downloadFileNameMinified = 'jquery.ninjaui.min.js',

    $usageDialog,

    $usageButton = $.ninja.button({
      html: 'I am <strong>Ninja...</strong>'
    }).select(function () {
      $usageDialog.attach();
    });

  $usageDialog = $.ninja.dialog({
    html: '<div style="margin: 60px">... and now you <strong>die</strong>!</div>'
  }).detach(function () {
    $usageButton.deselect();
  });

  $(document).ready(function () {

    var
      $navigation = $('#navigation'),
      $download = $('#download');

    $navigation.scrollSpy();

    $('#usageButton').append($usageButton.fadeIn('slow'));

    $download.toggle(
      function () {
        $download.ninja().list({
          choices: [
            {
              html: $('<div/>', {
                html: downloadFileNameMinified
              }),
              select: function () {
                window.location = 'cdn/' + $.ninja.version() + '/' + downloadFileNameMinified;
              }
            },
            {
              html: $('<div/>', {
                html: downloadFileName
              }),
              select: function () {
                window.location = 'cdn/' + $.ninja.version() + '/' + downloadFileName;
              }
            }
          ]
        }).addClass('active');
      },
      function () {
        $download.delist().removeClass('active');
      }
    );

    $.ajax({
      url: 'https://api.github.com/repos/ninja/ui',
      dataType: 'jsonp',
      success: function (object) {
        console.log(object.data);
        $('#githubWatchersCount').prepend(object.data.watchers + ' ');
      }
    });

  });

}(jQuery));

/*global
  pageName: false, google: false, console
*/

/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, jquery: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: true, undef: true, white: true*/

(function ($) {

  'use strict';

  var
    $ninjaDialog,

    $ninjaButton = $.ninja.button({
      html: 'I am <strong>Ninja...</strong>'
    }).select(function () {
      $ninjaDialog.attach();
    });

  $ninjaDialog = $.ninja.dialog({
    html: '<div style="margin: 60px">... and now you <strong>die</strong>!</div>'
  }).detach(function () {
    $ninjaButton.deselect();
  });

  $(document).ready(function () {

    $('#usageButton').append($ninjaButton.fadeIn('slow'));

  });

  $(document).ready(function () {

    $('body > .topbar').scrollSpy();

    var
      downloadFileName = 'jquery.ninjaui.js',
      downloadFileNameMinified = 'jquery.ninjaui.min.js',

      $appMenuDownload = $.ninja.menu({
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
        ],
        html: $.ninja.version() + ' Download'
      }).attr({
        id: 'appMenuDownload'
      });

    $('#download').append($appMenuDownload.fadeIn('fast'));

    $.ajax({
      url: 'https://api.github.com/repos/ninja/ui',
      dataType: 'jsonp',
      success: function (object) {
        console.log(object.data);
        $('#watchers-count').prepend(object.data.watchers + ' ');
      }
    });

  });

}(jQuery));

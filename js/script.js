/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, jquery: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: true, undef: true, white: true*/

(function ($) {

  'use strict';

  var
    $menuIcon = $.ninja.icon({
      name: 'drawer-select'
    }),

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
      $downloadMenu = $('#downloadMenu'),
      $examplesMenu = $('#examplesMenu');

    $downloadMenu.find('span').append($menuIcon.clone());

    $examplesMenu.find('a').append($menuIcon.clone());

    $('#usageButton').append($usageButton.fadeIn('slow'));

    $downloadMenu.toggle(
      function () {
        var
          downloadFileName = 'jquery.ninjaui.js',
          downloadFileNameMinified = 'jquery.ninjaui.min.js';
        $downloadMenu.ninja().list({
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
        }).addClass('activeMenu');
      },
      function () {
        $downloadMenu.delist().removeClass('activeMenu');
      }
    );

    $examplesMenu.toggle(
      function () {
        $examplesMenu.ninja().list({
          choices: [
            {
              html: $('<div/>', {
                html: 'Autocomplete'
              }),
              select: function () {
                window.location = '#autocomplete';
              }
            },
            {
              html: $('<div/>', {
                html: 'Button'
              }),
              select: function () {
                window.location = '#button';
              }
            },
            {
              html: $('<div/>', {
                html: 'Dialog'
              }),
              select: function () {
                window.location = '#dialog';
              }
            },
            {
              html: $('<div/>', {
                html: 'Drawer'
              }),
              select: function () {
                window.location = '#drawer';
              }
            },
            {
              html: $('<div/>', {
                html: 'Icons'
              }),
              select: function () {
                window.location = '#icons';
              }
            },
            {
              html: $('<div/>', {
                html: 'Menu'
              }),
              select: function () {
                window.location = '#menu';
              }
            },
            {
              html: $('<div/>', {
                html: 'Slider'
              }),
              select: function () {
                window.location = '#slider';
              }
            },
            {
              html: $('<div/>', {
                html: 'Tabs'
              }),
              select: function () {
                window.location = '#tabs';
              }
            }
          ]
        }).addClass('activeMenu');
      },
      function () {
        $examplesMenu.delist().removeClass('activeMenu');
      }
    );

    $.ajax({
      url: 'https://api.github.com/repos/ninja/ui',
      dataType: 'jsonp',
      success: function (object) {
        $('#githubWatchersCount').prepend(object.data.watchers + ' ');
      }
    });

    $navigation.scrollSpy();

  });

}(jQuery));

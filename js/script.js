/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, jquery: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: true, undef: true, white: true*/

(function ($) {

  'use strict';

  var
    $menuIcon = $.ninja.icon({
      name: 'drawer-select'
    }),

    $usageDialog,

    $usageButton = $.ninja.button({
      html: '<strong>Ninja</strong> star...'
    }).select(function () {
      $usageDialog.attach();
    }),

    $autocompleteExample = $.ninja.autocomplete({
      placeholder: 'United States Cities'
    }).source(function (event) {
      $.ajax({
        url: 'http://ws.geonames.org/searchJSON',
        dataType: 'jsonp',
        data: {
          country: 'US',
          featureClass: 'P',
          fuzzy: 0,
          maxRows: 10,
          q: event.query
        },
        success: function (data) {
          $autocompleteExample.list({
            choices: $.map(data.geonames, function (item) {
              return {
                html: item.name + ', ' + item.adminName1,
                value: item.name + ', ' + item.adminCode1
              };
            }),
            query: event.query
          });
        },
        error: function (request, status, message) {
          $.error(message);
        }
      });
    }),

    $buttonExampleCheckboxSelect, $buttonExampleCheckboxDisable,

    $buttonExample = $.ninja.button({
      html: 'Button'
    }).disable(function () {
      $buttonExampleCheckboxSelect.attr({ disabled: 'disabled' });
    }).enable(function () {
      $buttonExampleCheckboxSelect.attr({ disabled: false });
    }).select(function () {
      $buttonExampleCheckboxSelect.attr({ checked: 'checked' });
    }).deselect(function () {
      $buttonExampleCheckboxSelect.attr({ checked: false });
    }),

    $buttonExampleSelected = $.ninja.button({
      html: '<i>Selected</i> Button',
      select: true
    }),

    $buttonExampleDisabled = $.ninja.button({
      html: '<i>Disabled</i> Button',
      disable: true
    }),

    $dialogExampleCheckbox,

    $dialogExample = $.ninja.dialog({
      html: '<div style="padding: 50px">This is <b>HTML</b> inside the dialog.</div>'
    }).attach(function () {
      $dialogExampleCheckbox.attr({
        checked: 'checked'
      });
    }).detach(function () {
      $dialogExampleCheckbox.attr({
        checked: false
      });
    }),

    $drawerExample = $.ninja.drawer({
      html: '<div style="padding: 50px">This is <b>HTML</b>.</div>',
      title: 'Drawer'
    }),

    $drawerExampleSelect = $.ninja.drawer({
      html: '<div style="padding: 50px">This is <b>HTML</b>.</div>',
      select: true,
      title: '<i>Selected</i> Drawer'

    }),

    iconNames = ['spin', 'stop', 'yield', 'go', 'x', '-', '+', 'arrow-down', 'arrow-right', 'camera', 'home', 'email', 'search', 'star', 'X'],

    $iconExamples = $('<span/>'),

    $menuExample = $.ninja.menu({
      choices: [{html: 'foo'}],
      html: 'foo'
    }),

    $sliderExample = $.ninja.slider({
      choices: [{html: 'foo'}],
      html: 'foo'
    }),

    $tabsExample = $.ninja.tabs({
      choices: [{html: 'foo'}],
      html: 'foo'
    });

  $usageDialog = $.ninja.dialog({
    html: '<img src="/img/logo.png"/>'
  }).detach(function () {
    $usageButton.deselect();
  });

  $buttonExampleCheckboxSelect = $('<input/>', {
    type: 'checkbox'
  }).change(function () {
    if ($buttonExampleCheckboxSelect.attr('checked')) {
      $buttonExample.select();
    } else {
      $buttonExample.deselect();
    }
  });

  $buttonExampleCheckboxDisable = $('<input/>', {
    type: 'checkbox'
  }).change(function () {
    if ($buttonExampleCheckboxDisable.attr('checked')) {
      $buttonExample.disable();
    } else {
      $buttonExample.enable();
    }
  });

  $dialogExampleCheckbox = $('<input/>', {
    type: 'checkbox'
  }).change(function () {
    if ($dialogExampleCheckbox.attr('checked')) {
      $dialogExample.attach();
    } else {
      $dialogExample.detach();
    }
  });

  $.each(iconNames, function (i, iconName) {
    var $exampleIcon, $icon;
    if (iconName === 'stop') {
      $icon = $.ninja.icon({
        css: {
          fill: '#c00',
          stroke: '#c00'
        },
        name: iconName
      });
    } else if (iconName === 'yield') {
      $icon = $.ninja.icon({
        css: {
          fill: 'goldenrod',
          stroke: 'goldenrod'
        },
        name: iconName
      });
    } else if (iconName === 'go') {
      $icon = $.ninja.icon({
        css: {
          fill: 'green',
          stroke: 'green'
        },
        name: iconName
      });
    } else {
      $icon = $.ninja.icon({
        name: iconName
      });
    }
    $exampleIcon = $('<span/>', {
      'class': 'icon-example'
    }).append($icon, ' ', iconName).appendTo($iconExamples);
  });

  $(document).ready(function () {

    var
      $navigation = $('#navigation'),
      $downloadMenu = $('#downloadMenu'),
      $examplesMenu = $('#examplesMenu');

    $downloadMenu.find('span').append($menuIcon.clone());

    $examplesMenu.find('a').append($menuIcon.clone());

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

    $('#usageButton').append($usageButton);
    $('#autocompleteExamples').prepend($autocompleteExample);

    $('#buttonExamples').prepend($buttonExample, '<br/><br/>', $buttonExampleSelected, '<br/><br/>', $buttonExampleDisabled);
    $('#buttonExamplesRemote').append($buttonExampleCheckboxSelect, ' Select ', $buttonExampleCheckboxDisable, ' Disable');

    $('#dialogExamples').prepend($dialogExampleCheckbox, ' Attach Dialog');

    $('#drawerExamples').append($drawerExample, $drawerExampleSelect);

    $('#iconExamples').append($iconExamples);

    $navigation.scrollSpy();

  });

}(jQuery));

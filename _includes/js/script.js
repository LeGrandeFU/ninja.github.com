/*globals gapi: false*/

/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, jquery: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: true, undef: true, white: true*/

(function ($) {

  'use strict';

  var
    $github = $.ninja.button({
      css: {
        borderColor: '#ccc',
        padding: '2px 4px'
      },
      html: '<img height="14" id="githubLogo" src="img/github.png" width="33"/><b>repository</b>'
    }).deselect(function () {
      $github.find('#githubLogo').attr('src', 'img/github.png');
      window.setTimeout(function () {
        window.location.href = window.location.href;
      }, 10);
    }).select(function () {
      $github.find('#githubLogo').attr('src', 'img/github-select.png');
      window.location = 'https://github.com/ninja/ui/';
    }),
    $usageDialog,

    $usageButton = $.ninja.button({
      html: '<strong>Ninja</strong> star...'
    }).select(function () {
      $usageDialog.attach();
    }),

    $autocompleteSample = $.ninja.autocomplete({
      placeholder: 'United States Cities'
    }).values(function (event) {
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
          $autocompleteSample.list({
            values: $.map(data.geonames, function (item) {
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

    $buttonSampleCheckboxSelect, $buttonSampleCheckboxDisable,

    $buttonSample = $.ninja.button({
      html: 'Button'
    }).disable(function () {
      $buttonSampleCheckboxSelect.attr({ disabled: 'disabled' });
    }).enable(function () {
      $buttonSampleCheckboxSelect.attr({ disabled: false });
    }).select(function () {
      $buttonSampleCheckboxSelect.attr({ checked: 'checked' });
    }).deselect(function () {
      $buttonSampleCheckboxSelect.attr({ checked: false });
    }),

    $buttonSampleSelect = $.ninja.button({
      html: 'Selected',
      select: true
    }),

    $buttonSampleDisable = $.ninja.button({
      html: 'Disabled',
      disable: true
    }),

    $dialogSampleCheckbox,

    $dialogSample = $.ninja.dialog({
      html: '<div style="padding: 50px">This is <b>Sparta</b>!</div>'
    }).attach(function () {
      $dialogSampleCheckbox.attr({
        checked: 'checked'
      });
    }).detach(function () {
      $dialogSampleCheckbox.attr({
        checked: false
      });
    }),

    $drawerSample = $.ninja.drawer({
      html: '<div style="padding: 50px">This is <b>HTML</b>.</div>',
      value: 'Drawer'
    }),

    $drawerSampleSelect = $.ninja.drawer({
      html: '<div style="padding: 50px">This is <b>HTML</b>.</div>',
      select: true,
      value: 'Select'

    }),

    iconNames = ['spin', 'stop', 'yield', 'go', 'x', '-', '+', 'camera', 'home', 'email', 'search', 'star'],

    $iconSamples = $('<span>'),

    $menuSampleOutput = $('<textarea/>', {
      html: 'Choose a stooge.'
    }),

    $menuSample = $.ninja.menu({
      values: [
        {
          html: '<div>Mo</div>',
          select: function () {
            $menuSampleOutput.html('Oh, a wise guy eh?');
          }
        },
        {
          html: '<div>Larry</div>',
          select: function () {
            $menuSampleOutput.html('Cut it out, ya puddinhead!');
          }
        },
        {
          html: '<div>Curly</div>',
          select: function () {
            $menuSampleOutput.html('Hey, Mo!');
          }
        },
        { rule: true },
        {
          html: '<div>Shemp</div>',
          select: function () {
            $menuSampleOutput.html(':( Try again.');
          }
        },
        {
          html: '<div>Joe</div>',
          select: function () {
            $menuSampleOutput.html(':( Try again.');
          }
        },
        {
          html: '<div>Curly Joe</div>',
          select: function () {
            $menuSampleOutput.html(':( Try again.');
          }
        }
      ],
      html: 'Menu'
    }),

    $ratingSampleOutput = $('<textarea/>'),

    $ratingSample = $.ninja.rating({
      average: 3
    }).select(function (event) {
      $ratingSampleOutput.html('New rating: ' + event.value + ' stars');
    }),


    $sliderSample = $.ninja.slider({
      html: 'Volume',
      value: 3,
      values: [
        { html: '<span title="Silence">0 dB</span>' },
        { html: '<span title="Calm breathing">10 dB</span>' },
        { html: '<span title="Very calm room">20-30 dB</span>' },
        { html: '<span title="Normal conversation">40-60 dB</span>' },
        { html: '<span title="TV set at home level">60 dB</span>' },
        { html: '<span title="Passenger car">60-80 dB</span>' },
        { html: '<span title="Hearing damage over time">78 dB</span>' },
        { html: '<span title="Traffic on a busy roadway">80-90 dB</span>' },
        { html: '<span title="Jack hammer">100 dB</span>' },
        { html: '<span title="Hearing damage immediately">120 dB</span>' },
        { html: '<span title="Threshold of pain">130 dB</span>' },
        { html: '<span title="Jet engine">150 dB</span>' },
        { html: '<span title="M1 Garand rifle">168 dB</span>' }
      ]
    }),

    $tabsSampleOutput = $('<textarea/>'),

    poorly = function () {
      $tabsSampleOutput.html('You have chosen... poorly.');
    },

    $tabsSample = $.ninja.tabs({
      values: [
        {
          html: 'Gold',
          select: function () {
            poorly();
          }
        },
        {
          html: 'Silver',
          select: function () {
            poorly();
          }
        },
        {
          html: 'Wood',
          select: function () {
            $tabsSampleOutput.html('You have chosen... wisely.');
          }
        }
      ]
    }),

    $tabsSampleVertical = $.ninja.tabs({
      value: 2,
      values: [
        {
          html: 'Gold',
          select: function () {
            poorly();
          }
        },
        {
          html: 'Silver',
          select: function () {
            poorly();
          }
        },
        {
          html: 'Wood',
          select: function () {
            $tabsSampleOutput.html('You have chosen... wisely.');
          }
        }
      ],
      vertical: true
    });

  $usageDialog = $.ninja.dialog({
    html: '<img src="/img/logo.png"/>'
  }).detach(function () {
    $usageButton.deselect();
  });

  $buttonSampleCheckboxSelect = $('<input/>', {
    id: 'buttonSampleCheckboxSelect',
    type: 'checkbox'
  }).change(function () {
    if ($buttonSampleCheckboxSelect.attr('checked')) {
      $buttonSample.select();
    } else {
      $buttonSample.deselect();
    }
  });

  $buttonSampleCheckboxDisable = $('<input/>', {
    id: 'buttonSampleCheckboxDisable',
    type: 'checkbox'
  }).change(function () {
    if ($buttonSampleCheckboxDisable.attr('checked')) {
      $buttonSample.disable();
    } else {
      $buttonSample.enable();
    }
  });

  $dialogSampleCheckbox = $('<input/>', {
    id: 'dialogSampleCheckbox',
    type: 'checkbox'
  }).change(function () {
    if ($dialogSampleCheckbox.attr('checked')) {
      $dialogSample.attach();
    } else {
      $dialogSample.detach();
    }
  });

  $.each(iconNames, function (i, iconName) {
    var $sampleIcon, $icon;
    if (iconName === 'stop') {
      $icon = $.ninja.icon({
        css: {
          fill: '#c00',
          stroke: '#c00'
        },
        value: iconName
      });
    } else if (iconName === 'yield') {
      $icon = $.ninja.icon({
        css: {
          fill: 'goldenrod',
          stroke: 'goldenrod'
        },
        value: iconName
      });
    } else if (iconName === 'go') {
      $icon = $.ninja.icon({
        css: {
          fill: 'green',
          stroke: 'green'
        },
        value: iconName
      });
    } else {
      $icon = $.ninja.icon({
        value: iconName
      });
    }
    $sampleIcon = $('<span>', {
      'class': 'icon-sample'
    }).append($icon, ' ', iconName).appendTo($iconSamples);
  });

  $(document).ready(function () {

    var
      $navigation = $('#navigation'),
      $downloadMenu = $('#downloadMenu'),
      $samplesMenu = $('#samplesMenu');

    $('#github').append($github, '<span id="githubWatchers"> watchers<span id="githubWatchersLeft"></span><span id="githubWatchersRight"></span></span>');

    $downloadMenu.toggle(
      function () {
        var
          downloadFileName = 'jquery.ninjaui.js',
          downloadFileNameMinified = 'jquery.ninjaui.min.js';
        $downloadMenu.ninja().list({
          values: [
            {
              html: $('<div>', {
                html: downloadFileNameMinified
              }),
              select: function () {
                window.location = '/cdn/' + $.ninja.version() + '/' + downloadFileNameMinified;
              }
            },
            {
              html: $('<div>', {
                html: downloadFileName
              }),
              select: function () {
                window.location = '/cdn/' + $.ninja.version() + '/' + downloadFileName;
              }
            }
          ]
        }).addClass('activeMenu');
      },
      function () {
        $downloadMenu.delist().removeClass('activeMenu');
      }
    );

    $samplesMenu.toggle(
      function () {
        $samplesMenu.ninja().list({
          values: [
            {
              html: $('<div>', {
                html: 'Autocomplete'
              }),
              select: function () {
                window.location = '/#autocomplete';
              }
            },
            {
              html: $('<div>', {
                html: 'Button'
              }),
              select: function () {
                window.location = '/#button';
              }
            },
            {
              html: $('<div>', {
                html: 'Dialog'
              }),
              select: function () {
                window.location = '/#dialog';
              }
            },
            {
              html: $('<div>', {
                html: 'Drawer'
              }),
              select: function () {
                window.location = '/#drawer';
              }
            },
            {
              html: $('<div>', {
                html: 'Icons'
              }),
              select: function () {
                window.location = '/#icons';
              }
            },
            {
              html: $('<div>', {
                html: 'Menu'
              }),
              select: function () {
                window.location = '/#menu';
              }
            },
            {
              html: $('<div>', {
                html: 'Rating'
              }),
              select: function () {
                window.location = '/#rating';
              }
            },
            {
              html: $('<div>', {
                html: 'Slider'
              }),
              select: function () {
                window.location = '/#slider';
              }
            },
            {
              html: $('<div>', {
                html: 'Tabs'
              }),
              select: function () {
                window.location = '/#tabs';
              }
            }
          ]
        }).addClass('activeMenu');
      },
      function () {
        $samplesMenu.delist().removeClass('activeMenu');
      }
    );

    $('#usageButton').append($usageButton);
    $('#autocompleteSamples').prepend($autocompleteSample);

    $('#buttonSamples').append($buttonSample, '<br/><br/>', $buttonSampleSelect, '<br/><br/>', $buttonSampleDisable);
    $('#buttonSamplesMethods').prepend($buttonSampleCheckboxSelect, ' <label for="buttonSampleCheckboxSelect">Select</label> ', $buttonSampleCheckboxDisable, ' <label for="buttonSampleCheckboxDisable">Disable</label>', '<br/><br/>');

    $('#dialogSamples').append($dialogSampleCheckbox, ' <label for="dialogSampleCheckbox">Attach Dialog</label>');

    $('#drawerSamples').append($drawerSample, $drawerSampleSelect);

    $('#iconSamples').append($iconSamples);

    $('#menuSamples').append($menuSample, '<br/><br/>', $menuSampleOutput);

    $('#ratingSamples').append($ratingSample, '<br/><br/>', $ratingSampleOutput);

    $('#sliderSamples').append($sliderSample);

    $('#tabsSamples').append($tabsSample, '<br/><br/>', $tabsSampleVertical, '<br/><br/>', $tabsSampleOutput);

    $('.theme-samples').each(function () {
      var
        $autocomplete,
        $dialog = $('<span>', {
          'class': 'nui-dlg',
          text: 'Dialog'
        }),
        $icons = $('<div>');

      $.ninja.icon({
        value: 'X'
      }).appendTo($dialog);

      $.each(iconNames, function (i, iconName) {
        $icons.append(
          $.ninja.icon({
            value: iconName
          }),
          ' '
        );
      });

      $(this).append(
        $autocomplete = $.ninja.autocomplete({
          placeholder: 'Autocomplete'
        }).values(function (event) {
          $autocomplete.list({
            values: [
              { html: 'Value 1' },
              { html: 'Value 2' },
              { html: 'Value 3' }
            ],
            query: event.query
          });
        }),

        '<br/></br/>',

        $.ninja.button({
          html: 'Button'
        }),

        '<br/></br/>',

        $dialog,

        '<br/>',

        $.ninja.drawer({
          html: 'HTML',
          value: 'Drawer'
        }),

        '<br/>',

        $icons,

        '<br/>',

        $.ninja.menu({
          values: [
            { html: 'Value 1' },
            { html: 'Value 2' },
            { rule: true },
            { html: 'Value 3' }
          ],
          html: 'Menu'
        }),

        '<br/></br/>',

        $.ninja.rating({
          average: 3
        }).select(function (event) {
          $ratingSampleOutput.html('New rating: ' + event.stars + ' stars');
        }),

        '<br/></br/>',

        $.ninja.slider({
          html: 'Slider',
          value: 1,
          values: [
            { html: 'Value 1' },
            { html: 'Value 2' },
            { html: 'Value 3' }
          ]
        }),

        '<br/></br/>',

        $.ninja.tabs({
          values: [
            { html: 'Tab 1' },
            { html: 'Tab 2' },
            { html: 'Tab 3' }
          ]
        })

      );
    });

    $.ajax({
      url: 'https://api.github.com/repos/ninja/ui',
      dataType: 'jsonp',
      error: function () {
        $('#githubWatchers').prepend('196');
      },
      success: function (object) {
        $('#githubWatchers').prepend(object.data.watchers);
      },
      timeout: 3000
    });

    gapi.plusone.render('plusone', {
      href: 'http://ninjaui.com/',
      size: 'small'
    });

    $navigation.scrollSpy();

  });

}(jQuery));

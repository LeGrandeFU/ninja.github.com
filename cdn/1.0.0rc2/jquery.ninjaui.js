/*!
  Ninja User Interface jQuery Plugin v1.0.0rc2
  http://ninjaui.com/
  Copyright 2008-2011 Jamie Hoover
  Licensed per the terms of the Apache License v2.0
  http://ninjaui.com/#license
*/

/*globals CFInstall: false*/

/*jshint bitwise: true, browser: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 2, jquery: true, maxerr: 3, newcap: true, noarg: true, noempty: true, nomen: true, nonew: true, onevar: true, plusplus: false, regexp: true, strict: true, undef: true, white: true*/

(function ($, window, document, undefined) {

  'use strict';

  var
    browser = $.browser,
    defaults,
    objects,
    methods,
    time,
    version = $.fn.jquery.split('.'),
    versionMinor = parseFloat(version[1]),
    versionIncrement = parseFloat(version[2] || '0');

  if (versionMinor === 4 && versionIncrement < 3 || versionMinor < 4) {
    $.error('Ninja UI requires jQuery 1.4.3 or higher.');
  }

  if (browser.msie && parseFloat(browser.version) < '9') {
    $('<script/>', {
      defer: '',
      src: 'http://ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js'
    }).appendTo('head');
    $(document).ready(function () {
      CFInstall.check({
        mode: 'overlay'
      });
    });
  }

  $('<link/>', {
    rel: 'stylesheet',
    href: 'data:text/css;base64,LyohCiAgTmluamEgVXNlciBJbnRlcmZhY2UgalF1ZXJ5IFBsdWdpbiB2ZGV2ZWxvcG1lbnQKICBodHRwOi8vbmluamF1aS5jb20vCiAgQ29weXJpZ2h0IDIwMDgtMjAxMSBKYW1pZSBIb292ZXIKICBMaWNlbnNlZCBwZXIgdGhlIHRlcm1zIG9mIHRoZSBBcGFjaGUgTGljZW5zZSB2Mi4wCiAgaHR0cDovL25pbmphdWkuY29tLyNsaWNlbnNlCiovLm51aS1hdGMsLm51aS1tbnUsLm51aS1zbGQtdHJre3Bvc2l0aW9uOnJlbGF0aXZlfS5udWktYXRjIC5udWktaWNuW2FyaWEtbGFiZWw9c3Bpbl0sLm51aS1ibGssLm51aS1kbGcsLm51aS1kbGcgLm51aS1pY25bYXJpYS1sYWJlbD1YXSwubnVpLWxzdCwubnVpLXNsZC1idG4sLm51aS1zbGQtZ3J2e3Bvc2l0aW9uOmFic29sdXRlfS5udWktYXRjIC5udWktaWNuW2FyaWEtbGFiZWw9c3Bpbl17b3BhY2l0eTouNTtyaWdodDoxcHg7dG9wOjFweH0ubnVpLWF0YyBpbnB1dHtwYWRkaW5nLXJpZ2h0OjE3cHh9Lm51aS1ibGssLm51aS1kbGcsLm51aS1sc3R7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC44NSl9Lm51aS1ibGssLm51aS1kcncgLm51aS1idG4sLm51aS1pdG17d2lkdGg6MTAwJX0ubnVpLWJsaywubnVpLXNsZC1idG57bGVmdDowO3RvcDowfS5udWktYnRuLC5udWktaXRtLm51aS1odnIsLm51aS1zbGQtYnRuLC5udWktc2xkLWx2bCwubnVpLXRhYntiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yc3RvcCgwLHJnYmEoMjU1LDI1NSwyNTUsLjIpKSxjb2xvcnN0b3AoMC41LHJnYmEoMjU1LDI1NSwyNTUsMCkpLGNvbG9yc3RvcCgwLjUscmdiYSgwLDAsMCwwKSksY29sb3JzdG9wKDEscmdiYSgwLDAsMCwuMSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW1vei1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbXMtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW8tbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpfS5udWktYnRuLC5udWktaXRtLC5udWktdGFiLC5udWktdHJ5e3BhZGRpbmc6LjJlbSAxZW19Lm51aS1idG4sLm51aS1pdG0sLm51aS10YWJ7bGluZS1oZWlnaHQ6MWVtO3RleHQtc2hhZG93OjAgMXB4IDAgI2ZmZn0ubnVpLWJ0bjpob3ZlciwubnVpLWRsZyAubnVpLWljblthcmlhLWxhYmVsPVhdLC5udWktaXRtLm51aS1odnIsLm51aS1zbGQtYnRuLC5udWktc2xkLWdydiwubnVpLXN0cjpob3ZlciwubnVpLXRhYjpob3ZlcntjdXJzb3I6cG9pbnRlcn0ubnVpLWJ0biwubnVpLWxzdCwubnVpLWRsZywubnVpLXNsZC1idG4sLm51aS1zbGQtZ3J2LC5udWktc2xkLWx2bCwubnVpLXRhYiwubnVpLXRyeXstd2Via2l0LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDstbW96LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nO2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveH0ubnVpLWJ0biwubnVpLWxzdCwubnVpLWRsZywubnVpLXNsZC1idG4sLm51aS1zbGQtZ3J2LC5udWktdGFiLC5udWktdHJ5e2JhY2tncm91bmQtY29sb3I6I2VlZTtib3JkZXI6MXB4IHNvbGlkICM2NjZ9Lm51aS1idG4sLm51aS1sc3QsLm51aS1kbGd7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi40ZW07LW1vei1ib3JkZXItcmFkaXVzOi40ZW07Ym9yZGVyLXJhZGl1czouNGVtfS5udWktYnRuLC5udWktaXRtLC5udWktc2xkLWJ0biwubnVpLXN0ciwubnVpLXRhYnttYXJnaW46MDtvdXRsaW5lLXdpZHRoOjFweH0ubnVpLWJ0biwubnVpLXRhYnt0ZXh0LWFsaWduOmNlbnRlcn0ubnVpLWJ0biAubnVpLWljbiwubnVpLWl0bSAubnVpLWljbiwubnVpLXRhYiAubnVpLWljbnt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm51aS1kbGcsLm51aS1sc3R7Ym9yZGVyOjFweCBzb2xpZCAjY2NjOy13ZWJraXQtYm94LXNoYWRvdzowIC4yZW0gLjRlbSByZ2JhKDAsMCwwLC41KTstbW96LWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7LW1zLWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7LW8tYm94LXNoYWRvdzowIC4yZW0gLjRlbSByZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpO3otaW5kZXg6KzF9Lm51aS1kbGd7cGFkZGluZzouNmVtfS5udWktZGxnIC5udWktaWNuW2FyaWEtbGFiZWw9WF17cmlnaHQ6LTExcHg7dG9wOi0xMXB4fS5udWktZHJ3IC5udWktYnRuLC5udWktaXRtLC5udWktdGFiLXZydCAubnVpLXRhYntkaXNwbGF5OmJsb2NrfS5udWktZHJ3IC5udWktYnRuLC5udWktaXRtLC5udWktbHN0e3RleHQtYWxpZ246bGVmdH0ubnVpLWRydyAubnVpLWJ0bntwYWRkaW5nLWxlZnQ6MH0ubnVpLWRydyAubnVpLWJ0bi5udWktc2xjey13ZWJraXQtYm9yZGVyLXJhZGl1czouNGVtIC40ZW0gMCAwOy1tb3otYm9yZGVyLXJhZGl1czouNGVtIC40ZW0gMCAwO2JvcmRlci1yYWRpdXM6LjRlbSAuNGVtIDAgMH0ubnVpLWxzdCwubnVpLXRhYi1ocnosLm51aS10YWItdnJ0e3doaXRlLXNwYWNlOm5vd3JhcH0ubnVpLWljbiwubnVpLXNsZCwubnVpLXRhYi1ocnp7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm51aS1pY257aGVpZ2h0OjFlbTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7d2lkdGg6MWVtfS5udWktaWNuIGd7ZmlsbDojMzMzO3N0cm9rZTojMzMzfS5udWktaWNuW2FyaWEtbGFiZWw9WF17aGVpZ2h0OjIycHg7d2lkdGg6MjJweH0ubnVpLWljblthcmlhLWxhYmVsPVhdIGNpcmNsZSwubnVpLXN0ciBne3N0cm9rZTojY2NjO3N0cm9rZS13aWR0aDoxfS5udWktaWNuW2FyaWEtbGFiZWw9WF0gcG9seWdvbiwubnVpLWl0bS5udWktaHZyIGcsLm51aS1zbGMgZ3tmaWxsOiNmZmZ9Lm51aS1pdG0sLm51aS1zdHJ7YmFja2dyb3VuZDowO2JvcmRlcjowfS5udWktbHN0e3BhZGRpbmc6LjZlbSAwfS5udWktcnVse2JvcmRlci10b3A6MXB4IHNvbGlkICNjY2M7bWFyZ2luOi4yZW0gMCAuNGVtIDB9Lm51aS1zbGQtYnRuLC5udWktc2xkLWdydiwubnVpLXNsZC1sdmx7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjlweDstbW96LWJvcmRlci1yYWRpdXM6OXB4O2JvcmRlci1yYWRpdXM6OXB4fS5udWktc2xkLWJ0biwubnVpLXN0cntwYWRkaW5nOjB9Lm51aS1zbGQtYnRuLC5udWktc2xkLXRyaywubnVpLXN0ciAubnVpLWljbntoZWlnaHQ6MThweH0ubnVpLXNsZC1idG4sLm51aS1zdHIgLm51aS1pY257d2lkdGg6MThweH0ubnVpLXNsZC1ncnYsLm51aS1zbGQtbHZse2hlaWdodDo0cHh9Lm51aS1zbGQtZ3J2LC5udWktc2xje2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sY29sb3JzdG9wKDAscmdiYSgwLDAsMCwuMykpLGNvbG9yc3RvcCgwLjUscmdiYSgwLDAsMCwwKSksY29sb3JzdG9wKDAuNSxyZ2JhKDI1NSwyNTUsMjU1LDApKSxjb2xvcnN0b3AoMSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSkpO2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbW96LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuMykgMCxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOi1tcy1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSl9Lm51aS1zbGQtZ3J2e2JhY2tncm91bmQtY29sb3I6Izk5OTtsZWZ0OjlweDtyaWdodDo5cHg7dG9wOjVweH0ubnVpLXNsZC10dGx7Zm9udC13ZWlnaHQ6NzAwfS5udWktc3Rye21hcmdpbi1yaWdodDoxcHh9Lm51aS1zdHIgZ3tmaWxsOiNlZWV9Lm51aS1zdHIubnVpLWF2ZyBne2ZpbGw6IzY2Nn0ubnVpLXN0ci5udWktaW5kIGd7ZmlsbDojMDZjO3N0cm9rZTojMDM5fS5udWktdGFie2JvcmRlci1sZWZ0LXN0eWxlOm5vbmV9Lm51aS10YWI6Zmlyc3QtY2hpbGR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi40ZW0gMCAwIC40ZW07LW1vei1ib3JkZXItcmFkaXVzOi40ZW0gMCAwIC40ZW07Ym9yZGVyLXJhZGl1czouNGVtIDAgMCAuNGVtfS5udWktdGFiOmxhc3QtY2hpbGR7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjAgLjRlbSAuNGVtIDA7LW1vei1ib3JkZXItcmFkaXVzOjAgLjRlbSAuNGVtIDA7Ym9yZGVyLXJhZGl1czowIC40ZW0gLjRlbSAwfS5udWktdHJ5e2JvcmRlcjoxcHggc29saWQgIzk5OTtib3JkZXItYm90dG9tLWNvbG9yOiNjY2M7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjAgMCAuNGVtIC40ZW07LW1vei1ib3JkZXItcmFkaXVzOjAgMCAuNGVtIC40ZW07Ym9yZGVyLXJhZGl1czowIDAgLjRlbSAuNGVtO2JvcmRlci10b3Atc3R5bGU6bm9uZX0ubnVpLWl0bS5udWktaHZyLC5udWktc2xjLC5udWktc2xkLWx2bHtiYWNrZ3JvdW5kLWNvbG9yOiMwNmN9Lm51aS1pdG0ubnVpLWh2ciwubnVpLXNsY3tib3JkZXItY29sb3I6IzA2Yztjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgLTFweCAxcHggIzA2Y30ubnVpLWl0bS5udWktaHZyIGcsLm51aS1zbGMgZ3tzdHJva2U6I2ZmZn0ubnVpLXBsY3tjb2xvcjojOTk5fS5udWktc2xkLWJ0bi5udWktc2xje2JhY2tncm91bmQtY29sb3I6I2NjY30ubnVpLWRzYntjdXJzb3I6ZGVmYXVsdCFpbXBvcnRhbnR9'
  }).appendTo('head');

  time = $.now();

  function uniqueId() {
    return time ++;
  }

  methods = {

    attach: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('attach.ninja', callback);
        } else {
          $object.trigger('attach.ninja');
        }
      });
    },

    delist: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('delist.ninja', callback);
        } else {
          $object.trigger('delist.ninja');
        }
      });
    },

    deselect: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('deselect.ninja', callback);
        } else if ($object.is('.nui-slc') && !$object.is('.nui-dsb')) {
          $object.trigger('deselect.ninja');
        }
      });
    },

    detach: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('detach.ninja', callback);
        } else {
          $object.trigger('detach.ninja');
          $.fn.detach.apply($object);
        }
      });
    },

    disable: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('disable.ninja', callback);
        } else {
          $object.fadeTo('fast', 0.5).addClass('nui-dsb').trigger('disable.ninja');
        }
      });
    },

    enable: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('enable.ninja', callback);
        } else {
          $object.fadeTo('fast', 1).removeClass('nui-dsb').trigger('enable.ninja');
        }
      });
    },

    list: function (options) {
      return this.each(function () {
        options = $.extend({}, defaults, options);
        var
          $hover = null,
          $object = $(this).ninja(),
          $button = $object.find('button'),
          $input = $object.find('input'),
          $list = $('<div/>', {
            'class': 'nui-lst'
          });
        if ($object.is('.nui-atc')) {
          $object.find('.nui-icn[aria-label=spin]').hide();
        }
        if (options.choices.length) {
          $object.bind({
            'delist.ninja': function () {
              $(document).unbind('click.ninja keydown.ninja keyup.ninja');
              $list.detach();
              if ($hover) {
                $hover.removeClass('nui-hvr');
              }
            }
          });
          $object.append($list);
          $(document).bind({
            'keydown.ninja': function (event) {
              if ($.inArray(event.keyCode, [9, 38, 40]) > -1) {/* tab, down or up */
                event.preventDefault();/* prevents page scrolling and tabbing when a list is active */
              }
            },
            'keyup.ninja': function (event) {
              if ($.inArray(event.keyCode, [9, 13, 27, 38, 40]) > -1) {/* tab, return, escape, down or up */
                if (event.keyCode === 13) {/* return */
                  if ($hover) {
                    $hover.click();
                  }
                } else if (event.keyCode === 27) {/* escape */
                  $object.delist();
                } else if ($.inArray(event.keyCode, [9, 40]) > -1 && !event.shiftKey) {/* tab or down arrow */
                  if ($hover) {
                    if ($hover.nextAll('.nui-itm').length) {
                      $hover.nextAll('.nui-itm:first').trigger('mouseenter.ninja');
                    } else {
                      $list.find('.nui-itm:first').trigger('mouseenter.ninja');
                    }
                  } else {
                    $list.find('.nui-itm:first').trigger('mouseenter.ninja');
                  }
                } else if (event.keyCode === 38 || (event.shiftKey && event.keyCode === 9)) {/* shift+tab or up arrow */
                  if ($hover) {
                    if ($hover.prevAll('.nui-itm').length) {
                      $hover.prevAll('.nui-itm:first').trigger('mouseenter.ninja');
                    } else {
                      $list.find('.nui-itm:last').trigger('mouseenter.ninja');
                    }
                  } else {
                    $list.find('.nui-itm:last').trigger('mouseenter.ninja');
                  }
                }
                return false;
              }
            },
            'click.ninja': function (event) {
              $object.delist();
            }
          });
          if (options.query) {
            options.choices = $.map(options.choices, function (item) {
              item.value = item.value  || item.html || item;
              if (item.html) {
                item.html = item.html.toString().replace(new RegExp(options.query, 'gi'), '<b>' + options.query + '</b>');
              }
              return item;
            });
          }
          $.each(options.choices, function (i, choice) {
            var $choice;
            if (choice.spacer) {
              $choice = $('<div/>', {
                'class': 'nui-rul'
              });
            } else {
              $choice = $('<button/>', {
                'class': 'nui-itm'
              });
              $choice.bind({
                'mouseleave.ninja': function () {
                  $hover.removeClass('nui-hvr');
                },
                'click.ninja': function () {
                  if ($button) {
                    $button.focus();
                  }
                  if ($input) {
                    $input.val(choice.value || choice.html || choice).focus();
                  }
                  if ($.isFunction(choice.select)) {
                    choice.select();
                  }
                },
                'mouseenter.ninja': function () {
                  if ($button) {
                    $button.blur();
                  }
                  if ($hover) {
                    $hover.trigger('mouseleave.ninja');
                  }
                  $hover = $choice.addClass('nui-hvr');
                }
              });
            }
            $choice.html(choice.html || choice).appendTo($list);
          });
          if (($list.offset().top + $list.outerHeight()) > ($(window).scrollTop() + $(window).height())) {
            $list.css({
              bottom: 0
            });
          } else {
            $list.css({
              top: $object.outerHeight()
            });
          }
          if (($list.offset().left + $list.outerWidth()) > ($(window).scrollLeft() + $(window).width())) {
            $list.css({
              right: 0
            });
          } else {
            $list.css({
              left: 0
            });
          }
        }
      });
    },

    placeholder: function (placeholder) {
      return this.each(function () {
        var
          $object = $(this).ninja(),
          value;
        if ($object.is('input[type=search], input[type=text]')) {
          if ('placeholder' in $object) {
            $object.attr('placeholder', placeholder);
          } else {
            $object.bind({
              'blur.ninja': function () {
                value = $object.val();
                if (value === '' || value === placeholder) {
                  $object.addClass('nui-plc');
                  if (value === '') {
                    $object.val(placeholder);
                  }
                }
              },
              'focus.ninja': function () {
                if ($object.val() === placeholder) {
                  $object.removeClass('nui-plc').val('');
                }
              }
            }).trigger('blur.ninja');
          }
        }
      });
    },

    select: function (event) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(event)) {
          $object.bind('select.ninja', event);
        } else if (!$object.is('.nui-dsb')) {
          $object.trigger('select.ninja');
        }
      });
    },

    source: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('source.ninja', callback);
        } else if ($object.val() !== '') {
          $object.trigger('source.ninja');
        }
      });
    }

  };

  objects = {

    autocomplete: function (options) {
      options = $.extend({}, defaults, options);
      var
        timer,
        $autocomplete = $('<span/>', {
          'class': 'nui-atc'
        }).bind({
          'select.ninja': function (event) {
            if (event.html) {
              $input.val($.trim(event.html.toString().replace(new RegExp('/<\/?[^>]+>/', 'gi'), '')));
            } else {
              event.html = $input.val();
            }
          },
          'source.ninja': function (event) {
            $input.delist();
            event.query = $input.val();
          }
        }),
        $input = $('<input/>', {
          type: 'text'
        }).bind({
          'keyup.ninja': function (event) {
            clearTimeout(timer);
            if ($.inArray(event.keyCode, [9, 13, 27, 37, 38, 39, 40]) === -1 && $input.val() !== '') {/* not tab, return, escape, left , up, right or down */
              timer = setTimeout(function () {
                var $spin = $autocomplete.find('.nui-icn[aria-label=spin]');
                if ($spin.is(':hidden')) {
                  $spin.show();
                } else {
                  $.ninja.icon({
                    name: 'spin'
                  }).appendTo($autocomplete);
                }
                $input.source();
              }, 1000);
            }
          }
        }).appendTo($autocomplete);
      if (options.placeholder) {
        $input.ninja().placeholder(options.placeholder);
      }
      return $autocomplete.ninja();
    },

    button: function (options) {
      options = $.extend({}, defaults, options);
      var $button = $('<button/>', {
        'class': 'nui-btn',
        css: options.css,
        html: options.html
      });
      $button.bind({
        'click.ninja': function (event) {
          if (!$button.is('.nui-dsb')) {
            if ($button.is('.nui-slc')) {
              $button.trigger('deselect.ninja');
            } else {
              $button.trigger('select.ninja');
            }
          }
          event.stopImmediatePropagation();
        },
        'deselect.ninja': function () {
          $button.removeClass('nui-slc');
        },
        'disable.ninja': function () {
          $button.attr({
            disabled: 'disabled'
          });
        },
        'enable.ninja': function () {
          $button.attr({
            disabled: false
          });
        },
        'select.ninja': function () {
          $button.addClass('nui-slc');
        }
      });
      if (options.select) {
        $button.trigger('select.ninja');
      }
      if (options.disable) {
        $button.ninja().disable();
      }
      return $button.ninja();
    },

    dialog: function (options) {
      options = $.extend({}, defaults, {
        $parent: $('body')
      }, options);
      var
        $dialog = $('<span/>', {
          'class': 'nui-dlg',
          css: options.css,
          html: options.html
        }),
        $button = $.ninja.icon({
          name: 'X'
        }).bind('click.ninja', function () {
          $dialog.detach();
        }).appendTo($dialog),
        $blocker = $('<div/>', {
          'class': 'nui-blk'
        }).bind('click.ninja', function (event) {
          if ($.inArray($dialog[0], $(event.target).parents()) === -1) {
            $dialog.detach();
          }
        });
      $dialog.bind({
        'attach.ninja': function (event) {
          options.$parent.append($blocker, $dialog);
          $blocker.height(options.$parent.height());
          $dialog.css({
            left: ($(window).width() / 2) - ($dialog.width() / 2),
            top: ($(window).height() / 2) - ($dialog.height() / 2) + $(window).scrollTop()
          });
          $(document).bind({
            'keyup.ninja': function (event) {
              if (event.keyCode === 27) {/* escape */
                $dialog.detach();
              }
            }
          });
        },
        'detach.ninja remove.ninja': function () {
          $(document).unbind('click.ninja keydown.ninja');
          $blocker.detach();
        }
      });
      return $dialog.ninja();
    },

    drawer: function (options) {
      options = $.extend({}, defaults, options);
      var
        $drawer = $('<div/>', {
          'class': 'nui-drw',
          css: options.css
        }),
        $tray = $('<div/>', {
          'class': 'nui-try',
          html: options.html
        }).appendTo($drawer),
        $arrowDown = $.ninja.icon({
          name: 'arrow-down'
        }),
        $arrowRight = $.ninja.icon({
          name: 'arrow-right'
        }),
        $handle = $.ninja.button($.extend({}, options, {
          select: options.select,
          html: options.title
        })).bind({
          'deselect.ninja': function () {
            $tray.slideUp('fast', function () {
              $arrowDown.detach();
              $handle.prepend($arrowRight);
            });
          },
          'select.ninja': function () {
            $arrowRight.detach();
            $handle.prepend($arrowDown);
            $tray.slideDown('fast');
          }
        }).prependTo($drawer);
      if (options.select) {
        $handle.prepend($arrowDown);
      } else {
        $handle.prepend($arrowRight);
        $tray.hide();
      }
      return $drawer.ninja();
    },

    icon: function (options) {
      options = $.extend({}, defaults, {
        name: 'spin'
      }, options);
      var
        $icon,
        border = ' fill="none" stroke-width="2"',
        defs = '',
        g = '',
        id = uniqueId(),
        idMask = id + 'Mask',
        idSymbol = id + 'Symbol',
        idVector = id + 'Vector',
        mask = '',
        maskBackground = '<rect fill="#fff" x="0" y="0" width="16" height="16"/>',
        onload = '',
        points = '',
        rotate = '';
      if ($.inArray(options.name, ['arrow-down', 'arrow-right']) > -1) {
        if (options.name === 'arrow-down') {
          points = '4,4 12,4 8,12';
        } else {
          points = '4,4 12,8 4,12';
        }
        g = '<polygon points="' + points + '"/>';
      } else if (options.name === 'camera') {
        defs = '<defs><mask id="' + idMask + '">' + maskBackground + '<circle cx="8" cy="9" r="5"/></mask></defs>';
        g = '<rect x="0" y="4" width="16" height="11" rx="2" ry="2" mask="url(#' + idMask + ')"/><polygon points="4,8 4,4 6,1 10,1 12,4 12,8" mask="url(#' + idMask + ')"/><circle cx="8" cy="9" r="3"/>';
      } else if ($.inArray(options.name, ['X', 'x', '-', '+']) > -1) {
        if (options.name === '-') {
          mask = '<rect x="4" y="7" width="8" height="2"/>';
        } else {
          if (options.name !== '+') {
            rotate = ' transform="rotate(45 8 8)"';
          }
          mask = '<polygon points="7,4 9,4 9,7 12,7 12,9 9,9 9,12 7,12 7,9 4,9 4,7 7,7"' + rotate + '/>';
        }
        if (options.name === 'X') {
          g = '<circle cx="8" cy="8" r="7"/><polygon points="7,4 9,4 9,7 12,7 12,9 9,9 9,12 7,12 7,9 4,9 4,7 7,7"' + rotate + '/>';
        } else {
          defs = '<defs><mask id="' + idMask + '">' + maskBackground + mask + '</mask></defs>';
          g = '<circle cx="8" cy="8" mask="url(#' + idMask + ')" r="8"/>';
        }
      } else if (options.name === 'email') {
        g = '<polygon points="0,2 8,10 16,2"/><polygon points="16,4 12,8 16,12"/><polygon points="0,14 5,9 8,12 11,9 16,14"/><polygon points="0,4 4,8 0,12"/>';
      } else if (options.name === 'go') {
        g = '<circle' + border + ' cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="5"/>';
      } else if (options.name === 'home') {
        g = '<polygon points="0,10 0,8 8,0 16,8 16,10 14,10 14,16 10,16 10,10 6,10 6,16 2,16 2,10"/><rect x="11" y="16" width="4" height="8"/>';
      } else if (options.name === 'search') {
        g = '<circle' + border + ' cx="7" cy="7" r="5"/><polygon points="9,11 11,9 16,14 14,16"/>';
      } else if (options.name === 'star') {
        g = '<polygon points="0,6 6,6 8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10"/>';
      } else if (options.name === 'stop') {
        g = '<polygon' + border + ' points="1,11 1,5 5,1 11,1 15,5 15,11 11,15 5,15"/><polygon points="3,10 3,6 6,3 10,3 13,6 13,10 10,13 6,13"/>';
      } else if (options.name === 'yield') {
        g = '<polygon' + border + ' points="8,1 15,15 1,15"/><polygon points="8,5 12,13 4,13"/>';
      } else if (options.name === 'spin') {
        onload = ' onload="var frame=0;setInterval(function(){frame=frame+30;if(frame===360){frame=0}document.getElementById(\'' + idVector + '\').setAttributeNS(null,\'transform\',\'rotate(\'+frame+\' 8 8)\');},100)"';
        defs = '<defs><rect id="' + idSymbol + '" x="7" width="2" height="4"/></defs>';
        g = '<use xlink:href="#' + idSymbol + '" style="opacity:.1" transform="rotate(30 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.2" transform="rotate(60 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.3" transform="rotate(90 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.4" transform="rotate(120 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.5" transform="rotate(150 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.6" transform="rotate(180 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.7" transform="rotate(210 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.8" transform="rotate(240 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.9" transform="rotate(270 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.9.5" transform="rotate(300 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.9.75" transform="rotate(330 8 8)"/><use xlink:href="#' + idSymbol + '"/>';
      }
      $icon = $('<svg aria-label="' + options.name + '" class="nui-icn" height="1" width="1"' + onload + ' role="img" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>' + options.name + '</title>' + defs + '<g id="' + idVector + '" stroke-width="0">' + g + '</g></svg>');
      if (options.css) {
        $icon.find('g').css(options.css);
      }
      return $icon;
    },

    menu: function (options) {
      options = $.extend({}, defaults, options);
      var
        $menu = $('<span/>', {
          'class': 'nui-mnu'
        }),
        $button = $.ninja.button($.extend({}, options, {
          html: options.html
        })).select(function () {
          $menu.list(options);
        }).deselect(function () {
          $menu.delist();
        }).append($.ninja.icon({
          name: 'arrow-down'
        }));
      $menu.bind({
        'delist.ninja': function () {
          $button.deselect();
        }
      }).append($button);
      return $menu.ninja();
    },

    rating: function (options) {
      options = $.extend({}, defaults, {
        average: 0,
        select: 0,
        stars: 5
      }, options);
      var
        i,
        $rating = $('<span/>', {
          'class': 'nui-rating'
        }).bind({
          'mouseleave.ninja': function () {
            $rating.find('.nui-str').each(function (ii, star) {
              var $star = $(star);
              if (options.select === 0) {
                if (ii < options.average) {
                  $star.addClass('nui-avg');
                } else {
                  $star.removeClass('nui-avg');
                }
              }
              if (ii < options.select) {
                $star.addClass('nui-ind');
              } else {
                $star.removeClass('nui-ind');
              }
            });
          }
        });
      for (i = 0; i < options.stars; i++) {
        $('<button/>', {
          'class': 'nui-str',
          html: $.ninja.icon({
            'name': 'star'
          })
        }).appendTo($rating);
      }
      $rating.find('.nui-str').each(function (i, star) {
        i++;
        var $star = $(star);
        $star.bind({
          'click.ninja select.ninja': function () {
            options.select = i;
            $rating.trigger('mouseleave.ninja').trigger({
              type: 'select',
              stars: i
            });
          },
          'mouseenter.ninja': function () {
            $rating.find('.nui-str').each(function (ii, star) {
              var $star = $(star).removeClass('nui-avg');
              if (ii < i) {
                $star.addClass('nui-ind');
              } else {
                $star.removeClass('nui-ind');
              }
            });
          }
        });
      });
      $rating.trigger('mouseleave.ninja');
      return $rating.ninja();
    },

    slider: function (options) {
      options = $.extend({}, defaults, {
        slot: 0,
        width: 200
      }, options);
      var
        drag = false,
        offsetX = 0,
        touch,
        slots = options.choices.length - 1,
        increment = options.width / slots,
        left = options.slot * increment,
        $choice = $('<span/>', {
          'class': 'nui-sld-choice',
          html: options.choices[options.slot].html
        }),
        $button = $('<button/>', {
          'class': 'nui-sld-btn',
          css: { left: left }
        }),
        trackWidth = options.width + 18,
        $level = $('<div/>', {
          'class': 'nui-sld-lvl',
          css: { width: left }
        }),
        $slider = $('<span/>', {
          'class': 'nui-sld'
        }).bind({
          'change.ninja select.ninja': function (event) {
            var slot;
            if (event.sliderX < 0) {
              slot = 0;
            } else if (event.sliderX > slots) {
              slot = slots;
            } else {
              slot = event.sliderX;
            }
            event.choice = options.choices[slot];
            $choice.html(event.choice.html);
            left = slot * increment;
            $button.css({ left: left });
            $level.css({ width: left });
          },
          'select.ninja': function (event) {
            if (event.choice.select) {
              event.choice.select(event);
            }
          }
        }).append($choice),
        $track = $('<div/>', {
          'class': 'nui-sld-trk',
          css: { width: trackWidth }
        }).appendTo($slider),
        $groove = $('<div/>', {
          'class': 'nui-sld-grv'
        }).bind('click.ninja', function (event) {
          $button.trigger({
            type: 'select.ninja',
            sliderX: Math.round((event.pageX - $track.offset().left) / increment)
          });
        });
      $track.append($groove.append($level), $button);
      if (options.title) {
        $choice.before($('<span/>', {
          'class': 'nui-sld-ttl',
          text: options.title + ': '
        }));
      }
      $button.bind({
        'keyup.ninja': function (event) {
          if ($.inArray(event.keyCode, [37, 39]) > -1) {/* right or left */
            var
              choice,
              slot = Math.round($button.position().left / increment);
            if (slot > 0 && event.keyCode === 37) {/* left arrow */
              slot--;
            } else if (slot < slots && event.keyCode === 39) {/* right arrow */
              slot++;
            }
            choice = options.choices[slot];
            $choice.html(choice.html);
            left = slot * increment;
            $button.css({ left: left });
            $level.css({ width: left });
            return false;
          }
        },
        'mousedown.ninja touchstart.ninja': function (event) {
          event.preventDefault();
          $button.addClass('nui-slc');
          return false;
        },
        'mousedown.ninja': function (event) {
          offsetX = event.pageX - $button.position().left;
          drag = true;
          $(document).bind({
            'mousemove.ninja': function (event) {
              if (!drag) {
                return;
              }
              $slider.trigger({
                type: 'change.ninja',
                sliderX: Math.round((event.pageX - offsetX) / increment)
              });
            },
            'mouseup.ninja': function (event) {
              $button.removeClass('nui-slc');
              drag = false;
              $button.trigger({
                type: 'select.ninja',
                sliderX: Math.round((event.pageX - offsetX) / increment)
              });
              $(document).unbind('mousemove.ninja mouseup.ninja');
            }
          });
        },
        'touchstart.ninja': function (event) {
          touch = event.originalEvent.targetTouches[0] || event.originalEvent.changedTouches[0];
          offsetX = touch.pageX - $button.position().left;
        },
        'touchmove.ninja': function (event) {
          event.preventDefault();
          if (!touch) {
            return;
          }
          touch = event.originalEvent.targetTouches[0] || event.originalEvent.changedTouches[0];
          $slider.trigger({
            type: 'change.ninja',
            sliderX: Math.round((touch.pageX - offsetX) / increment)
          });
        },
        'touchend.ninja': function (event) {
          event.preventDefault();
          $button.removeClass('nui-slc').trigger({
            type: 'select.ninja',
            sliderX: Math.round((touch.pageX - offsetX) / increment)
          });
        }
      });
      return $slider.ninja();
    },

    tabs: function (options) {
      options = $.extend({}, defaults, {
        choice: 1
      }, options);
      var $tabs = $('<span/>');
      if (options.vertical) {
        $tabs.addClass('nui-tab-vrt');
      } else {
        $tabs.addClass('nui-tab-hrz');
      }
      $.each(options.choices, function (i, choice) {
        var $tab = $('<button/>', {
          'class': 'nui-tab',
          css: options.css,
          html: choice.html || choice
        }).bind({
          'click.ninja': function () {
            if (!$tab.is('.nui-dsb') && !$tab.is('.nui-slc')) {
              $tab.trigger('select.ninja');
            }
          },
          'disable.ninja': function () {
            $tab.attr({
              disabled: 'disabled'
            });
          },
          'enable.ninja': function () {
            $tab.attr({
              disabled: false
            });
          },
          'select.ninja': function () {
            $tabs.children().not($tab).removeClass('nui-slc');
            $tab.addClass('nui-slc');
            if ($.isFunction(choice.select)) {
              choice.select();
            }
          }
        }).appendTo($tabs);
        if (i === options.choice - 1) {
          $tab.select();
        }
      });
      return $tabs.ninja();
    },

    version: function () {
      return '1.0.0rc2';
    }

  };

  $.ninja = objects;

  $.fn.ninja = function () {
    return this.extend(methods);
  };

}(jQuery, window, document));

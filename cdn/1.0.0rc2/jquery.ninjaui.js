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
    href: 'data:text/css;base64,LyohCiAgTmluamEgVXNlciBJbnRlcmZhY2UgalF1ZXJ5IFBsdWdpbiB2ZGV2ZWxvcG1lbnQKICBodHRwOi8vbmluamF1aS5jb20vCiAgQ29weXJpZ2h0IDIwMDgtMjAxMSBKYW1pZSBIb292ZXIKICBMaWNlbnNlZCBwZXIgdGhlIHRlcm1zIG9mIHRoZSBBcGFjaGUgTGljZW5zZSB2Mi4wCiAgaHR0cDovL25pbmphdWkuY29tLyNsaWNlbnNlCiovLm51aS1hdGMsLm51aS1tbnUsLm51aS1zbGQtdHJre3Bvc2l0aW9uOnJlbGF0aXZlfS5udWktYXRjIC5udWktaWNuW2FyaWEtbGFiZWw9c3Bpbl0sLm51aS1ibGssLm51aS1kbGcsLm51aS1kbGcgLm51aS1pY25bYXJpYS1sYWJlbD1YXSwubnVpLWxzdCwubnVpLXNsZC1idG4sLm51aS1zbGQtZ3J2e3Bvc2l0aW9uOmFic29sdXRlfS5udWktYXRjLC5udWktaWNuLC5udWktbW51LC5udWktc2xkLC5udWktdGFiLWhyentkaXNwbGF5OmlubGluZS1ibG9ja30ubnVpLWF0YyAubnVpLWljblthcmlhLWxhYmVsPXNwaW5de29wYWNpdHk6LjU7cmlnaHQ6MXB4O3RvcDoxcHh9Lm51aS1hdGMgaW5wdXR7cGFkZGluZy1yaWdodDoxN3B4fS5udWktYmxrLC5udWktZHJ3IC5udWktYnRuLC5udWktaXRte3dpZHRoOjEwMCV9Lm51aS1ibGssLm51aS1zbGQtYnRue2xlZnQ6MDt0b3A6MH0ubnVpLWJsa3tiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpfS5udWktYnRuLC5udWktaXRtLm51aS1odnIsLm51aS1zbGQtYnRuLC5udWktc2xkLWx2bCwubnVpLXRhYntiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yc3RvcCgwLHJnYmEoMjU1LDI1NSwyNTUsLjIpKSxjb2xvcnN0b3AoMC41LHJnYmEoMjU1LDI1NSwyNTUsMCkpLGNvbG9yc3RvcCgwLjUscmdiYSgwLDAsMCwwKSksY29sb3JzdG9wKDEscmdiYSgwLDAsMCwuMSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW1vei1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbXMtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW8tbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpfS5udWktYnRuLC5udWktaXRtLC5udWktdGFiLC5udWktdHJ5e3BhZGRpbmc6LjJlbSAxZW19Lm51aS1idG4sLm51aS1pdG0sLm51aS10YWJ7bGluZS1oZWlnaHQ6MWVtO3RleHQtc2hhZG93OjAgMXB4IDAgI2ZmZn0ubnVpLWJ0biwubnVpLWRsZyAubnVpLWljblthcmlhLWxhYmVsPVhdLC5udWktaXRtLC5udWktc2xkLWJ0biwubnVpLXNsZC1ncnYsLm51aS1zdHIsLm51aS10YWJ7Y3Vyc29yOnBvaW50ZXJ9Lm51aS1idG4sLm51aS1kbGcsLm51aS1sc3QsLm51aS1zbGQtYnRuLC5udWktc2xkLWdydiwubnVpLXNsZC1sdmwsLm51aS10YWIsLm51aS10cnl7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7LW1vei1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZztiYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3h9Lm51aS1idG4sLm51aS1zbGQtYnRuLC5udWktc2xkLWdydiwubnVpLXRhYiwubnVpLXRyeXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7Ym9yZGVyOjFweCBzb2xpZCAjOTk5fS5udWktYnRuLC5udWktZGxnLC5udWktbHN0ey13ZWJraXQtYm9yZGVyLXJhZGl1czouNGVtOy1tb3otYm9yZGVyLXJhZGl1czouNGVtO2JvcmRlci1yYWRpdXM6LjRlbX0ubnVpLWJ0biwubnVpLWl0bSwubnVpLXNsZC1idG4sLm51aS1zdHIsLm51aS10YWJ7bWFyZ2luOjA7b3V0bGluZS13aWR0aDoxcHh9Lm51aS1idG4sLm51aS10YWItaHJ6IC5udWktdGFie3RleHQtYWxpZ246Y2VudGVyfS5udWktYnRuIC5udWktaWNuLC5udWktaXRtIC5udWktaWNuLC5udWktdGFiIC5udWktaWNue3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubnVpLWRsZywubnVpLWxzdHtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjkpO2JvcmRlcjoxcHggc29saWQgI2NjYzstd2Via2l0LWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7LW1vei1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1tcy1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1vLWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowIC4yZW0gLjRlbSByZ2JhKDAsMCwwLC41KTt6LWluZGV4OisxfS5udWktZGxne3BhZGRpbmc6LjZlbX0ubnVpLWRsZyAubnVpLWljblthcmlhLWxhYmVsPVhde3JpZ2h0Oi0xMXB4O3RvcDotMTFweH0ubnVpLWRydyAubnVpLWJ0biwubnVpLWl0bSwubnVpLXRhYi12cnQgLm51aS10YWJ7ZGlzcGxheTpibG9ja30ubnVpLWRydyAubnVpLWJ0biwubnVpLWl0bSwubnVpLWxzdHt0ZXh0LWFsaWduOmxlZnR9Lm51aS1kcncgLm51aS1idG57cGFkZGluZy1sZWZ0OjB9Lm51aS1kcncgLm51aS1idG4ubnVpLXNsYywubnVpLXRhYi12cnQgLm51aS10YWI6Zmlyc3QtY2hpbGR7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi40ZW0gLjRlbSAwIDA7LW1vei1ib3JkZXItcmFkaXVzOi40ZW0gLjRlbSAwIDA7Ym9yZGVyLXJhZGl1czouNGVtIC40ZW0gMCAwfS5udWktaWNue2hlaWdodDoxZW07dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjFlbX0ubnVpLWljbiBne2ZpbGw6IzMzMztzdHJva2U6IzMzM30ubnVpLWljblthcmlhLWxhYmVsPVhdIHBvbHlnb24sLm51aS1pdG0ubnVpLWh2ciBnLC5udWktc2xjIGd7ZmlsbDojZmZmfS5udWktaWNuW2FyaWEtbGFiZWw9WF0gY2lyY2xlLC5udWktc3RyIGd7c3Ryb2tlOiNjY2M7c3Ryb2tlLXdpZHRoOjF9Lm51aS1pY25bYXJpYS1sYWJlbD1YXXtoZWlnaHQ6MjJweDt3aWR0aDoyMnB4fS5udWktaXRtLC5udWktc3Rye2JhY2tncm91bmQ6MDtib3JkZXI6MH0ubnVpLWxzdCwubnVpLXJ0biwubnVpLXRhYi1ocnosLm51aS10YWItdnJ0e3doaXRlLXNwYWNlOm5vd3JhcH0ubnVpLWxzdHtwYWRkaW5nOi42ZW0gMH0ubnVpLXJ1bHtib3JkZXItdG9wOjFweCBzb2xpZCAjY2NjO21hcmdpbjouMmVtIDAgLjRlbSAwfS5udWktc2xkLWJ0biwubnVpLXNsZC1ncnYsLm51aS1zbGQtbHZsey13ZWJraXQtYm9yZGVyLXJhZGl1czo5cHg7LW1vei1ib3JkZXItcmFkaXVzOjlweDtib3JkZXItcmFkaXVzOjlweH0ubnVpLXNsZC1idG4sLm51aS1zdHJ7cGFkZGluZzowfS5udWktc2xkLWJ0biwubnVpLXNsZC10cmssLm51aS1zdHIgLm51aS1pY257aGVpZ2h0OjE4cHh9Lm51aS1zbGQtYnRuLC5udWktc3RyIC5udWktaWNue3dpZHRoOjE4cHh9Lm51aS1zbGQtZ3J2LC5udWktc2xkLWx2bHtoZWlnaHQ6NHB4fS5udWktc2xkLWdydiwubnVpLXNsY3tiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yc3RvcCgwLHJnYmEoMCwwLDAsLjMpKSxjb2xvcnN0b3AoMC41LHJnYmEoMCwwLDAsMCkpLGNvbG9yc3RvcCgwLjUscmdiYSgyNTUsMjU1LDI1NSwwKSksY29sb3JzdG9wKDEscmdiYSgyNTUsMjU1LDI1NSwuMSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW1vei1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbXMtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW8tbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpfS5udWktc2xkLWdydntiYWNrZ3JvdW5kLWNvbG9yOiM5OTk7bGVmdDo5cHg7cmlnaHQ6OXB4O3RvcDo1cHh9Lm51aS1zbGQtdHRse2ZvbnQtd2VpZ2h0OjcwMH0ubnVpLXN0ciBne2ZpbGw6I2VlZX0ubnVpLXRhYi1ocnogLm51aS10YWJ7Ym9yZGVyLWxlZnQtc3R5bGU6bm9uZX0ubnVpLXRhYi1ocnogLm51aS10YWI6Zmlyc3QtY2hpbGR7Ym9yZGVyLWxlZnQtc3R5bGU6c29saWQ7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi40ZW0gMCAwIC40ZW07LW1vei1ib3JkZXItcmFkaXVzOi40ZW0gMCAwIC40ZW07Ym9yZGVyLXJhZGl1czouNGVtIDAgMCAuNGVtfS5udWktdGFiLWhyeiAubnVpLXRhYjpsYXN0LWNoaWxkey13ZWJraXQtYm9yZGVyLXJhZGl1czowIC40ZW0gLjRlbSAwOy1tb3otYm9yZGVyLXJhZGl1czowIC40ZW0gLjRlbSAwO2JvcmRlci1yYWRpdXM6MCAuNGVtIC40ZW0gMH0ubnVpLXRhYi12cnQgLm51aS10YWJ7Ym9yZGVyLXRvcC1zdHlsZTpub25lO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJX0ubnVpLXRhYi12cnQgLm51aS10YWI6Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1zdHlsZTpzb2xpZH0ubnVpLXRhYi12cnQgLm51aS10YWI6bGFzdC1jaGlsZCwubnVpLXRyeXstd2Via2l0LWJvcmRlci1yYWRpdXM6MCAwIC40ZW0gLjRlbTstbW96LWJvcmRlci1yYWRpdXM6MCAwIC40ZW0gLjRlbTtib3JkZXItcmFkaXVzOjAgMCAuNGVtIC40ZW19Lm51aS10cnl7Ym9yZGVyLWJvdHRvbS1jb2xvcjojY2NjO2JvcmRlci10b3Atc3R5bGU6bm9uZX0ubnVpLWl0bS5udWktaHZyLC5udWktc2xjLC5udWktc2xkLWx2bHtiYWNrZ3JvdW5kLWNvbG9yOiMwNmN9Lm51aS1pdG0ubnVpLWh2ciwubnVpLXNsY3tib3JkZXItY29sb3I6IzA2Yztjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgLTFweCAxcHggIzA2Y30ubnVpLWl0bS5udWktaHZyIGcsLm51aS1zbGMgZ3tzdHJva2U6I2ZmZn0ubnVpLXBsY3tjb2xvcjojOTk5fS5udWktc2xkLWJ0bi5udWktc2xje2JhY2tncm91bmQtY29sb3I6I2NjYztib3JkZXItY29sb3I6Izk5OX0ubnVpLXN0ci5udWktYXZnIGd7ZmlsbDojNjY2fS5udWktc3RyLm51aS1pbmQgZ3tmaWxsOiMwNmM7c3Ryb2tlOiMwMzl9Lm51aS1kc2IsLm51aS10YWIubnVpLXNsY3tjdXJzb3I6ZGVmYXVsdH0='
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
        if (options.values.length) {
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
            options.values = $.map(options.values, function (item) {
              item.value = item.value  || item.html || item;
              if (item.html) {
                item.html = item.html.toString().replace(new RegExp(options.query, 'gi'), '<b>' + options.query + '</b>');
              }
              return item;
            });
          }
          $.each(options.values, function (i, value) {
            var $value;
            if (value.rule) {
              $value = $('<div/>', {
                'class': 'nui-rul'
              });
            } else {
              $value = $('<button/>', {
                'class': 'nui-itm'
              });
              $value.bind({
                'mouseleave.ninja': function () {
                  $hover.removeClass('nui-hvr');
                },
                'click.ninja': function () {
                  if ($button) {
                    $button.focus();
                  }
                  if ($input) {
                    $input.val(value.value || value.html || value).focus();
                  }
                  if ($.isFunction(value.select)) {
                    value.select();
                  }
                },
                'mouseenter.ninja': function () {
                  if ($button) {
                    $button.blur();
                  }
                  if ($hover) {
                    $hover.trigger('mouseleave.ninja');
                  }
                  $hover = $value.addClass('nui-hvr');
                }
              });
            }
            $value.html(value.html || value).appendTo($list);
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

    values: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('values.ninja', callback);
        } else if ($object.val() !== '') {
          $object.trigger('values.ninja');
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
          'values.ninja': function (event) {
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
                    value: 'spin'
                  }).appendTo($autocomplete);
                }
                $input.values();
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
          value: 'X'
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
          value: 'arrow-down'
        }),
        $arrowRight = $.ninja.icon({
          value: 'arrow-right'
        }),
        $handle = $.ninja.button($.extend({}, options, {
          select: options.select,
          html: options.value
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
        value: 'spin'
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
      if ($.inArray(options.value, ['arrow-down', 'arrow-right']) > -1) {
        if (options.value === 'arrow-down') {
          points = '4,4 12,4 8,12';
        } else {
          points = '4,4 12,8 4,12';
        }
        g = '<polygon points="' + points + '"/>';
      } else if (options.value === 'camera') {
        defs = '<defs><mask id="' + idMask + '">' + maskBackground + '<circle cx="8" cy="9" r="5"/></mask></defs>';
        g = '<rect x="0" y="4" width="16" height="11" rx="2" ry="2" mask="url(#' + idMask + ')"/><polygon points="4,8 4,4 6,1 10,1 12,4 12,8" mask="url(#' + idMask + ')"/><circle cx="8" cy="9" r="3"/>';
      } else if ($.inArray(options.value, ['X', 'x', '-', '+']) > -1) {
        if (options.value === '-') {
          mask = '<rect x="4" y="7" width="8" height="2"/>';
        } else {
          if (options.value !== '+') {
            rotate = ' transform="rotate(45 8 8)"';
          }
          mask = '<polygon points="7,4 9,4 9,7 12,7 12,9 9,9 9,12 7,12 7,9 4,9 4,7 7,7"' + rotate + '/>';
        }
        if (options.value === 'X') {
          g = '<circle cx="8" cy="8" r="7"/><polygon points="7,4 9,4 9,7 12,7 12,9 9,9 9,12 7,12 7,9 4,9 4,7 7,7"' + rotate + '/>';
        } else {
          defs = '<defs><mask id="' + idMask + '">' + maskBackground + mask + '</mask></defs>';
          g = '<circle cx="8" cy="8" mask="url(#' + idMask + ')" r="8"/>';
        }
      } else if (options.value === 'email') {
        g = '<polygon points="0,2 8,10 16,2"/><polygon points="16,4 12,8 16,12"/><polygon points="0,14 5,9 8,12 11,9 16,14"/><polygon points="0,4 4,8 0,12"/>';
      } else if (options.value === 'go') {
        g = '<circle' + border + ' cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="5"/>';
      } else if (options.value === 'home') {
        g = '<polygon points="0,10 0,8 8,0 16,8 16,10 14,10 14,16 10,16 10,10 6,10 6,16 2,16 2,10"/><rect x="11" y="16" width="4" height="8"/>';
      } else if (options.value === 'search') {
        g = '<circle' + border + ' cx="7" cy="7" r="5"/><polygon points="9,11 11,9 16,14 14,16"/>';
      } else if (options.value === 'star') {
        g = '<polygon points="0,6 6,6 8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10"/>';
      } else if (options.value === 'stop') {
        g = '<polygon' + border + ' points="1,11 1,5 5,1 11,1 15,5 15,11 11,15 5,15"/><polygon points="3,10 3,6 6,3 10,3 13,6 13,10 10,13 6,13"/>';
      } else if (options.value === 'yield') {
        g = '<polygon' + border + ' points="8,1 15,15 1,15"/><polygon points="8,5 12,13 4,13"/>';
      } else if (options.value === 'spin') {
        onload = ' onload="var frame=0;setInterval(function(){frame=frame+30;if(frame===360){frame=0}document.getElementById(\'' + idVector + '\').setAttributeNS(null,\'transform\',\'rotate(\'+frame+\' 8 8)\');},100)"';
        defs = '<defs><rect id="' + idSymbol + '" x="7" width="2" height="4"/></defs>';
        g = '<use xlink:href="#' + idSymbol + '" style="opacity:.1" transform="rotate(30 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.2" transform="rotate(60 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.3" transform="rotate(90 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.4" transform="rotate(120 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.5" transform="rotate(150 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.6" transform="rotate(180 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.7" transform="rotate(210 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.8" transform="rotate(240 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.9" transform="rotate(270 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.9.5" transform="rotate(300 8 8)"/><use xlink:href="#' + idSymbol + '" style="opacity:.9.75" transform="rotate(330 8 8)"/><use xlink:href="#' + idSymbol + '"/>';
      }
      $icon = $('<svg aria-label="' + options.value + '" class="nui-icn" height="1" width="1"' + onload + ' role="img" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>' + options.value + '</title>' + defs + '<g id="' + idVector + '" stroke-width="0">' + g + '</g></svg>');
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
          value: 'arrow-down'
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
        individual: 0,
        values: 5
      }, options);
      var
        i,
        $rating = $('<span/>', {
          'class': 'nui-rtn'
        }).bind({
          'mouseleave.ninja': function () {
            $rating.find('.nui-str').each(function (ii, star) {
              var $star = $(star);
              if (options.individual === 0) {
                if (ii < options.average) {
                  $star.addClass('nui-avg');
                } else {
                  $star.removeClass('nui-avg');
                }
              }
              if (ii < options.individual) {
                $star.addClass('nui-ind');
              } else {
                $star.removeClass('nui-ind');
              }
            });
          }
        });
      for (i = 0; i < options.values; i++) {
        $('<button/>', {
          'class': 'nui-str',
          html: $.ninja.icon({
            value: 'star'
          })
        }).appendTo($rating);
      }
      $rating.find('.nui-str').each(function (i, star) {
        i++;
        var $star = $(star);
        $star.bind({
          'click.ninja select.ninja': function () {
            options.individual = i;
            $rating.trigger('mouseleave.ninja').trigger({
              type: 'select',
              value: i
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
        value: 0,
        width: 200
      }, options);
      var
        drag = false,
        offsetX = 0,
        touch,
        slots = options.values.length - 1,
        increment = options.width / slots,
        left = options.value * increment,
        $value = $('<span/>', {
          'class': 'nui-sld-value',
          html: options.values[options.value].html
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
            event.value = options.values[slot];
            $value.html(event.value.html);
            left = slot * increment;
            $button.css({ left: left });
            $level.css({ width: left });
          },
          'select.ninja': function (event) {
            if (event.value.select) {
              event.value.select(event);
            }
          }
        }).append($value),
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
      if (options.html) {
        $value.before($('<span/>', {
          'class': 'nui-sld-ttl',
          html: options.html + ': '
        }));
      }
      $button.bind({
        'keyup.ninja': function (event) {
          if ($.inArray(event.keyCode, [37, 39]) > -1) {/* right or left */
            var
              value,
              slot = Math.round($button.position().left / increment);
            if (slot > 0 && event.keyCode === 37) {/* left arrow */
              slot--;
            } else if (slot < slots && event.keyCode === 39) {/* right arrow */
              slot++;
            }
            value = options.values[slot];
            $value.html(value.html);
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
        value: 1
      }, options);
      var $tabs = $('<span/>');
      if (options.vertical) {
        $tabs.addClass('nui-tab-vrt');
      } else {
        $tabs.addClass('nui-tab-hrz');
      }
      $.each(options.values, function (i, value) {
        var $tab = $('<button/>', {
          'class': 'nui-tab',
          css: options.css,
          html: value.html || value
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
            if ($.isFunction(value.select)) {
              value.select();
            }
          }
        }).appendTo($tabs);
        if (i === options.value - 1) {
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

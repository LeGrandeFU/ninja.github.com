/*!
  Ninja UI jQuery Plugin v1.0.0rc1
  http://ninjaui.com/

  Copyright 2008-2011 Jamie Hoover
  Licensed per the terms of the Apache License v2.0
  http://ninjaui.com/license
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
    href: 'data:text/css;base64,Lm51aS1hdGN7cG9zaXRpb246cmVsYXRpdmV9Lm51aS1hdGMgLm51aS1pY25bYXJpYS1sYWJlbD1zcGluXXtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDotMjBweDt0b3A6MXB4fS5udWktYXRjIC5udWktaWNuW2FyaWEtbGFiZWw9c3Bpbl0gZ3tmaWxsOiM5OTkhaW1wb3J0YW50fS5udWktYmxre2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjEwMCV9Lm51aS1idG4sLm51aS1pdG0ubnVpLWh2ciwubnVpLXNsZC1idG4sLm51aS1zbGQtbHZsLC5udWktdGFie2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sY29sb3JzdG9wKDAscmdiYSgyNTUsMjU1LDI1NSwuMikpLGNvbG9yc3RvcCgwLjUscmdiYSgyNTUsMjU1LDI1NSwwKSksY29sb3JzdG9wKDAuNSxyZ2JhKDAsMCwwLDApKSxjb2xvcnN0b3AoMSxyZ2JhKDAsMCwwLC4xKSkpO2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbW96LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuMikgMCxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDAsMCwwLC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOi1tcy1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7ZmlsdGVyOnByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yU3RyPSdyZ2JhKDI1NSwgMjU1LCAyNTUsIC4yKScsRW5kQ29sb3JTdHI9J3JnYmEoMCwwLDAsLjEpJyk7cG9zaXRpb246cmVsYXRpdmV9Lm51aS1idG4sLm51aS1pdG0sLm51aS10YWJ7bGluZS1oZWlnaHQ6MWVtO3BhZGRpbmc6LjJlbSAxZW07dGV4dC1zaGFkb3c6MCAxcHggMCAjZmZmfS5udWktYnRuOmhvdmVyLC5udWktaXRtLm51aS1odnIsLm51aS1zbGQtYnRuLC5udWktc2xkLWdydiwubnVpLXN0cjpob3ZlciwubnVpLXRhYjpob3ZlcntjdXJzb3I6cG9pbnRlcn0ubnVpLWJ0biwubnVpLWxzdCwubnVpLWRsZywubnVpLWhudCwubnVpLXNsZC1idG4sLm51aS1zbGQtZ3J2LC5udWktc2xkLWx2bCwubnVpLXRhYiwubnVpLXRyeXstd2Via2l0LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDstbW96LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nO2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveH0ubnVpLWJ0biwubnVpLWxzdCwubnVpLWRsZywubnVpLWhudCwubnVpLXNsZC1idG4sLm51aS1zbGQtZ3J2LC5udWktdGFiLC5udWktdHJ5e2JhY2tncm91bmQtY29sb3I6I2VlZTtib3JkZXI6MXB4IHNvbGlkICM2NjZ9Lm51aS1idG4sLm51aS1sc3QsLm51aS1kbGcsLm51aS1obnR7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7LW1vei1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZztiYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi40ZW07LW1vei1ib3JkZXItcmFkaXVzOi40ZW07Ym9yZGVyLXJhZGl1czouNGVtfS5udWktYnRuLC5udWktaXRtLC5udWktc2xkLWJ0biwubnVpLXN0ciwubnVpLXRhYnttYXJnaW46MDtvdXRsaW5lLXdpZHRoOjFweH0ubnVpLWJ0biwubnVpLXRhYnt0ZXh0LWFsaWduOmNlbnRlcn0ubnVpLWJ0biAubnVpLWljbiwubnVpLWl0bSAubnVpLWljbiwubnVpLXRhYiAubnVpLWljbnt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm51aS1kbGcsLm51aS1obnR7cGFkZGluZzouNmVtfS5udWktZGxnIC5udWktaWNuW2FyaWEtbGFiZWw9WF17Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTExcHg7dG9wOi0xMXB4fS5udWktZHJ3IC5udWktYnRue2Rpc3BsYXk6YmxvY2s7cGFkZGluZy1sZWZ0OjA7dGV4dC1hbGlnbjpsZWZ0O3dpZHRoOjEwMCV9Lm51aS1kcncgLm51aS1idG4ubnVpLXNsY3std2Via2l0LWJvcmRlci1yYWRpdXM6LjM1ZW0gLjM1ZW0gMCAwOy1tb3otYm9yZGVyLXJhZGl1czouMzVlbSAuMzVlbSAwIDA7Ym9yZGVyLXJhZGl1czouMzVlbSAuMzVlbSAwIDB9Lm51aS1obnR7d2hpdGUtc3BhY2U6bm93cmFwfS5udWktaWNue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoxZW07dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjFlbX0ubnVpLWljbiBne2ZpbGw6IzMzMztzdHJva2U6IzAwMH0ubnVpLWljblthcmlhLWxhYmVsPVhde2hlaWdodDoyMnB4O3dpZHRoOjIycHh9Lm51aS1pY25bYXJpYS1sYWJlbD1YXSBjaXJjbGV7c3Ryb2tlOiM5OTk7c3Ryb2tlLXdpZHRoOjF9Lm51aS1pY25bYXJpYS1sYWJlbD1YXSBwb2x5Z29ue2ZpbGw6I2ZmZn0ubnVpLWlucHtwYWRkaW5nLXJpZ2h0OjIwcHh9Lm51aS1pdG0ubnVpLWh2ciwubnVpLXNsZC1ncnYsLm51aS1zbGN7YmFja2dyb3VuZC1jb2xvcjojOTk5fS5udWktaXRtLm51aS1odnIsLm51aS1zbGN7Y29sb3I6I2ZmZjt0ZXh0LXNoYWRvdzowIDFweCAwICM2NjZ9Lm51aS1pdG0ubnVpLWh2ciBnLC5udWktc2xjIGd7ZmlsbDojZmZmO3N0cm9rZTojZmZmfS5udWktaXRte2JhY2tncm91bmQ6MDtib3JkZXI6MDtkaXNwbGF5OmJsb2NrO3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMDAlfS5udWktbHN0LC5udWktZGxnLC5udWktaG50e2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuODUpO2JvcmRlcjoxcHggc29saWQgI2NjYzstd2Via2l0LWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7LW1vei1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1tcy1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1vLWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowIC4yZW0gLjRlbSByZ2JhKDAsMCwwLC41KTtwYWRkaW5nOi42ZW07cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDorMX0ubnVpLWxzdHtwYWRkaW5nOi42ZW0gMDt0ZXh0LWFsaWduOmxlZnR9Lm51aS1ydWx7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtib3JkZXItdG9wOjFweCBzb2xpZCAjY2NjO21hcmdpbjouNGVtIDB9Lm51aS1zbGR7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm51aS1zbGQtYnRuLC5udWktc2xkLWdydiwubnVpLXNsZC1sdmx7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjlweDstbW96LWJvcmRlci1yYWRpdXM6OXB4O2JvcmRlci1yYWRpdXM6OXB4fS5udWktc2xkLWJ0bntoZWlnaHQ6MThweDtsZWZ0OjA7cGFkZGluZzowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjE4cHh9Lm51aS1zbGQtYnRuLm51aS1zbGN7YmFja2dyb3VuZC1jb2xvcjojY2NjfS5udWktc2xkLWdydiwubnVpLXNsZC1sdmx7aGVpZ2h0OjRweH0ubnVpLXNsZC1ncnYsLm51aS1zbGN7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWdyYWRpZW50KGxpbmVhcixsZWZ0IHRvcCxsZWZ0IGJvdHRvbSxjb2xvcnN0b3AoMCxyZ2JhKDAsMCwwLC4zKSksY29sb3JzdG9wKDAuNSxyZ2JhKDAsMCwwLDApKSxjb2xvcnN0b3AoMC41LHJnYmEoMjU1LDI1NSwyNTUsMCkpLGNvbG9yc3RvcCgxLHJnYmEoMjU1LDI1NSwyNTUsLjEpKSk7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuMykgMCxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOi1tb3otbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW1zLWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuMykgMCxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOi1vLWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuMykgMCxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuMykgMCxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSAxMDAlKTtmaWx0ZXI6cHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KHN0YXJ0Q29sb3JTdHI9J3JnYmEoMCwgMCwgMCwgLjIpJyxFbmRDb2xvclN0cj0ncmdiYSgyNTUsMjU1LDI1NSwuMSknKX0ubnVpLXNsZC1ncnZ7Y3Vyc29yOnBvaW50ZXI7bGVmdDo5cHg7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6OXB4O3RvcDo1cHh9Lm51aS1zbGQtbHZse2JhY2tncm91bmQtY29sb3I6IzZjZn0ubnVpLXNsZC10dGx7Zm9udC13ZWlnaHQ6NzAwfS5udWktc2xkLXRya3toZWlnaHQ6MThweDtwb3NpdGlvbjpyZWxhdGl2ZX0ubnVpLXN0cntiYWNrZ3JvdW5kOjA7Ym9yZGVyOjA7bWFyZ2luLXJpZ2h0OjFweDtwYWRkaW5nOjB9Lm51aS1zdHIgLm51aS1pY257aGVpZ2h0OjE4cHg7d2lkdGg6MThweH0ubnVpLXN0ciBne2ZpbGw6I2VlZTtzdHJva2U6I2NjYztzdHJva2Utd2lkdGg6MX0ubnVpLXN0ci5udWktYXZnIGd7ZmlsbDojNmNmO3N0cm9rZTojMzljfS5udWktc3RyLm51aS1pbmQgZ3tmaWxsOiNjOTY7c3Ryb2tlOiM5NjN9Lm51aS1zdG17ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjhweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LThweDt3aWR0aDo4cHh9Lm51aS1zdG0gZ3tmaWxsOnJnYmEoMjU1LDI1NSwyNTUsLjg1KTtzdHJva2U6I2NjY30ubnVpLXRhYi1ocnosLm51aS10YWItdnJ0e3doaXRlLXNwYWNlOm5vd3JhcH0ubnVpLXRhYi1ocnp7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm51aS10YWItdnJ0IC5udWktdGFie2Rpc3BsYXk6YmxvY2t9Lm51aS10YWJ7Ym9yZGVyLWxlZnQtY29sb3I6I2NjY30ubnVpLXRhYjpmaXJzdC1jaGlsZHtib3JkZXItbGVmdC1jb2xvcjojOTk5Oy13ZWJraXQtYm9yZGVyLXJhZGl1czouMzVlbSAwIDAgLjM1ZW07LW1vei1ib3JkZXItcmFkaXVzOi4zNWVtIDAgMCAuMzVlbTtib3JkZXItcmFkaXVzOi4zNWVtIDAgMCAuMzVlbX0ubnVpLXRhYjpsYXN0LWNoaWxke2JvcmRlci1yaWdodC1jb2xvcjojOTk5Oy13ZWJraXQtYm9yZGVyLXJhZGl1czowIC4zNWVtIC4zNWVtIDA7LW1vei1ib3JkZXItcmFkaXVzOjAgLjM1ZW0gLjM1ZW0gMDtib3JkZXItcmFkaXVzOjAgLjM1ZW0gLjM1ZW0gMH0ubnVpLXRhYi5udWktc2xje2JvcmRlci1sZWZ0LWNvbG9yOiM2NjY7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM2NjZ9Lm51aS10YWI6Zmlyc3QtY2hpbGQubnVpLXNsY3tib3JkZXItbGVmdC1jb2xvcjojOTk5fS5udWktdGFiOmxhc3QtY2hpbGQubnVpLXNsY3tib3JkZXItcmlnaHQtY29sb3I6Izk5OX0ubnVpLXRyeXtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZWVlOy13ZWJraXQtYm9yZGVyLXJhZGl1czowIDAgLjM1ZW0gLjM1ZW07LW1vei1ib3JkZXItcmFkaXVzOjAgMCAuMzVlbSAuMzVlbTtib3JkZXItcmFkaXVzOjAgMCAuMzVlbSAuMzVlbTtib3JkZXItdG9wLWNvbG9yOiM2NjY7cGFkZGluZzouMmVtIDFlbX0ubnVpLXBsY3tjb2xvcjojOTk5fS5udWktZHNie2N1cnNvcjpkZWZhdWx0IWltcG9ydGFudH0='
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

    hint: function (options) {
      return this.each(function () {
        options = $.extend({}, defaults, options);
        var
          $object = $(this),
          $hint = $('<span/>', {
            'class': 'nui-hnt',
            css: options.css,
            html: options.html
          }),
          $stem = $('<svg class="nui-stm" height="1" width="1" version="1.1" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g><polygon points="4,1 8,8 1,8" stroke-width="0"/><line x1="4" x2="0" y2="8"/><line x1="4" x2="8" y2="8"/></g></svg>').appendTo($hint);
        if (options.css) {
          $stem.find('g').css(options.css);
        }
        $object.bind({
          'mouseenter.ninja': function () {
            $hint.css({
              top: $object.outerHeight() + 6
            }).appendTo($object);
            if (($hint.offset().left + $hint.outerWidth()) > ($(window).scrollLeft() + $(window).width())) {
              $hint.css({
                left: 'auto',
                right: 0
              });
              $stem.css({
                left: 'auto',
                right: ($object.outerWidth() / 2) - 4
              });
            } else {
              $hint.css({
                left: 0,
                right: 'auto'
              });
              $stem.css({
                left: ($object.outerWidth() / 2) - 4,
                right: 'auto'
              });
            }
          },
          'mouseleave.ninja select.ninja': function () {
            $hint.detach();
          }
        });
      });
    },

    list: function (options) {
      return this.each(function () {
        options = $.extend({}, defaults, options);
        var
          $hover = null,
          $object = $(this).ninja(),
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
              if ($.inArray(event.keyCode, [9, 38, 40]) > -1) {/* down or up */
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
                  $object.trigger('delist.ninja').focus();
                  if ($object.is('input[type=text]')) {
                    $object.val(choice.value);
                  }
                  if ($.isFunction(choice.select)) {
                    choice.select();
                  }
                },
                'mouseenter.ninja': function () {
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
          'class': 'nui-inp',
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
      var $menu = $.ninja.button($.extend({}, options, {
        html: options.html
      })).addClass('nui-mnu').append($.ninja.icon({
        name: 'arrow-down'
      })).select(function () {
        $menu.blur().list(options);
      }).deselect(function () {
        $menu.delist();
      }).delist(function () {
        $menu.deselect();
      });
      return $menu;
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
      return '1.0.0rc1';
    }

  };

  $.ninja = objects;

  $.fn.ninja = function () {
    return this.extend(methods);
  };

}(jQuery, window, document));

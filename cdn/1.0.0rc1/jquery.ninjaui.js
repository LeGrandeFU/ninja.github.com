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
    href: 'data:text/css;base64,Lm5pbmphLW9iamVjdC1hdXRvY29tcGxldGV7cGFkZGluZy1yaWdodDoyMHB4fS5uaW5qYS1vYmplY3QtYXV0b2NvbXBsZXRlLXNwaW57cG9zaXRpb246cmVsYXRpdmV9Lm5pbmphLW9iamVjdC1hdXRvY29tcGxldGUtc3BpbiAubmluamEtb2JqZWN0LWljb257bGVmdDotMjBweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4fS5uaW5qYS1vYmplY3QtYXV0b2NvbXBsZXRlLXNwaW4gLm5pbmphLW9iamVjdC1pY29uIGd7ZmlsbDojOTk5IWltcG9ydGFudH0ubmluamEtb2JqZWN0LWJsb2NrZXJ7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KTtsZWZ0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MTAwJX0ubmluamEtb2JqZWN0LWJ1dHRvbiwubmluamEtb2JqZWN0LWl0ZW0ubmluamEtc3RhdGUtaG92ZXIsLm5pbmphLW9iamVjdC1zbGlkZXItYnV0dG9uLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWxldmVsLC5uaW5qYS1vYmplY3QtdGFie2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sY29sb3JzdG9wKDAscmdiYSgyNTUsMjU1LDI1NSwuMikpLGNvbG9yc3RvcCgwLjUscmdiYSgyNTUsMjU1LDI1NSwwKSksY29sb3JzdG9wKDAuNSxyZ2JhKDAsMCwwLDApKSxjb2xvcnN0b3AoMSxyZ2JhKDAsMCwwLC4xKSkpO2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbW96LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgyNTUsMjU1LDI1NSwuMikgMCxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDAsMCwwLC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOi1tcy1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7ZmlsdGVyOnByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yU3RyPSdyZ2JhKDI1NSwgMjU1LCAyNTUsIC4yKScsRW5kQ29sb3JTdHI9J3JnYmEoMCwwLDAsLjEpJyl9Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC1pdGVtLC5uaW5qYS1vYmplY3QtdGFie2xpbmUtaGVpZ2h0OjFlbTtwYWRkaW5nOi4yZW0gMWVtO3RleHQtc2hhZG93OjAgMXB4IDAgI2ZmZn0ubmluamEtb2JqZWN0LWJ1dHRvbjpob3ZlciwubmluamEtb2JqZWN0LWl0ZW0ubmluamEtc3RhdGUtaG92ZXIsLm5pbmphLW9iamVjdC1zbGlkZXItYnV0dG9uLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtb2JqZWN0LXN0YXI6aG92ZXIsLm5pbmphLW9iamVjdC10YWI6aG92ZXJ7Y3Vyc29yOnBvaW50ZXJ9Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC1saXN0LC5uaW5qYS1vYmplY3QtZGlhbG9nLC5uaW5qYS1vYmplY3QtaGludCwubmluamEtb2JqZWN0LXNsaWRlci1idXR0b24sLm5pbmphLW9iamVjdC1zbGlkZXItZ3Jvb3ZlLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWxldmVsLC5uaW5qYS1vYmplY3QtdGFiLC5uaW5qYS1vYmplY3QtdHJheXstd2Via2l0LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDstbW96LWJhY2tncm91bmQtY2xpcDpwYWRkaW5nO2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveH0ubmluamEtb2JqZWN0LWJ1dHRvbiwubmluamEtb2JqZWN0LWxpc3QsLm5pbmphLW9iamVjdC1kaWFsb2csLm5pbmphLW9iamVjdC1oaW50LC5uaW5qYS1vYmplY3Qtc2xpZGVyLWJ1dHRvbiwubmluamEtb2JqZWN0LXNsaWRlci1ncm9vdmUsLm5pbmphLW9iamVjdC10YWIsLm5pbmphLW9iamVjdC10cmF5e2JhY2tncm91bmQtY29sb3I6I2VlZTtib3JkZXI6MXB4IHNvbGlkICM2NjZ9Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC1saXN0LC5uaW5qYS1vYmplY3QtZGlhbG9nLC5uaW5qYS1vYmplY3QtaGludHstd2Via2l0LWJvcmRlci1yYWRpdXM6LjRlbTstbW96LWJvcmRlci1yYWRpdXM6LjRlbTtib3JkZXItcmFkaXVzOi40ZW19Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC1pdGVtLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWJ1dHRvbiwubmluamEtb2JqZWN0LXN0YXIsLm5pbmphLW9iamVjdC10YWJ7bWFyZ2luOjA7b3V0bGluZS13aWR0aDoxcHh9Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC10YWJ7dGV4dC1hbGlnbjpjZW50ZXJ9Lm5pbmphLW9iamVjdC1idXR0b24gLm5pbmphLW9iamVjdC1pY29uLC5uaW5qYS1vYmplY3QtaXRlbSAubmluamEtb2JqZWN0LWljb24sLm5pbmphLW9iamVjdC10YWIgLm5pbmphLW9iamVjdC1pY29ue3ZlcnRpY2FsLWFsaWduOmJvdHRvbX0ubmluamEtb2JqZWN0LWRpYWxvZywubmluamEtb2JqZWN0LWhpbnR7cGFkZGluZzouNmVtfS5uaW5qYS1vYmplY3QtZGlhbG9nIC5uaW5qYS1vYmplY3QtaWNvblthcmlhLWxhYmVsPVhde2N1cnNvcjpwb2ludGVyO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0Oi0xMXB4O3RvcDotMTFweH0ubmluamEtb2JqZWN0LWRyYXdlciAubmluamEtb2JqZWN0LWJ1dHRvbntkaXNwbGF5OmJsb2NrO3BhZGRpbmctbGVmdDowO3RleHQtYWxpZ246bGVmdDt3aWR0aDoxMDAlfS5uaW5qYS1vYmplY3QtZHJhd2VyIC5uaW5qYS1vYmplY3QtYnV0dG9uLm5pbmphLXN0YXRlLXNlbGVjdHstd2Via2l0LWJvcmRlci1yYWRpdXM6LjM1ZW0gLjM1ZW0gMCAwOy1tb3otYm9yZGVyLXJhZGl1czouMzVlbSAuMzVlbSAwIDA7Ym9yZGVyLXJhZGl1czouMzVlbSAuMzVlbSAwIDB9Lm5pbmphLW9iamVjdC1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoxZW07dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjFlbX0ubmluamEtb2JqZWN0LWljb24gZ3tmaWxsOiMzMzM7c3Ryb2tlOiMwMDB9Lm5pbmphLW9iamVjdC1pY29uW2FyaWEtbGFiZWw9WF17aGVpZ2h0OjIycHg7d2lkdGg6MjJweH0ubmluamEtb2JqZWN0LWljb25bYXJpYS1sYWJlbD1YXSBjaXJjbGV7c3Ryb2tlOiM5OTk7c3Ryb2tlLXdpZHRoOjF9Lm5pbmphLW9iamVjdC1pY29uW2FyaWEtbGFiZWw9WF0gcG9seWdvbntmaWxsOiNmZmZ9Lm5pbmphLW9iamVjdC1pdGVtLm5pbmphLXN0YXRlLWhvdmVyLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtc3RhdGUtc2VsZWN0e2JhY2tncm91bmQtY29sb3I6Izk5OX0ubmluamEtb2JqZWN0LWl0ZW0ubmluamEtc3RhdGUtaG92ZXIsLm5pbmphLXN0YXRlLXNlbGVjdHtjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgMXB4IDAgIzY2Nn0ubmluamEtb2JqZWN0LWl0ZW0ubmluamEtc3RhdGUtaG92ZXIgZywubmluamEtc3RhdGUtc2VsZWN0IGd7ZmlsbDojZmZmO3N0cm9rZTojZmZmfS5uaW5qYS1vYmplY3QtaXRlbXtiYWNrZ3JvdW5kOjA7Ym9yZGVyOjA7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAwJX0ubmluamEtb2JqZWN0LW1lbnUubmluamEtb2JqZWN0LWJ1dHRvbntwYWRkaW5nLXJpZ2h0OjB9Lm5pbmphLW9iamVjdC1tZW51IFthcmlhLWxhYmVsPW1lbnVde21hcmdpbi1sZWZ0OjFlbX0ubmluamEtb2JqZWN0LWxpc3QsLm5pbmphLW9iamVjdC1kaWFsb2csLm5pbmphLW9iamVjdC1oaW50e2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuODUpO2JvcmRlcjoxcHggc29saWQgI2NjYzstd2Via2l0LWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7LW1vei1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1tcy1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1vLWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowIC4yZW0gLjRlbSByZ2JhKDAsMCwwLC41KTtsZWZ0OjA7cGFkZGluZzouNmVtO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6KzF9Lm5pbmphLW9iamVjdC1saXN0e3BhZGRpbmc6LjZlbSAwO3RleHQtYWxpZ246bGVmdH0ubmluamEtb2JqZWN0LXJ1bGV7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2VlZTtib3JkZXItdG9wOjFweCBzb2xpZCAjY2NjO21hcmdpbjouNGVtIDB9Lm5pbmphLW9iamVjdC1zbGlkZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2t9Lm5pbmphLW9iamVjdC1zbGlkZXItYnV0dG9uLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtb2JqZWN0LXNsaWRlci1sZXZlbHstd2Via2l0LWJvcmRlci1yYWRpdXM6OXB4Oy1tb3otYm9yZGVyLXJhZGl1czo5cHg7Ym9yZGVyLXJhZGl1czo5cHh9Lm5pbmphLW9iamVjdC1zbGlkZXItYnV0dG9ue2hlaWdodDoxOHB4O2xlZnQ6MDtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MThweH0ubmluamEtb2JqZWN0LXNsaWRlci1idXR0b24ubmluamEtc3RhdGUtc2VsZWN0e2JhY2tncm91bmQtY29sb3I6I2NjY30ubmluamEtb2JqZWN0LXNsaWRlci1ncm9vdmUsLm5pbmphLW9iamVjdC1zbGlkZXItbGV2ZWx7aGVpZ2h0OjRweH0ubmluamEtb2JqZWN0LXNsaWRlci1ncm9vdmUsLm5pbmphLXN0YXRlLXNlbGVjdHtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yc3RvcCgwLHJnYmEoMCwwLDAsLjMpKSxjb2xvcnN0b3AoMC41LHJnYmEoMCwwLDAsMCkpLGNvbG9yc3RvcCgwLjUscmdiYSgyNTUsMjU1LDI1NSwwKSksY29sb3JzdG9wKDEscmdiYSgyNTUsMjU1LDI1NSwuMSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW1vei1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbXMtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW8tbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDAsMCwwLC4zKSAwLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjEpIDEwMCUpO2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvclN0cj0ncmdiYSgwLCAwLCAwLCAuMiknLEVuZENvbG9yU3RyPSdyZ2JhKDI1NSwyNTUsMjU1LC4xKScpfS5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZXtjdXJzb3I6cG9pbnRlcjtsZWZ0OjlweDtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDo5cHg7dG9wOjVweH0ubmluamEtb2JqZWN0LXNsaWRlci1sZXZlbHtiYWNrZ3JvdW5kLWNvbG9yOiM2Y2Z9Lm5pbmphLW9iamVjdC1zbGlkZXItdGl0bGV7Zm9udC13ZWlnaHQ6NzAwfS5uaW5qYS1vYmplY3Qtc2xpZGVyLXRyYWNre2hlaWdodDoxOHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5uaW5qYS1vYmplY3Qtc3RhcntiYWNrZ3JvdW5kOjA7Ym9yZGVyOjA7bWFyZ2luLXJpZ2h0OjFweDtwYWRkaW5nOjB9Lm5pbmphLW9iamVjdC1zdGFyIC5uaW5qYS1vYmplY3QtaWNvbntoZWlnaHQ6MThweDt3aWR0aDoxOHB4fS5uaW5qYS1vYmplY3Qtc3RhciBne2ZpbGw6I2VlZTtzdHJva2U6I2NjYztzdHJva2Utd2lkdGg6MX0ubmluamEtb2JqZWN0LXN0YXIubmluamEtc3RhdGUtYXZlcmFnZSBne2ZpbGw6IzZjZjtzdHJva2U6IzM5Y30ubmluamEtb2JqZWN0LXN0YXIubmluamEtc3RhdGUtaW5kaXZpZHVhbCBne2ZpbGw6I2M5NjtzdHJva2U6Izk2M30ubmluamEtb2JqZWN0LXN0ZW17ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjhweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LThweDt3aWR0aDo4cHh9Lm5pbmphLW9iamVjdC1zdGVtIGd7ZmlsbDpyZ2JhKDI1NSwyNTUsMjU1LC44NSk7c3Ryb2tlOiNjY2N9Lm5pbmphLW9iamVjdC10YWJzLWhvcml6b250YWwsLm5pbmphLW9iamVjdC10YWJzLXZlcnRpY2Fse3doaXRlLXNwYWNlOm5vd3JhcH0ubmluamEtb2JqZWN0LXRhYnMtaG9yaXpvbnRhbHtkaXNwbGF5OmlubGluZS1ibG9ja30ubmluamEtb2JqZWN0LXRhYnMtdmVydGljYWwgLm5pbmphLW9iamVjdC10YWJ7ZGlzcGxheTpibG9ja30ubmluamEtb2JqZWN0LXRhYntib3JkZXItbGVmdC1jb2xvcjojY2NjfS5uaW5qYS1vYmplY3QtdGFiOmZpcnN0LWNoaWxke2JvcmRlci1sZWZ0LWNvbG9yOiM5OTk7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi4zNWVtIDAgMCAuMzVlbTstbW96LWJvcmRlci1yYWRpdXM6LjM1ZW0gMCAwIC4zNWVtO2JvcmRlci1yYWRpdXM6LjM1ZW0gMCAwIC4zNWVtfS5uaW5qYS1vYmplY3QtdGFiOmxhc3QtY2hpbGR7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM5OTk7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjAgLjM1ZW0gLjM1ZW0gMDstbW96LWJvcmRlci1yYWRpdXM6MCAuMzVlbSAuMzVlbSAwO2JvcmRlci1yYWRpdXM6MCAuMzVlbSAuMzVlbSAwfS5uaW5qYS1vYmplY3QtdGFiLm5pbmphLXN0YXRlLXNlbGVjdHtib3JkZXItbGVmdC1jb2xvcjojNjY2O2JvcmRlci1yaWdodC1jb2xvcjojNjY2fS5uaW5qYS1vYmplY3QtdGFiOmZpcnN0LWNoaWxkLm5pbmphLXN0YXRlLXNlbGVjdHtib3JkZXItbGVmdC1jb2xvcjojOTk5fS5uaW5qYS1vYmplY3QtdGFiOmxhc3QtY2hpbGQubmluamEtc3RhdGUtc2VsZWN0e2JvcmRlci1yaWdodC1jb2xvcjojOTk5fS5uaW5qYS1vYmplY3QtdHJheXtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZWVlOy13ZWJraXQtYm9yZGVyLXJhZGl1czowIDAgLjM1ZW0gLjM1ZW07LW1vei1ib3JkZXItcmFkaXVzOjAgMCAuMzVlbSAuMzVlbTtib3JkZXItcmFkaXVzOjAgMCAuMzVlbSAuMzVlbTtib3JkZXItdG9wLWNvbG9yOiM2NjY7cGFkZGluZzouMmVtIDFlbX0ubmluamEtc3RhdGUtcGxhY2Vob2xkZXJ7Y29sb3I6Izk5OX0ubmluamEtc3RhdGUtZGlzYWJsZXtjdXJzb3I6ZGVmYXVsdCFpbXBvcnRhbnR9'
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
        } else if ($object.is('.ninja-state-select') && !$object.is('.ninja-state-disable')) {
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
          $object.fadeTo('fast', 0.5).addClass('ninja-state-disable').trigger('disable.ninja');
        }
      });
    },

    enable: function (callback) {
      return this.each(function () {
        var $object = $(this).ninja();
        if ($.isFunction(callback)) {
          $object.bind('enable.ninja', callback);
        } else {
          $object.fadeTo('fast', 1).removeClass('ninja-state-disable').trigger('enable.ninja');
        }
      });
    },

    hint: function (options) {
      return this.each(function () {
        options = $.extend({}, defaults, options);
        var
          $object = $(this),
          $hint = $('<span/>', {
            'class': 'ninja-object-hint',
            css: $.extend(options.css, {
              minWidth: $object.width()
            }),
            html: options.html
          }),
          $stem = $('<svg class="ninja-object-stem" height="1" width="1" version="1.1" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g><polygon points="4,1 8,8 1,8" stroke-width="0"/><line x1="4" x2="0" y2="8"/><line x1="4" x2="8" y2="8"/></g></svg>').appendTo($hint);
        if (options.css) {
          $stem.find('g').css(options.css);
        }
        $object.bind({
          'focus.ninja mouseenter.ninja': function () {
            var offset = $object.offset();
            $hint.css({
              top: offset.top + $object.outerHeight() + 5
            }).appendTo('body');
            if (offset.left + $hint.outerWidth() > $(window).width()) {
              $hint.css({
                right: 0
              });
              $stem.css({
                right: ($object.outerWidth() / 2) - 4
              });
            } else {
              $hint.css({
                left: offset.left + (($object.outerWidth() - $hint.outerWidth()) / 2)
              });
              $stem.css({
                left: ($hint.outerWidth() / 2) - 4
              });
            }
          },
          'blur.ninja mouseleave.ninja select.ninja': function () {
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
            'class': 'ninja-object-list'
          }),
          offset = $object.offset(),
          scrollTop = $(window).scrollTop(),
          bottom = offset.top + $object.outerHeight(),
          right = offset.left + $object.outerWidth();
        if ($object.is('.ninja-object-autocomplete')) {
          $object.next('.ninja-object-autocomplete-spin').hide();
        }
        if (options.choices.length) {
          $object.bind({
            'delist.ninja': function () {
              $(document).unbind('click.ninja keydown.ninja keyup.ninja');
              $list.detach();
              if ($hover) {
                $hover.removeClass('ninja-state-hover');
              }
            }
          });
          $('body').append($list);
          if (bottom > (scrollTop + $(window).height())) {
            $list.css({
              bottom: $object.outerHeight()
            });
          } else {
            $list.css({
              top: bottom
            });
          }
          if (right > $(window).width()) {
            $list.css({
              right: right
            });
          } else {
            $list.css({
              left: offset.left
            });
          }
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
                    if ($hover.nextAll('.ninja-object-item').length) {
                      $hover.nextAll('.ninja-object-item:first').trigger('mouseenter.ninja');
                    } else {
                      $list.find('.ninja-object-item:first').trigger('mouseenter.ninja');
                    }
                  } else {
                    $list.find('.ninja-object-item:first').trigger('mouseenter.ninja');
                  }
                } else if (event.keyCode === 38 || (event.shiftKey && event.keyCode === 9)) {/* shift+tab or up arrow */
                  if ($hover) {
                    if ($hover.prevAll('.ninja-object-item').length) {
                      $hover.prevAll('.ninja-object-item:first').trigger('mouseenter.ninja');
                    } else {
                      $list.find('.ninja-object-item:last').trigger('mouseenter.ninja');
                    }
                  } else {
                    $list.find('.ninja-object-item:last').trigger('mouseenter.ninja');
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
                'class': 'ninja-object-rule'
              });
            } else {
              $choice = $('<button/>', {
                'class': 'ninja-object-item'
              });
              $choice.bind({
                'mouseleave.ninja': function () {
                  $hover.removeClass('ninja-state-hover');
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
                  $hover = $choice.addClass('ninja-state-hover');
                }
              });
            }
            $choice.html(choice.html || choice).appendTo($list);
          });
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
                  $object.addClass('ninja-state-placeholder');
                  if (value === '') {
                    $object.val(placeholder);
                  }
                }
              },
              'focus.ninja': function () {
                if ($object.val() === placeholder) {
                  $object.removeClass('ninja-state-placeholder').val('');
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
        } else if (!$object.is('.ninja-state-disable')) {
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
        $x,
        $spin = $('<span/>', {
          'class': 'ninja-object-autocomplete-spin'
        }),
        $input = $('<input/>', {
          'class': 'ninja-object-autocomplete',
          type: 'text'
        }).bind({
          'keyup.ninja': function (event) {
            clearTimeout(timer);
            if ($.inArray(event.keyCode, [9, 13, 27, 37, 38, 39, 40]) === -1 && $input.val() !== '') {/* not tab, return, escape, left , up, right or down */
              timer = setTimeout(function () {
                if ($input.next('.ninja-object-autocomplete-spin').is(':hidden')) {
                  $spin.show();
                } else {
                  $spin.html($.ninja.icon({
                    name: 'spin'
                  }));
                  $input.after($spin);
                }
                $input.source();
              }, 1000);
            }
          },
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
        });
      $x = $.ninja.icon({
        name: 'x'
      }).bind('click.ninja', function () {
        $input.val('').focus();
        $x.css({
          visibility: 'hidden'
        });
      });
      if (options.placeholder) {
        $input.ninja().placeholder(options.placeholder);
      }
      return $input.ninja();
    },

    button: function (options) {
      options = $.extend({}, defaults, options);
      var $button = $('<button/>', {
        'class': 'ninja-object-button',
        css: options.css,
        html: options.html
      });
      $button.bind({
        'click.ninja': function (event) {
          if (!$button.is('.ninja-state-disable')) {
            if ($button.is('.ninja-state-select')) {
              $button.trigger('deselect.ninja');
            } else {
              $button.trigger('select.ninja');
            }
          }
          event.stopImmediatePropagation();
        },
        'deselect.ninja': function () {
          $button.removeClass('ninja-state-select');
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
          $button.addClass('ninja-state-select');
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
          'class': 'ninja-object-dialog',
          css: options.css,
          html: options.html
        }),
        $button = $.ninja.icon({
          name: 'X'
        }).bind('click.ninja', function () {
          $dialog.detach();
        }).appendTo($dialog),
        $blocker = $('<div/>', {
          'class': 'ninja-object-blocker'
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
          'class': 'ninja-object-drawer',
          css: options.css
        }),
        $tray = $('<div/>', {
          'class': 'ninja-object-tray',
          html: options.html
        }).appendTo($drawer),
        $arrowDown = $.ninja.icon({
          name: 'drawer-select'
        }),
        $arrowRight = $.ninja.icon({
          name: 'drawer'
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
      if ($.inArray(options.name, ['drawer', 'drawer-select']) > -1) {
        if (options.name === 'drawer-select') {
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
      } else if (options.name === 'go') {
        g = '<circle' + border + ' cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="5"/>';
      } else if (options.name === 'home') {
        g = '<polygon points="0,10 0,8 8,0 16,8 16,10 14,10 14,16 10,16 10,10 6,10 6,16 2,16 2,10"/><rect x="11" y="16" width="4" height="8"/>';
      } else if (options.name === 'mail') {
        g = '<polygon points="0,2 8,10 16,2"/><polygon points="16,4 12,8 16,12"/><polygon points="0,14 5,9 8,12 11,9 16,14"/><polygon points="0,4 4,8 0,12"/>';
      } else if (options.name === 'menu') {
        g = '<polygon points="5,7 8,2 11,7"/><polygon points="5,9 8,14 11,9"/>';
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
      $icon = $('<svg aria-label="' + options.name + '" class="ninja-object-icon" height="1" width="1"' + onload + ' role="img" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>' + options.name + '</title>' + defs + '<g id="' + idVector + '" stroke-width="0">' + g + '</g></svg>');
      if (options.css) {
        $icon.find('g').css(options.css);
      }
      return $icon;
    },

    menu: function (options) {
      options = $.extend({}, defaults, options);
      var $menu = $.ninja.button($.extend({}, options, {
        html: options.html
      })).addClass('ninja-object-menu').append($.ninja.icon({
        name: 'menu'
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
          'class': 'ninja-object-rating'
        }).bind({
          'mouseleave.ninja': function () {
            $rating.find('.ninja-object-star').each(function (ii, star) {
              var $star = $(star);
              if (options.select === 0) {
                if (ii < options.average) {
                  $star.addClass('ninja-state-average');
                } else {
                  $star.removeClass('ninja-state-average');
                }
              }
              if (ii < options.select) {
                $star.addClass('ninja-state-individual');
              } else {
                $star.removeClass('ninja-state-individual');
              }
            });
          }
        });
      for (i = 0; i < options.stars; i++) {
        $('<button/>', {
          'class': 'ninja-object-star',
          html: $.ninja.icon({
            'name': 'star'
          })
        }).appendTo($rating);
      }
      $rating.find('.ninja-object-star').each(function (i, star) {
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
            $rating.find('.ninja-object-star').each(function (ii, star) {
              var $star = $(star).removeClass('ninja-state-average');
              if (ii < i) {
                $star.addClass('ninja-state-individual');
              } else {
                $star.removeClass('ninja-state-individual');
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
          'class': 'ninja-object-slider-choice',
          html: options.choices[options.slot].html
        }),
        $button = $('<button/>', {
          'class': 'ninja-object-slider-button',
          css: { left: left }
        }),
        trackWidth = options.width + 18,
        $level = $('<div/>', {
          'class': 'ninja-object-slider-level',
          css: { width: left }
        }),
        $slider = $('<span/>', {
          'class': 'ninja-object-slider'
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
          'class': 'ninja-object-slider-track',
          css: { width: trackWidth }
        }).appendTo($slider),
        $groove = $('<div/>', {
          'class': 'ninja-object-slider-groove'
        }).bind('click.ninja', function (event) {
          $button.trigger({
            type: 'select.ninja',
            sliderX: Math.round((event.pageX - $track.offset().left) / increment)
          });
        });
      $track.append($groove.append($level), $button);
      if (options.title) {
        $choice.before($('<span/>', {
          'class': 'ninja-object-slider-title',
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
          $button.addClass('ninja-state-select');
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
              $button.removeClass('ninja-state-select');
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
          $button.removeClass('ninja-state-select').trigger({
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
        $tabs.addClass('ninja-object-tabs-vertical');
      } else {
        $tabs.addClass('ninja-object-tabs-horizontal');
      }
      $.each(options.choices, function (i, choice) {
        var $tab = $('<button/>', {
          'class': 'ninja-object-tab',
          css: options.css,
          html: choice.html || choice
        }).bind({
          'click.ninja': function () {
            if (!$tab.is('.ninja-state-disable') && !$tab.is('.ninja-state-select')) {
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
            $tabs.children().not($tab).removeClass('ninja-state-select');
            $tab.addClass('ninja-state-select');
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

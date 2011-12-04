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
    href: 'data:text/css;base64,Lm5pbmphLW9iamVjdC1hdXRvY29tcGxldGV7cG9zaXRpb246cmVsYXRpdmV9Lm5pbmphLW9iamVjdC1hdXRvY29tcGxldGUgLm5pbmphLW9iamVjdC1pY29uW2FyaWEtbGFiZWw9c3Bpbl17cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LTIwcHg7dG9wOjFweH0ubmluamEtb2JqZWN0LWF1dG9jb21wbGV0ZSAubmluamEtb2JqZWN0LWljb25bYXJpYS1sYWJlbD1zcGluXSBne2ZpbGw6Izk5OSFpbXBvcnRhbnR9Lm5pbmphLW9iamVjdC1ibG9ja2Vye2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuNSk7bGVmdDowO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3dpZHRoOjEwMCV9Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC1pdGVtLm5pbmphLXN0YXRlLWhvdmVyLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWJ1dHRvbiwubmluamEtb2JqZWN0LXNsaWRlci1sZXZlbCwubmluamEtb2JqZWN0LXRhYntiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtZ3JhZGllbnQobGluZWFyLGxlZnQgdG9wLGxlZnQgYm90dG9tLGNvbG9yc3RvcCgwLHJnYmEoMjU1LDI1NSwyNTUsLjIpKSxjb2xvcnN0b3AoMC41LHJnYmEoMjU1LDI1NSwyNTUsMCkpLGNvbG9yc3RvcCgwLjUscmdiYSgwLDAsMCwwKSksY29sb3JzdG9wKDEscmdiYSgwLDAsMCwuMSkpKTtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW1vei1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMjU1LDI1NSwyNTUsLjIpIDAscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgwLDAsMCwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbXMtbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6LW8tbGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRvcCxyZ2JhKDI1NSwyNTUsMjU1LC4yKSAwLHJnYmEoMjU1LDI1NSwyNTUsMCkgNTAlLHJnYmEoMCwwLDAsMCkgNTAlLHJnYmEoMCwwLDAsLjEpIDEwMCUpO2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvclN0cj0ncmdiYSgyNTUsIDI1NSwgMjU1LCAuMiknLEVuZENvbG9yU3RyPSdyZ2JhKDAsMCwwLC4xKScpO3Bvc2l0aW9uOnJlbGF0aXZlfS5uaW5qYS1vYmplY3QtYnV0dG9uLC5uaW5qYS1vYmplY3QtaXRlbSwubmluamEtb2JqZWN0LXRhYntsaW5lLWhlaWdodDoxZW07cGFkZGluZzouMmVtIDFlbTt0ZXh0LXNoYWRvdzowIDFweCAwICNmZmZ9Lm5pbmphLW9iamVjdC1idXR0b246aG92ZXIsLm5pbmphLW9iamVjdC1pdGVtLm5pbmphLXN0YXRlLWhvdmVyLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWJ1dHRvbiwubmluamEtb2JqZWN0LXNsaWRlci1ncm9vdmUsLm5pbmphLW9iamVjdC1zdGFyOmhvdmVyLC5uaW5qYS1vYmplY3QtdGFiOmhvdmVye2N1cnNvcjpwb2ludGVyfS5uaW5qYS1vYmplY3QtYnV0dG9uLC5uaW5qYS1vYmplY3QtbGlzdCwubmluamEtb2JqZWN0LWRpYWxvZywubmluamEtb2JqZWN0LWhpbnQsLm5pbmphLW9iamVjdC1zbGlkZXItYnV0dG9uLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtb2JqZWN0LXNsaWRlci1sZXZlbCwubmluamEtb2JqZWN0LXRhYiwubmluamEtb2JqZWN0LXRyYXl7LXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7LW1vei1iYWNrZ3JvdW5kLWNsaXA6cGFkZGluZztiYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3h9Lm5pbmphLW9iamVjdC1idXR0b24sLm5pbmphLW9iamVjdC1saXN0LC5uaW5qYS1vYmplY3QtZGlhbG9nLC5uaW5qYS1vYmplY3QtaGludCwubmluamEtb2JqZWN0LXNsaWRlci1idXR0b24sLm5pbmphLW9iamVjdC1zbGlkZXItZ3Jvb3ZlLC5uaW5qYS1vYmplY3QtdGFiLC5uaW5qYS1vYmplY3QtdHJheXtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7Ym9yZGVyOjFweCBzb2xpZCAjNjY2fS5uaW5qYS1vYmplY3QtYnV0dG9uLC5uaW5qYS1vYmplY3QtbGlzdCwubmluamEtb2JqZWN0LWRpYWxvZywubmluamEtb2JqZWN0LWhpbnR7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi40ZW07LW1vei1ib3JkZXItcmFkaXVzOi40ZW07Ym9yZGVyLXJhZGl1czouNGVtfS5uaW5qYS1vYmplY3QtYnV0dG9uLC5uaW5qYS1vYmplY3QtaXRlbSwubmluamEtb2JqZWN0LXNsaWRlci1idXR0b24sLm5pbmphLW9iamVjdC1zdGFyLC5uaW5qYS1vYmplY3QtdGFie21hcmdpbjowO291dGxpbmUtd2lkdGg6MXB4fS5uaW5qYS1vYmplY3QtYnV0dG9uLC5uaW5qYS1vYmplY3QtdGFie3RleHQtYWxpZ246Y2VudGVyfS5uaW5qYS1vYmplY3QtYnV0dG9uIC5uaW5qYS1vYmplY3QtaWNvbiwubmluamEtb2JqZWN0LWl0ZW0gLm5pbmphLW9iamVjdC1pY29uLC5uaW5qYS1vYmplY3QtdGFiIC5uaW5qYS1vYmplY3QtaWNvbnt2ZXJ0aWNhbC1hbGlnbjpib3R0b219Lm5pbmphLW9iamVjdC1kaWFsb2csLm5pbmphLW9iamVjdC1oaW50e3BhZGRpbmc6LjZlbX0ubmluamEtb2JqZWN0LWRpYWxvZyAubmluamEtb2JqZWN0LWljb25bYXJpYS1sYWJlbD1YXXtjdXJzb3I6cG9pbnRlcjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDotMTFweDt0b3A6LTExcHh9Lm5pbmphLW9iamVjdC1kcmF3ZXIgLm5pbmphLW9iamVjdC1idXR0b257ZGlzcGxheTpibG9jaztwYWRkaW5nLWxlZnQ6MDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAwJX0ubmluamEtb2JqZWN0LWRyYXdlciAubmluamEtb2JqZWN0LWJ1dHRvbi5uaW5qYS1zdGF0ZS1zZWxlY3R7LXdlYmtpdC1ib3JkZXItcmFkaXVzOi4zNWVtIC4zNWVtIDAgMDstbW96LWJvcmRlci1yYWRpdXM6LjM1ZW0gLjM1ZW0gMCAwO2JvcmRlci1yYWRpdXM6LjM1ZW0gLjM1ZW0gMCAwfS5uaW5qYS1vYmplY3QtaGludHt3aGl0ZS1zcGFjZTpub3dyYXB9Lm5pbmphLW9iamVjdC1pY29ue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoxZW07dmVydGljYWwtYWxpZ246bWlkZGxlO3dpZHRoOjFlbX0ubmluamEtb2JqZWN0LWljb24gZ3tmaWxsOiMzMzM7c3Ryb2tlOiMwMDB9Lm5pbmphLW9iamVjdC1pY29uW2FyaWEtbGFiZWw9WF17aGVpZ2h0OjIycHg7d2lkdGg6MjJweH0ubmluamEtb2JqZWN0LWljb25bYXJpYS1sYWJlbD1YXSBjaXJjbGV7c3Ryb2tlOiM5OTk7c3Ryb2tlLXdpZHRoOjF9Lm5pbmphLW9iamVjdC1pY29uW2FyaWEtbGFiZWw9WF0gcG9seWdvbntmaWxsOiNmZmZ9Lm5pbmphLW9iamVjdC1pbnB1dHtwYWRkaW5nLXJpZ2h0OjIwcHh9Lm5pbmphLW9iamVjdC1pdGVtLm5pbmphLXN0YXRlLWhvdmVyLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtc3RhdGUtc2VsZWN0e2JhY2tncm91bmQtY29sb3I6Izk5OX0ubmluamEtb2JqZWN0LWl0ZW0ubmluamEtc3RhdGUtaG92ZXIsLm5pbmphLXN0YXRlLXNlbGVjdHtjb2xvcjojZmZmO3RleHQtc2hhZG93OjAgMXB4IDAgIzY2Nn0ubmluamEtb2JqZWN0LWl0ZW0ubmluamEtc3RhdGUtaG92ZXIgZywubmluamEtc3RhdGUtc2VsZWN0IGd7ZmlsbDojZmZmO3N0cm9rZTojZmZmfS5uaW5qYS1vYmplY3QtaXRlbXtiYWNrZ3JvdW5kOjA7Ym9yZGVyOjA7ZGlzcGxheTpibG9jazt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6MTAwJX0ubmluamEtb2JqZWN0LW1lbnUubmluamEtb2JqZWN0LWJ1dHRvbntwYWRkaW5nLXJpZ2h0OjB9Lm5pbmphLW9iamVjdC1tZW51IFthcmlhLWxhYmVsPW1lbnVde21hcmdpbi1sZWZ0OjFlbX0ubmluamEtb2JqZWN0LWxpc3QsLm5pbmphLW9iamVjdC1kaWFsb2csLm5pbmphLW9iamVjdC1oaW50e2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwuODUpO2JvcmRlcjoxcHggc29saWQgI2NjYzstd2Via2l0LWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7LW1vei1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1tcy1ib3gtc2hhZG93OjAgLjJlbSAuNGVtIHJnYmEoMCwwLDAsLjUpOy1vLWJveC1zaGFkb3c6MCAuMmVtIC40ZW0gcmdiYSgwLDAsMCwuNSk7Ym94LXNoYWRvdzowIC4yZW0gLjRlbSByZ2JhKDAsMCwwLC41KTtwYWRkaW5nOi42ZW07cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDorMX0ubmluamEtb2JqZWN0LWxpc3R7cGFkZGluZzouNmVtIDA7dGV4dC1hbGlnbjpsZWZ0fS5uaW5qYS1vYmplY3QtcnVsZXtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlO2JvcmRlci10b3A6MXB4IHNvbGlkICNjY2M7bWFyZ2luOi40ZW0gMH0ubmluamEtb2JqZWN0LXNsaWRlcntkaXNwbGF5OmlubGluZS1ibG9ja30ubmluamEtb2JqZWN0LXNsaWRlci1idXR0b24sLm5pbmphLW9iamVjdC1zbGlkZXItZ3Jvb3ZlLC5uaW5qYS1vYmplY3Qtc2xpZGVyLWxldmVsey13ZWJraXQtYm9yZGVyLXJhZGl1czo5cHg7LW1vei1ib3JkZXItcmFkaXVzOjlweDtib3JkZXItcmFkaXVzOjlweH0ubmluamEtb2JqZWN0LXNsaWRlci1idXR0b257aGVpZ2h0OjE4cHg7bGVmdDowO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxOHB4fS5uaW5qYS1vYmplY3Qtc2xpZGVyLWJ1dHRvbi5uaW5qYS1zdGF0ZS1zZWxlY3R7YmFja2dyb3VuZC1jb2xvcjojY2NjfS5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtb2JqZWN0LXNsaWRlci1sZXZlbHtoZWlnaHQ6NHB4fS5uaW5qYS1vYmplY3Qtc2xpZGVyLWdyb292ZSwubmluamEtc3RhdGUtc2VsZWN0e2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1ncmFkaWVudChsaW5lYXIsbGVmdCB0b3AsbGVmdCBib3R0b20sY29sb3JzdG9wKDAscmdiYSgwLDAsMCwuMykpLGNvbG9yc3RvcCgwLjUscmdiYSgwLDAsMCwwKSksY29sb3JzdG9wKDAuNSxyZ2JhKDI1NSwyNTUsMjU1LDApKSxjb2xvcnN0b3AoMSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSkpO2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotbW96LWxpbmVhci1ncmFkaWVudCh0b3AscmdiYSgwLDAsMCwuMykgMCxyZ2JhKDAsMCwwLDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LDApIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xKSAxMDAlKTtiYWNrZ3JvdW5kLWltYWdlOi1tcy1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTotby1saW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodG9wLHJnYmEoMCwwLDAsLjMpIDAscmdiYSgwLDAsMCwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwwKSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMSkgMTAwJSk7ZmlsdGVyOnByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChzdGFydENvbG9yU3RyPSdyZ2JhKDAsIDAsIDAsIC4yKScsRW5kQ29sb3JTdHI9J3JnYmEoMjU1LDI1NSwyNTUsLjEpJyl9Lm5pbmphLW9iamVjdC1zbGlkZXItZ3Jvb3Zle2N1cnNvcjpwb2ludGVyO2xlZnQ6OXB4O3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjlweDt0b3A6NXB4fS5uaW5qYS1vYmplY3Qtc2xpZGVyLWxldmVse2JhY2tncm91bmQtY29sb3I6IzZjZn0ubmluamEtb2JqZWN0LXNsaWRlci10aXRsZXtmb250LXdlaWdodDo3MDB9Lm5pbmphLW9iamVjdC1zbGlkZXItdHJhY2t7aGVpZ2h0OjE4cHg7cG9zaXRpb246cmVsYXRpdmV9Lm5pbmphLW9iamVjdC1zdGFye2JhY2tncm91bmQ6MDtib3JkZXI6MDttYXJnaW4tcmlnaHQ6MXB4O3BhZGRpbmc6MH0ubmluamEtb2JqZWN0LXN0YXIgLm5pbmphLW9iamVjdC1pY29ue2hlaWdodDoxOHB4O3dpZHRoOjE4cHh9Lm5pbmphLW9iamVjdC1zdGFyIGd7ZmlsbDojZWVlO3N0cm9rZTojY2NjO3N0cm9rZS13aWR0aDoxfS5uaW5qYS1vYmplY3Qtc3Rhci5uaW5qYS1zdGF0ZS1hdmVyYWdlIGd7ZmlsbDojNmNmO3N0cm9rZTojMzljfS5uaW5qYS1vYmplY3Qtc3Rhci5uaW5qYS1zdGF0ZS1pbmRpdmlkdWFsIGd7ZmlsbDojYzk2O3N0cm9rZTojOTYzfS5uaW5qYS1vYmplY3Qtc3RlbXtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6OHB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDotOHB4O3dpZHRoOjhweH0ubmluamEtb2JqZWN0LXN0ZW0gZ3tmaWxsOnJnYmEoMjU1LDI1NSwyNTUsLjg1KTtzdHJva2U6I2NjY30ubmluamEtb2JqZWN0LXRhYnMtaG9yaXpvbnRhbCwubmluamEtb2JqZWN0LXRhYnMtdmVydGljYWx7d2hpdGUtc3BhY2U6bm93cmFwfS5uaW5qYS1vYmplY3QtdGFicy1ob3Jpem9udGFse2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5uaW5qYS1vYmplY3QtdGFicy12ZXJ0aWNhbCAubmluamEtb2JqZWN0LXRhYntkaXNwbGF5OmJsb2NrfS5uaW5qYS1vYmplY3QtdGFie2JvcmRlci1sZWZ0LWNvbG9yOiNjY2N9Lm5pbmphLW9iamVjdC10YWI6Zmlyc3QtY2hpbGR7Ym9yZGVyLWxlZnQtY29sb3I6Izk5OTstd2Via2l0LWJvcmRlci1yYWRpdXM6LjM1ZW0gMCAwIC4zNWVtOy1tb3otYm9yZGVyLXJhZGl1czouMzVlbSAwIDAgLjM1ZW07Ym9yZGVyLXJhZGl1czouMzVlbSAwIDAgLjM1ZW19Lm5pbmphLW9iamVjdC10YWI6bGFzdC1jaGlsZHtib3JkZXItcmlnaHQtY29sb3I6Izk5OTstd2Via2l0LWJvcmRlci1yYWRpdXM6MCAuMzVlbSAuMzVlbSAwOy1tb3otYm9yZGVyLXJhZGl1czowIC4zNWVtIC4zNWVtIDA7Ym9yZGVyLXJhZGl1czowIC4zNWVtIC4zNWVtIDB9Lm5pbmphLW9iamVjdC10YWIubmluamEtc3RhdGUtc2VsZWN0e2JvcmRlci1sZWZ0LWNvbG9yOiM2NjY7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM2NjZ9Lm5pbmphLW9iamVjdC10YWI6Zmlyc3QtY2hpbGQubmluamEtc3RhdGUtc2VsZWN0e2JvcmRlci1sZWZ0LWNvbG9yOiM5OTl9Lm5pbmphLW9iamVjdC10YWI6bGFzdC1jaGlsZC5uaW5qYS1zdGF0ZS1zZWxlY3R7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM5OTl9Lm5pbmphLW9iamVjdC10cmF5e2JvcmRlcjoxcHggc29saWQgI2NjYztib3JkZXItYm90dG9tLWNvbG9yOiNlZWU7LXdlYmtpdC1ib3JkZXItcmFkaXVzOjAgMCAuMzVlbSAuMzVlbTstbW96LWJvcmRlci1yYWRpdXM6MCAwIC4zNWVtIC4zNWVtO2JvcmRlci1yYWRpdXM6MCAwIC4zNWVtIC4zNWVtO2JvcmRlci10b3AtY29sb3I6IzY2NjtwYWRkaW5nOi4yZW0gMWVtfS5uaW5qYS1zdGF0ZS1wbGFjZWhvbGRlcntjb2xvcjojOTk5fS5uaW5qYS1zdGF0ZS1kaXNhYmxle2N1cnNvcjpkZWZhdWx0IWltcG9ydGFudH0='
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
            css: options.css,
            html: options.html
          }),
          $stem = $('<svg class="ninja-object-stem" height="1" width="1" version="1.1" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><g><polygon points="4,1 8,8 1,8" stroke-width="0"/><line x1="4" x2="0" y2="8"/><line x1="4" x2="8" y2="8"/></g></svg>').appendTo($hint);
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
            'class': 'ninja-object-list'
          });
        if ($object.is('.ninja-object-autocomplete')) {
          $object.find('.ninja-object-icon[aria-label=spin]').hide();
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
        $autocomplete = $('<span/>', {
          'class': 'ninja-object-autocomplete'
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
          'class': 'ninja-object-input',
          type: 'text'
        }).bind({
          'keyup.ninja': function (event) {
            clearTimeout(timer);
            if ($.inArray(event.keyCode, [9, 13, 27, 37, 38, 39, 40]) === -1 && $input.val() !== '') {/* not tab, return, escape, left , up, right or down */
              timer = setTimeout(function () {
                var $spin = $autocomplete.find('.ninja-object-icon[aria-label=spin]');
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

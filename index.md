---
title: Ninja UI
layout: default
---

##About<small>忍者 UI</small><img alt="bonsai" class="sectionImage" src="/img/about.png">

<div class="row">
  <div class="one-third column">
    <h3>Intuitive</h3>
    <p>Clear syntax, extending what you already know and love about jQuery.</p>
    <h3>Usable</h3>
    <p>Keyboard, touch and speech accessible.</p>
    <h3>Fast</h3>
    <p>26k JavaScript file with <strong>no network connections</strong> to vector icons and encoded styles.</p>
  </div>
  <div class="one-third column">
    <h3>Compatible</h3>
    <p>Ninja UI works with jQuery versions back to 1.4.3 and built for today's browsers: Chrome, Safari, Firefox, Internet Explorer*, and Opera.</p>
    <img src="/img/browsers.png" alt="Chrome, Safari, Firefox, Internet Explorer, and Opera">
    <p><small>* Internet Explorer versions less than 9 will offer to install Google Chrome Frame. If declined, Ninja UI will function, though without icons or rounded corners.</small></p>
  </div>
  <div class="one-third column">
    <h3>Source Code</h3>
    <p>
      <a href="https://github.com/ninja/ui/">Github repository</a>
      <span id="githubWatchers">· <span id="githubWatchersCount"></span> watchers</span>
    </p>
    <h3>Announcements</h3>
    <p>
      <a href="http://twitter.com/ninjaui" class="twitter-follow-button">Follow @ninjaui</a>
    </p>
    <h3>Authors</h3>
    <p>Jamie R. Hoover and Faisal N. Jawdat</p>
  </div>
</div>

##Usage<small>Getting Started</small><img alt="bonsai" class="sectionImage" src="/img/usage.png"/>

Mark a position where you want to have a Ninja button.

    <body>
      ...
      <div id="usageButton"></div>
      ...

Load the Ninja UI plugin, after jQuery of course.

      <script src="//code.jquery.com/jquery-1.7.1.min.js"></script>
      <script src="//ninjaui.com/cdn/1.0.0rc1/jquery.ninjaui.min.js"></script>

Create the Ninja button and dialog as a variables before the document finishes loading.

      <script>
        (function ($) {
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

When the document is ready, append the Ninja button.

          $(document).ready(function () {
            $('#usageButton').append($ninjaButton.fadeIn());
          });
        }(jQuery));
      </script>
    </body>

The Ninja button is ready for action! -> <span id="usageButton"> </span>

###Wait...don't I have to learn some complicated html patterns that will redraw and flash as the page loads?
Nope. :)

<div id="examples">

<h2>Examples<small>Documentation</small><img alt="kakejiku" class="sectionImage" src="/img/examples.png"/></h2>

<h3 id="autocomplete">Autocomplete</h3>

<div class="row">
  <div class="one-third column" id="autocompleteExamples">
    <h4>Options:</h4>
    <ul>
      <li>css</li>
      <li>placeholder</li>
    </ul>
    <h4>Callbacks:</h4>
    <ul>
      <li>list()</li>
      <ul>
        <li>choices</li>
        <li>query</li>
      </ul>
      <li>source(event.query)</li>
    </ul>
  </div>
  <div class="two-thirds column">
<pre>
var $autocompleteExample = $.ninja.autocomplete({
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
});
</pre>
</div>
</div>

<h3 id="button">Button<small> </small></h3>

<div class="row">
<div class="one-third column" id="buttonExamples">
  <h4>Options:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <h4>Callbacks:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="two-thirds column">
<pre>
var
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
    html: '&lt;i>Selected&lt;/i> Button',
    select: true
  }),

  $buttonExampleDisabled = $.ninja.button({
    html: '&lt;i>Disabled&lt;/i> Button',
    disable: true
  });

$buttonExampleCheckboxSelect = $('&lt;input/>', {
  type: 'checkbox'
}).change(function () {
  if ($buttonExampleCheckboxSelect.attr('checked')) {
    $buttonExample.select();
  } else {
    $buttonExample.deselect();
  }
});

$buttonExampleCheckboxDisable = $('&lt;input/>', {
  type: 'checkbox'
}).change(function () {
  if ($buttonExampleCheckboxDisable.attr('checked')) {
    $buttonExample.disable();
  } else {
    $buttonExample.enable();
  }
});
</pre>
</div>
</div>

<h3 id="dialog">Dialog<small> </small></h3>

<div class="row">
<div class="one-third column" id="dialogExamples">
  <h4>Options:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <h4>Callbacks:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="two-thirds column">
<pre>
var
  $dialogExampleCheckbox,

  $dialogExample = $.ninja.dialog({
    html: '&lt;div style="padding: 50px">This is &lt;b>HTML&lt;/b> inside the dialog.&lt;/div>'
  }).attach(function () {
    $dialogExampleCheckbox.attr({
      checked: 'checked'
    });
  }).detach(function () {
    $dialogExampleCheckbox.attr({
      checked: false
    });
  });

$dialogExampleCheckbox = $('&lt;input/>', {
  type: 'checkbox'
}).change(function () {
  if ($dialogExampleCheckbox.attr('checked')) {
    $dialogExample.attach();
  } else {
    $dialogExample.detach();
  }
});
</pre>
</div>
</div>

<h3 id="drawer">Drawer<small> </small></h3>

<div class="row">
<div class="one-third column" id="drawerExamples">
  <h4>Options:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <h4>Callbacks:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="two-thirds column">
<pre>
$.ninja.({});
</pre>
</div>
</div>

<h3 id="icons">Icons<small> </small></h3>

<div class="row">
<div class="one-third column" id="iconExamples">
  <h4>Options:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <h4>Callbacks:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="two-thirds column">
<pre>
$.ninja.({});
</pre>
</div>
</div>

<h3 id="slider">Slider<small> </small></h3>

<div class="row">
<div class="one-third column" id="sliderExamples">
  <h4>Options:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <h4>Callbacks:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="two-thirds column">
<pre>
$.ninja.({});
</pre>
</div>
</div>

<h3 id="tabs">Tabs<small> </small></h3>

<div class="row">
<div class="one-third column" id="tabsExamples">
  <h4>Options:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <h4>Callbacks:</h4>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
<div class="two-thirds column">
<pre>
$.ninja.({});
</pre>
</div>
</div>
</div>

##Themes<small>Premade or Build Your Own</small><img alt="kimono" class="sectionImage" src="/img/themes.png"/>

Dojo

<div class="ninja-themes-dojo"> </div>

Neon



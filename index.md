---
title: Ninja UI
layout: default
---


##About<small>忍者 UI</small><img alt="bonsai" class="sectionImage" src="/img/about.png">

<div class="row">
  <div class="one-third column">
    <h3>Intuitive</h3>
    <p>Clear syntax, extending what you already know and love about jQuery.</p>
    <h3>Fast</h3>
    <p>Single network connection to a 25k JavaScript file with vector icons and encoded styles.</p>
    <h3>Usable</h3>
    <p>Keyboard, touch and speech accessible.</p>
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
  <div class="one-third column">
    <h3>Support</h3>
    <img src="/img/browsers.png" alt="Chrome, Safari, Firefox, Internet Explorer, and Opera">
    <p>Ninja UI is built for today's browsers: Chrome, Safari, Firefox, Internet Explorer *, and Opera while compatible with all jQuery versions back to 1.4.3.</p>
    <p><small>* Versions of Internet Explorer less than 9 will automatically offer to install Google Chrome Frame. If declined, Ninja UI will function without icons or rounded corners.</small></p>
  </div>
</div>

##Usage<small>Getting Started</small><img alt="bonsai" class="sectionImage" src="/img/usage.png"/>

Load jQuery, then  Ninja UI.

    <div id="usageButton"></div>

    <script src="//code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="//ninjaui.com/cdn/1.0.0rc1/jquery.ninjaui.min.js"></script>

Store Ninja UI objects as variables at runtime.

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

Insert them into the DOM when it's ready.

        $(document).ready(function () {

          $('#usageButton').append($ninjaButton.fadeIn());

        });

      }(jQuery));
    </script>

<div id="usageButton"> </div>

####Wait... don't I have to learn some complicated html patterns that will redraw and flash as the page loads?
Nope.

<div id="examples"> </div>

##Autocomplete<small>Finish What They Begin</small>

    $.ninja.autocomplete({
      remote: function () {
        $.ajax
      }
    });

##Button<small> </small>

##Dialog<small> </small>

##Drawer<small> </small>

##Icons<small> </small>

##Slider<small> </small>

##Tabs<small> </small>

##Themes<small>Premade or Roll Your Own</small><img alt="kimono" class="sectionImage" src="/img/themes.png"/>

Dojo

<div class="ninja-themes-dojo"> </div>

Neon



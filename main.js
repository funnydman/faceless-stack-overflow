// ==UserScript==
// @name         Faceless Stack overflow
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
   if (location.href.match("https://stackoverflow.com")) {
     // find the elements and disable them
     var user_box = document.getElementsByClassName("user-info");
     for (var i=0; i < user_box.length; i++) {
         user_box[i].style.display = "none";
     }
   }
})();

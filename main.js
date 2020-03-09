// ==UserScript==
// @name         Faceless Stack overflow
// @namespace    http://tampermonkey.net/
// @version      0.4
// @author       You
// @match        https://stackoverflow.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// user block we could display none. It's faster!

function make_comments_anonymous(comments) {
    for (var j=0; j < comments.length; j++) {
        comments[j].innerText = "anonymous";
        comments[j].style.color = "green";
        comments[j].removeAttribute("href");
    }
}

function sanitize_user_mention(comment_copy) {
    var regexp = /@\w+/;
    for (var k=0; k < comment_copy.length; k ++) {
        comment_copy[k].textContent = comment_copy[k].textContent.replace(regexp, "@anonymous");
    }
}

(function() {
    'use strict';

    (document.head || document.documentElement).insertAdjacentHTML(
        'beforeend',
        '<style>.user-gravatar32, .user-details { display: none!important; }</style>'
    );

    window.onload = function () {
        var comment_copy = document.getElementsByClassName("comment-copy");
        var user_comments = document.getElementsByClassName("comment-user");

        make_comments_anonymous(user_comments);
        sanitize_user_mention(comment_copy);
        // user MutationObserver here
        var show_comments_link = document.getElementsByClassName("js-show-link");
        for (var k=0; k < show_comments_link.length; k++) {
            show_comments_link[k].addEventListener("click", function(event) {
                setInterval(function (e) {
                    make_comments_anonymous(user_comments);
                    sanitize_user_mention(comment_copy);
                }, 0);
            });
        }
    }
})();

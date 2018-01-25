// ==UserScript==
// @name         Kahoot++
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.1.5
// @description  Improvements to Kahoot
// @author       Evan Young (@Bowser65)
// @match        https://kahoot.it/*
// @grant        none
// ==/UserScript==

const varColor = '#003366'

function wait () {
  if (window.$ === undefined || document.getElementsByClassName('join-view__bg')[0] === undefined) {
    setTimeout(wait, 100)
  } else {
    $('head').append(`
      <style>
      .animated-background, .join-view__bg, .intro.get-ready {
        background-color: ${varColor} !important;
        animation: none !important;
      }
      
      .logo-container {
        margin-top: none !important;
      }
      
      .intro.get-ready .counter {
        background-color: ${varColor} !important;
      }
      
      .vertical-alignment-wrapper__bottom {
        display: none !important;
      }
      </style>
    `)
  }
}
  
(() => {
  wait()
})()

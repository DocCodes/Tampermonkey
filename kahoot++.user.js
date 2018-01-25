// ==UserScript==
// @name         Kahoot++
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.2.2
// @description  Improvements to Kahoot
// @author       Evan Young (@Bowser65)
// @match        https://kahoot.it/*
// @grant        none
// ==/UserScript==

(() => {
  const varColor = '#003366'
  
  document.title = 'Kahoot++'
  document.head.innerHTML += `
    <style>
      .animated-background, .join-view__bg, .intro.get-ready {
        background-color: ${varColor} !important;
        animation: none !important;
      }
  
      .logo-container {
        padding-top: 0px !important;
      }
  
      .intro.get-ready .counter {
        background-color: ${varColor} !important;
      }
  
      .vertical-alignment-wrapper__bottom {
        display: none !important;
      }
  </style>
  `
})()

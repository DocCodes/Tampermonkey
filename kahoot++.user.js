// ==UserScript==
// @name         Kahoot++
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.3.0
// @description  Improvements to Kahoot
// @author       Evan Young (@Bowser65)
// @match        https://kahoot.it/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

function addStyle () {
  const varColor = GM_getValue('color', '') ? GM_getValue('color', '') : '#003366'

  document.head.innerHTML += `
    <style data-from="hakoot">
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

      .counter-background,
      .bonus-badge-wrapper.bonus-badge-wrapper--streak-bonus-level-text,
      .status-bar__game-pin {
        display: none !important;
      }
  </style>
  `
}
function removeStyle () {
  $('[data-from]').remove()
}

(() => {
  addStyle()

  GM_registerMenuCommand('Set Color', () => {
    const color = window.prompt('Set Your Background Color')
    if (color) {
      GM_setValue('color', color);
    }
  }, 't');
})()

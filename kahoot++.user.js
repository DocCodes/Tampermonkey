// ==UserScript==
// @name         Kahoot++
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.4.0
// @description  Improvements to Kahoot
// @author       Evan Young (@Bowser65)
// @match        https://kahoot.it/*
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

(() => {
  function addStyle () {
    const varColor = cfg.get('color') ? cfg.get('color') : '#003366'

    document.head.innerHTML += `
      <style data-from="kahoot++">
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
  function addPin () {
    let vars = {}
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => { vars[k] = v })
    if (vars.pin) {
      $('#inputSession').get(0).value = vars.pin
    }
  }
  function buildSettings () {
    var cfg = {
      title: 'Kahoot++ Settings',
      menuCommand: true,
      params: {
        color: {
          type: 'text',
          default: '#003366'
        }
      },
      onSave: function (v) {
        removeStyle(); addStyle()
      }
    }
    return new MonkeyConfig(cfg)
  }
  function handler () {
    cfg = buildSettings()
    GM_registerMenuCommand('Kahoot++ Settings', () => { cfg.open('layer') })

    addPin()
    addStyle()
  }
  handler()
})()

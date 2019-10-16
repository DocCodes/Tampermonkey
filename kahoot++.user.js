// ==UserScript==
// @name         Kahoot++
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.4.3
// @description  Improvements to Kahoot
// @author       Evan Young (@evaneliasyoung)
// @match        https://kahoot.it/*
// @require      https://raw.github.com/odyniec/MonkeyConfig/master/monkeyconfig.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

;(() => {
  function addStyle (cfg) {
    const varColor = cfg.get('color') ? cfg.get('color') : '#003366'

    $('main, .animated-background, .join-view__bg, .intro.get-ready, .counter').css('background-color', varColor)
    $('.counter-background, .bonus-badge-wrapper.bonus-badge-wrapper--streak-bonus-level-text, .status-bar__game-pin, .vertical-alignment-wrapper__bottom').css('display', 'none !important')
    $('.logo-container').css('padding-top', '0px !important')
    $('.animated-background, .join-view__bg, .intro.get-ready').css('animation', 'none !important')
  }
  function addPin () {
    let vars = {}
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, k, v) => {
      vars[k] = v
    })
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
      }
    }
    return new MonkeyConfig(cfg)
  }
  function handler () {
    var cfg = buildSettings()
    GM_registerMenuCommand('Kahoot++ Settings', () => {
      cfg.open('layer')
    })
    GM_registerMenuCommand('Reload Styles', () => {
      addStyle(cfg)
    })

    addPin()
    addStyle(cfg)
  }

  handler()
})()

// ==UserScript==
// @name         Instagram Downloader
// @namespace    https://github.com/evaneliasyoung/Tampermonkey
// @version      0.1.0
// @description  Instagram Downloader
// @author       Evan Young (@evaneliasyoung)
// @match        http://www.instagram.com/p/*
// @match        https://www.instagram.com/p/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

;(() => {
  function buildSettings () {
    GM_registerMenuCommand(
      'Download Image',
      () => {
        let url = document.querySelector('.KL4Bh > img').src
        open(url)
      },
      'c'
    )
  }
  function handler () {
    var $ = window.$
    var cfg = buildSettings()
  }
  handler()
})()

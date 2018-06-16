// ==UserScript==
// @name         EEY.PW
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.1.2
// @description  My URL shortening service
// @author       Evan Young (@evaneliasyoung)
// @match        http://*/*
// @match        https://*/*
// @connect      eey.pw
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(() => {
  function buildSettings () {
    GM_registerMenuCommand('Set EEY.PW Token', () => {
      const key = window.prompt('Enter Your Key', GM_getValue('key') ? GM_getValue('key') : 'key here...')
      if (key) {
        GM_setValue('key', key)
      }
    }, 't')
    GM_registerMenuCommand('Copy Shortlink', () => {
      let url = window.location.href
      let key = GM_getValue('key', '')
      let xhr = GM_xmlhttpRequest({
        url: `http://eey.pw/portable?key=${key}&url=${url}`,
        onload: (res) => {
          let txt = res.responseText
          try {
            res = JSON.parse(txt)
            GM_notification(`Error: ${res.description}`)
          } catch (err) {
            GM_notification(`Success! URL Shortened: ${txt}.`)
            GM_setClipboard(txt)
          }
        }
      })
    }, 'c')
  }
  function handler () {
    var $ = window.$
    var cfg = buildSettings()
  }
  handler()
})()

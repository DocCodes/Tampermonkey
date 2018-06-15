// ==UserScript==
// @name         EEY.PW
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.1.0
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
      const token = window.prompt('Enter Your Token', GM_getValue('token') ? GM_getValue('token') : 'token here...')
      if (token) {
        GM_setValue('token', token)
      }
    }, 't')
    GM_registerMenuCommand('Copy Shortlink', () => {
      let url = window.location.href
      let token = GM_getValue('token', '')
      let xhr = GM_xmlhttpRequest({
        url: `http://eey.pw/portable?token=${token}&url=${url}`,
        onload: (res) => {
          let txt = res.responseText
          try {
            res = JSON.parse(txt)
            GM_notification(`Error: ${res.description}`)
          } catch (err) {
            GM_notification(txt)
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

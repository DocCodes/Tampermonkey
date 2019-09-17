// ==UserScript==
// @name         VHL Vocab
// @namespace    https://github.com/evaneliasyoung/Tampermonkey
// @version      0.1.0
// @description  Exports vocabulary from VHL Central
// @author       Evan Elias Young (@evaneliasyoung)
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match        http://*.vhlcentral.com/*
// @match        https://*.vhlcentral.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// ==/UserScript==

;(() => {
  function getVocab () {
    let vcb = {}
    $('.c-row.c-row--vocab-tools.js-edit-zone.ng-scope').each((i, e) => {
      let $e = $(e)
      let sp = $e
        .find('td')
        .eq(0)
        .text()
        .trim()
      let en = $e
        .find('td')
        .eq(1)
        .text()
        .trim()
      vcb[sp] = en
    })
    return vcb
  }
  function formatVocab (vcb) {
    return Object.keys(vcb)
      .map(e => `${e}\t${vcb[e]}`)
      .join('\n')
  }
  function buildSettings () {
    GM_registerMenuCommand(
      'Export Vocab',
      () => {
        GM_setClipboard(formatVocab(getVocab()))
      },
      'c'
    )
  }
  function handler () {
    buildSettings()
  }
  handler()
})()

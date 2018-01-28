// ==UserScript==
// @name         Sisker
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.1.0
// @description  Remember username and password
// @author       Evan Young (@Bowser65)
// @match        https://sdm.sisk12.com/*
// @grant        none
// ==/UserScript==

var $ = window.$
var localStorage = window.localStorage

function saveCredentials () {
  $(`
    <div style="margin-top:5px;margin-left:10px;margin-right:10px;">
      <b style="color:#00A200;text-align:right;line-height:normal;" class="ng-binding">Credentials Saved.</b>
    </div>
  `).insertBefore('.panel.panel-default > div:first-of-type')
  localStorage.username = $('#inputUserName').get(0).value
  localStorage.password = $('input[type="password"]').get(0).value
}

function loadCredentials () {
  let els = $([$('#inputUserName').get(0), $('input[type="password"]').get(0)])
  if (localStorage.username !== undefined) {
    els[0].value = localStorage.username
  }
  if (localStorage.password !== undefined) {
    els[1].value = localStorage.password
  }

  els.each((i, e) => {
    let ne = $(e)
    ne.attr('aria-invalid', 'false')
    e.className = 'form-control ng-touched ng-not-empty ng-dirty ng-valid-parse ng-valid ng-valid-required'
  })
}

(() => {
  let buttonContainer = $('.panel.panel-default > div:last-of-type > table > tbody > tr > td:first-of-type').get(0)

  buttonContainer.innerHTML = `
  <div style="text-align: center;" onclick="saveCredentials()">
    <div style="margin-top:2px;">
      <img src="../Images/save.png" style="cursor:pointer;">
    </div>
    <div style="text-align:center;">
      <span>Save</span>
    </div>
  </div>
  `
  loadCredentials()
})()

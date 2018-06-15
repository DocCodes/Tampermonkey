// ==UserScript==
// @name         IPAHelp
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.1.1
// @description  Helps pronounce IPA on Wikipedia
// @author       Evan Young (@evaneliasyoung)
// @match        https://en.wikipedia.org/wiki/*
// @grant        none
// ==/UserScript==

(() => {
  async function addStyle () {
    document.head.innerHTML += `
    <style>
      #IPAHelp {
        position: fixed;
        opacity: 1;
        transition: 0.25s all ease-in-out;
        width: ${$('#mw-panel').width()}px;
        left: ${$('#mw-panel').css('padding-left')};
        top: 0px;
        height: 100vh;
        background-color: #F6F6F6;
      }
      #IPAHelp * {
        font-size: 13px;
      }
      .ipa-hidden {
        opacity: 0 !important;
      }
    </style>
    `
  }
  async function buildDiv () {
    $('body').append(`
      <div id="IPAHelp" class="ipa-hidden">
        <table>
          <caption>IPA Help</caption>
          <thead>
            <tr>
              <th>Key</th>
              <th>Guide</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    `)
  }
  function handler () {
    window.IPAHelp = []
    addStyle()
    buildDiv()

    $('a[title="Help:IPA/English"]').hover((ev) => {
      let tp = ev.type
      let e
      if (ev.target.href === undefined) {
        e = $(ev.target).parents('a').get(0)
      } else {
        e = ev.target
      }
      $('#IPAHelp table tbody').html('')

      if (tp === 'mouseenter') {
        if (window.IPAClear !== undefined) { clearInterval(window.IPAClear) }
        $('#IPAHelp').removeClass('ipa-hidden')
      } else {
        window.IPAClear = setTimeout(() => {
          $('#IPAHelp').addClass('ipa-hidden')
        }, 5000)
      }

      $(e).find('span > span').each((i, e) => {
        $('#IPAHelp table tbody').append(`
          <tr>
            <td>${e.innerText}</td>
            <td>${e.title}</td>
          </tr>
        `)
      })
    })
  }

  var $ = window.$
  handler()
})()

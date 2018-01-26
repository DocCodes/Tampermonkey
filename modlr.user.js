// ==UserScript==
// @name         Modlr
// @namespace    https://github.com/DocCodes/Tampermonkey
// @version      0.1.0
// @description  Apply course totals
// @author       Evan Young (@Bowser65)
// @match        http://www.southtechnical.org/moodle/grade/report/*
// @grant        none
// ==/UserScript==

(() => {
  var grds, outs, scr, tot
  grds = document.getElementsByClassName('item b1b itemcenter')
  outs = document.getElementsByClassName('oddd1 baggt b2b itemcenter')
  scr = 0
  tot = 0

  for (let g of grds) {
    if (g.headers.indexOf('grade') !== -1 && g.innerText !== '-') {
      scr += parseFloat(g.innerText)
      tot += parseFloat(g.nextElementSibling.innerText.split('–')[1])
    }
  }
  console.log(scr, tot, scr / tot * 100)
  outs[0].innerText = scr
  outs[1].innerText = `0–${tot}`
  outs[2].innerText = `${(scr / tot * 100).toFixed(2)} %`
})()

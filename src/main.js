import getContentFromDiv from './getContentFromDiv.js'
import getContentFromBusinessDiv from './getContentFromBusinessDiv.js'

var baseURL = 'https://dictionary.cambridge.org'
var doc = {
    voc: '',
    uk: {},
    us: {},
    examples: []
}
// 从URL中读取单词
doc.voc = window.location.pathname.split('/')[3]

// 获得翻译部分主体
var contents = document.getElementById('entryContent').querySelectorAll('.di')

for (let content of contents) {
    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("in Business English") > -1) {
        doc.business = getContentFromBusinessDiv( content)
    }

    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("in English") > -1) {
        doc.uk = getContentFromDiv( content)
    }
    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("in American English") > -1) {
        doc.us = getContentFromDiv( content)
    }
}

console.log( doc)
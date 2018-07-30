var baseURL = 'https://dictionary.cambridge.org'
var doc = {
    voc: '',
    uk: {},
    us: {},
    examples: []
}
// 从URL中读取单词
doc.voc = window.location.pathname.split('/')[3]
var ddd
// 获得翻译部分主体
var contents = document.getElementById('entryContent').querySelectorAll('.di')

for (let content of contents) {
    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("in Business English") > -1) {
        doc.business = getContentFromBusinessDiv( content)
    }
 /*    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("Examples of") == 0) {
        doc.examples = getContentFromExamplesDiv( content)
    } */
    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("in English") > -1) {
        doc.uk = getContentFromDiv( content)
    }
    if (content.querySelectorAll('h2.hw')[0].innerText.indexOf("in American English") > -1) {
        doc.us = getContentFromDiv( content)
    }
}

// return content obj like docTemp.contents[0]
function getContentFromDiv(content){
    let contentObj = {}
    contentObj.POSes = []

    let POSesContent = content.getElementsByClassName('entry-body__el')
    for ( let POS of POSesContent) {
        let POSobj = {}

        POSobj.pos = POS.getElementsByClassName('pos')[0].textContent  // verb
        POSobj.grammer = POS.getElementsByClassName('posgram')[0].textContent // adjective [ after verb ], adverb

        POSobj.prons = []
        let prons = POS.getElementsByClassName('pron-info')
        for ( let pron of prons) {
            let pronObj = {}
            pronObj.region = pron.getElementsByClassName('region')[0].innerText
            pronObj.ipa =pron.getElementsByClassName('ipa')[0].textContent // əˈləʊn
            pronObj.mp3 = baseURL + pron.getElementsByClassName('sound')[0].getAttribute('data-src-mp3')
            // https://dictionary.cambridge.org/media/english/uk_pron_ogg/u/uka/ukall/ukally_013.ogg
            pronObj.ogg = baseURL + pron.getElementsByClassName('sound')[0].getAttribute('data-src-ogg')
            POSobj.prons.push(pronObj)
        }
    
        POSobj.defines = []
        let def_blocks = POS.getElementsByClassName("def-block")
        for( let def_block of def_blocks) {
            let defineObj = {}
            console.log(def_block)
            ddd = def_block
            defineObj.info = def_block.getElementsByClassName('def-info')[0].innerText // B1 [ T ]
            defineObj.define = def_block.getElementsByClassName('def')[0].innerText // to compete against a person or team in a game:
                
            defineObj.examps = []
            let examps = def_block.getElementsByClassName('examp')
            for (examp of examps) {
                defineObj.examps.push( examp.innerText) // Do you want to play cards/football (with us)?
            }
            POSobj.defines.push( defineObj)
        }
        contentObj.POSes.push( POSobj)
    }
    return contentObj
}
function getContentFromBusinessDiv( content){
    let contentObj = {}
    contentObj.POSes = []

    let POSesContent = content.getElementsByClassName('entry-body__el')
    for ( let POS of POSesContent) {
        let POSobj = {}
        if ( !POS.getElementsByClassName('pos')[0]){
            return null
        }
        POSobj.pos = POS.getElementsByClassName('pos')[0].textContent
        POSobj.prons = []
        let prons = POS.getElementsByClassName('pron-info')
        for ( let pron of prons) {
            let pronObj = {}
            pronObj.region = pron.getElementsByClassName('region')[0].innerText 
            if ( pron.getElementsByClassName('ipa')[0]) {
                pronObj.ipa =pron.getElementsByClassName('ipa')[0].textContent
            }
            pronObj.mp3 = baseURL + pron.getElementsByClassName('sound')[0].getAttribute('data-src-mp3')
            pronObj.ogg = baseURL + pron.getElementsByClassName('sound')[0].getAttribute('data-src-ogg')
            POSobj.prons.push(pronObj)
        }
    
        POSobj.senses = []
        let sense_blocks = POS.getElementsByClassName('sense-block')
        for( let sense of sense_blocks) {
            let senseObj = {}
            if ( sense.getElementsByClassName('phrase')[0]) {
                senseObj.phrase = sense.getElementsByClassName('phrase')[0].innerText
            }
            senseObj.define = sense.getElementsByClassName('def')[0].innerText

            senseObj.egs = []
            let egs = sense.getElementsByClassName('eg')
            for ( let eg of egs) {
                senseObj.egs.push( eg.innerText)
            }
            POSobj.senses.push( senseObj)
        }
        contentObj.POSes.push( POSobj)
    }
    return contentObj
}
console.log( doc)

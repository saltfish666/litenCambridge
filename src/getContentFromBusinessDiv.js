export default function getContentFromBusinessDiv( content){
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
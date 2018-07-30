export default function getContentFromDiv(content){
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
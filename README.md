# listenCambridge

baseURL = https://dictionary.cambridge.org/dictionary/english/

每当查询单词的时候，js读取页面信息，然后传给后台

## 处理后格式
```
var docTemp = {
    voc: 'play',
    uk: {
        POSes: [
            {
                pos: 'verb',
                grammer: 'adjective [ after verb ], adverb',
                prons: [
                    {
                        region: 'uk',
                        ipa: 'əˈləʊn',
                        mp3: '',
                        ogg: 'https://dictionary.cambridge.org/media/english/uk_pron_ogg/u/uka/ukall/ukally_013.ogg'
                    }
                ],
                defines: [
                    {
                        info: 'B1 [ T ]',
                        define: 'to compete against a person or team in a game:',
                        examps: [
                            ' Do you want to play cards/football (with us)?'
                        ]
                        
                    }
                ]
            }
        ]
    },
    us: {
    },
    business: {
    },
    examples: []
}
```

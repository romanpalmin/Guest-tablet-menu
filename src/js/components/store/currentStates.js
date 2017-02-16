export default {
    settings:{
        server:'http://tab01:01@10.10.250.91/',
        ip: '10.10.250.91',
       /* server:'http://10.10.182.11/',*/
        urlSmallImage:'img/',
        urlBigImage:'images/',
        urlBackImage: 'images',
        images:{
            logo: 'beer-zha.png',
            close: 'close.png'
        },
        testMode:false
    },
    appState:{
        MenuPoints:[],
        Category:{
            "332020":{
                name: 'Бургеры',
                currentState:[]
            },
            "342020":{
                name: 'СОСИДЖ ФЭКТОРИ',
                currentState:[]
            },
            "352020":{
                name: 'BBQ',
                currentState:[]
            },
            "392020":{
                name: 'БЭЙКС ЭНД СНЭКС',
                currentState:[]
            },
            "412020":{
                name: '4STARTS',
                currentState:[]
            },
            "422020":{
                name: 'АЙСИ-СПАЙСИ',
                currentState:[]
            },
            "432020":{
                name: 'НАПИТКИ',
                currentState:[]
            },
            "462020":{
                name: 'ПИВО',
                currentState:[]
            }
        },
        show: {
            name: 'Развлечения',
            currentState:[]
        },
        orders:{
            name: 'Корзина',
            currentState:[]
        }
    }
}

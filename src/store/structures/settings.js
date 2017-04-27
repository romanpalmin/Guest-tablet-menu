export default {
    server: '',
    ip: '',
    userName: '',
    password: '',
    /* server:'http://10.10.182.11/',*/
    urlSmallImage: 'img/',
    urlBigImage: 'images/',
    urlBackImage: 'images',
    images: {
        logo: 'beer-zha.png',
        close: 'close.png'
    },
    testMode: false,
    isTablet: true,
    showButtons: true,
    updateStatePeriod: 1000 * 60 * 30,  // время обновления меню секунда * кол-во секунд * кол-во минут
    updateOrderFrequency: 1000 * 15, // время обновления состояния корзины
    whereTabletFrequency: 1000 * 60, // определение положения планшета
    updateMenu: 1000 * 60 * 45,
    language: 'ru'
}
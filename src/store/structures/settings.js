export default {
    server: '',
    ip: '10.10.182.11',
    /*ip: '10.100.50.248',*/
    userName: '',
    password: '',
    urlBase:  'http://10.10.182.11/',
    /*urlBase:  'http://10.100.50.248/',*/
    urlSmallImage: 'img/',
    urlBigImage: 'images/',
    urlBackImage: 'images',
    images: {
        logo: 'beer-zha.png',
        close: 'close.png'
    },
    testMode: false,
    isTablet: false,
    showButtons: false,
    updateStatePeriod: 1000 * 60 * 30,  // время обновления меню секунда * кол-во секунд * кол-во минут
    updateOrderFrequency: 1000 * 15, // время обновления состояния корзины
    whereTabletFrequency: 1000 * 60, // определение положения планшета
    updateMenu: 300000, // Обновление меню и товаров
    updateShow: 100000*15, // Обновление расписания развлечений (раз в 15 минут)
    language: 'ru',
    showLanguageToggle: true,
    localPath:'StreetFoodBar/images',
    isBrowser: true
}
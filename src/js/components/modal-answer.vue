<template>
    <div>
        <transition name="modal-answer" v-if="showType !== ''">
            <div class="modal-mask">
                <vue-touch-keyboard v-if="visible" , :layout="layout" , :cancel="hide" , :accept="accept" ,
                                    :input="input" , :change="change"/>
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="primary-modal" v-if="showType === 'primary'">
                            <template v-if="closeBtn === 'true'">
                                <div class="modal-close" @click="$emit('close')"><img
                                        :src="getImgPath('close')"/></div>
                            </template>
                            <div class="modal-header">
                                <h01>Расскажи откуда ты о нас узнал </h01>
                                <h02>и выиграй ужин на двоих на 3000 рублей*</h02>
                            </div>

                            <div class="modal-body">
                                <div class="grid" v-if="itemsList.length > 0">
                                    <!--<template v-for="row in 2">
                                        <div class="grid-items" v-for="cols in 5">
                                            <div class="grid-item" @click="sendAnswer(itemsList[getIndex(row, cols)])">
                                                <img :src="getImgPath(itemsList[getIndex(row, cols)].img)"/>
                                            </div>
                                        </div>
                                    </template>-->
                                    <table>
                                        <tr v-for="row in 2">
                                            <td v-for="cols in 5" class="grid-items">
                                                <div class="grid-item" :data-id="itemsList[getIndex(row, cols)].code"
                                                     @click="selectAnswer(itemsList[getIndex(row, cols)])">
                                                    <img :src="getImgPath(itemsList[getIndex(row, cols)].img)"/>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="phone-number">
                                <div class="phone-number-title">
                                    <!-- <h03>Введите номер телефона</h03>-->
                                </div>
                                <br/>
                                <div class="phone-number-mask" @click="setShowHint()">+7 ( _ _ _ ) _ _ _ - _ _ - _ _
                                </div>
                                <div class="phone-number-mask-btn">Отправить</div>

                                <!--<div class="hint" v-if="showHint"><span>Выберите, пожалуйста, вариант ответа</div>-->
                            </div>
                            <!--<div class="num-pad" v-if="showNumpad">
                                <table class="numpad-table">
                                    <tr>
                                        <td class="numpad-cell" v-for="n in 10">
                                            <button class="numpad-buttons" @click="printPhone(n-1)">{{n - 1}}</button>
                                        </td>
                                        <td class="numpad-cell">
                                            <button class="numpad-buttons" @click="deletePhone(n-1)">DEL</button>
                                        </td>
                                    </tr>
                                </table>
                            </div>-->

                            <div class="accept-phone-number">
                                <input class="phone-input hidden" @focus="show" data-layout="normal"/>

                            </div>
                            <div class="modal-header">
                                <!--<input type="text" placeholder="Text input" @focus="show" data-layout="normal" />-->

                                <h03>
                                    *1 числа каждого месяца объявляем счастливчика из ответивших. Участие возможно только 1 раз
                                </h03>
                            </div>
                            <div class="action-img" v-if="!(closeBtn === 'true')">
                                <div class="current-actions-new">
                                    <img :src="getActions()"/>
                                    <button class="go-to-actions" @click="goTo4start()">ВЫБРАТЬ</button>
                                </div>
                            </div>
                        </div>
                        <div class="scale-modal" v-if="showType === 'scale'">
                            <template v-if="closeBtn === 'true'">
                                <div class="modal-close" @click="$emit('close')"><img
                                        :src="getImgPath('close')"/></div>
                            </template>
                            <div class="modal-body">
                                <div class="scale-img"><img :src="getImgPath(getSelectedItemImg())"/></div>
                                <input class="phone-input" :value="phoneView" readonly/>
                                <button class="accept-phone-number-button" id="btn-accept" disabled
                                        @click="sendAnswer()">ОТПРАВИТЬ
                                </button>
                                <!--<h03>
                                    *1 числа каждого месяца объявляем счастливчика из ответивших. Участие возможно только 1 раз
                                </h03>-->
                            </div>
                        </div>
                        <div class="loading-modal" v-if="showType === 'loading'">
                            <div class="modal-body">
                                <div class="modal-body">
                                    <div class="callback-modal-answer callback-success">
                                        <h01>Большое спасибо!</h01>
                                        <h01>Идет регистрация Вашего номера телефона...</h01>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="callback-modal" v-if="showType === 'callback'">
                            <div class="modal-body">
                                <div class="callback-modal-answer">
                                    <!--<h01>Большое спасибо!</h01>
                                    <h02>Street Food Bar №1 благодарит Вас за уделенное время и заполненную анкету!

                                    </h02>
                                    <h02>К Вашим услугам инновационный спорт-бар с передовыми технологиями, позволяющий
                                        не только смотреть спортивные трансляции на большом экране, но и полностью
                                        погружаться в игру, ощущая себя на матче любимой команды. Эффект присутствия
                                        усиливают уникальный мультимедийный центр, масштабная игровая консоль и мощная
                                        акустическая система Dolby Atmos.

                                    </h02>
                                    <h02>Модные бургеры в меню Street Food Bar №1 занимают основную позицию. Их
                                        особенность — цветные свежеиспеченные булочки, сочное мясо и эксклюзивные соусы.
                                        Авторское исполнение и необычная подача блюд приближает хиты стрит-фуда –
                                        хот-доги, сэндвичи, барбекю и домашние натуральные сосиски – к высокой кухне.

                                    </h02>-->
                                    <h01>Cпасибо!</h01>
                                    <!--<h01>Вы успешно зарегистрировались, Ваш номер телефона участвует в акции</h01>-->
                                </div>
                                <button class="close-modal-button" @click="$emit('close')" v-if="closeBtn === true">
                                    Закрыть

                                </button>
                            </div>
                        </div>
                        <div class="callback-modal" v-if="showType === 'callback-success'">
                            <template v-if="closeBtn === 'true'">
                                <div class="modal-close" @click="$emit('close')"><img
                                        :src="getImgPath('close')"/></div>
                            </template>
                            <div class="modal-body">
                                <div class="callback-modal-answer callback-success">
                                    <h01>Большое спасибо!</h01>
                                    <h01>Вы успешно зарегистрировались, Ваш номер телефона участвует в акции</h01>
                                </div>
                            </div>
                        </div>
                        <div class="callback-modal" v-if="showType === 'callback-repeat'">
                            <template v-if="closeBtn === 'true'">
                                <div class="modal-close" @click="$emit('close')"><img
                                        :src="getImgPath('close')"/></div>
                            </template>
                            <div class="modal-body">
                                <div class="callback-modal-answer  callback-repeat">
                                    <h01>Cпасибо!</h01>
                                    <h01>Такой номер уже участвует в акции в текущем месяце</h01>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </transition>
    </div>
</template>
<style scoped lang="less">
    .current-actions-new {
        .go-to-actions {
            width: 200px;
            height: 60px;
            border-radius: 8px;
            position: absolute;
            bottom: -650px;
            font-size: 20pt;
            font-weight: bold;
            left: 400px;
        }
        width: 100%;
        text-align: center;
        img {
            width: 990px;
            border-radius: 8px;
            padding-top: 80px;
            padding-bottom: 80px;
        }
    }

    .action-img {
        width: 100%;
        text-align: center;
        padding-top: 100px;
    }

    .item-opacity {
        opacity: 0.2;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        .modal-wrapper {
            display: table-cell;
            overflow-y: scroll;
            /*vertical-align: middle;*/
            h01 {
                font-family: IntroHeader;
                display: block;
                /*padding-bottom: 20px;*/
                font-size: 22pt;
                color: #ffffff;
                text-align: center;
                width: 100%;
            }
            h02 {
                font-family: IntroHeader;
                display: block;
                /*padding-bottom: 20px;*/
                font-size: 15pt;
                color: #ffffff;
                text-align: center;
                width: 100%;
            }
            h03 {
                font-family: IntroHeader;
                display: block;
                /*padding-bottom: 20px;*/
                font-size: 10pt;
                color: #ffffff;
                text-align: center;
                width: 100%;
                margin-top: 25px;
            }
            .phone-number {
                .hint {
                    color: #e70001;
                    font-weight: 900;
                }
                .phone-number-title {
                    margin-top: -30px;
                }
                text-align: center;
                .phone-number-mask {
                    .btn {
                        margin-top: 10px;
                        color: gray;
                    }
                    border-radius: 8px;
                    width: 300px;
                    height: 35px;
                    background-color: black;
                    line-height: 35px;
                    font-size: 17pt;
                    font-weight: bolder;
                    margin: 0 auto;
                }
                .phone-number-mask-btn {
                    color: gray;
                    border-radius: 8px;
                    width: 300px;
                    height: 35px;
                    background-color: black;
                    line-height: 35px;
                    font-size: 17pt;
                    font-weight: bolder;
                    margin: 10px auto 0;
                }
            }
            .num-pad {
                text-align: center;
                width: 100%;
                .numpad-table {
                    width: 50%;
                    margin: 0 auto;
                    .numpad-cell {
                        padding: 10px;
                    }
                    .numpad-buttons {
                        height: 60px;
                        min-width: 60px;
                        background-color: black;
                        color: #f7f7f7;
                        font-size: 16pt;
                        font-weight: bolder;
                        border-radius: 5px;
                    }
                }
            }

            .scale-modal {
                img {
                    width: 25%;
                    border-radius: 58px;
                    /*padding: 30px;*/
                }
                .phone-input {
                    color: white;
                    background-color: black;
                    width: 430px;
                    height: 90px;
                    font-size: 25pt;
                    border-radius: 8px;
                    font-weight: bolder;
                }
                text-align: center;
                .accept-phone-number-button {
                    width: 430px;
                    height: 95px;
                    border-radius: 8px;
                    &:disabled {
                        background-color: black;
                    }
                    color: white;
                    font-size: 25pt;
                    font-weight: bolder;
                    margin: 5px;
                    background-color: #e70001;
                }
            }

            .accept-phone-number {
                width: 0px;
                height: 0px;
                .phone-input {
                    color: white;
                    background-color: black;
                    height: 0px;
                    width: 0px;
                    font-size: 18pt;
                    opacity: 0;
                }
                text-align: center;
                .accept-phone-number-button {
                    width: 300px;
                    height: 45px;
                    border-radius: 8px;
                    &:disabled {
                        background-color: black;
                    }
                    color: white;
                    font-size: 18pt;
                    font-weight: bolder;
                    margin: 5px;
                    background-color: #e70001;
                }
            }
            .modal-container {
                background-image: url(http://10.10.182.11/img/background.jpg);
                width: 990px;
                height: 550px;
                /*padding: 10px 20px;*/
                margin: 0 auto -60px;
                background-color: #fff;
                box-shadow: 0 2px 8px rgba(76, 76, 76, 0.33);
                transition: all .3s ease;
                font-family: Helvetica, Arial, sans-serif;
                position: relative;
                border-radius: 13px;
                border: 4px solid #8a8787;
                margin-top: 100px;
                .callback-success {
                    width: 100%;
                    text-align: center;
                }
                .callback-repeat {
                    width: 100%;
                    text-align: center;
                }
                .modal-close {
                    width: 70px;
                    height: 70px;
                    display: block;
                    position: absolute;
                    right: -35px;
                    top: -35px;
                    text-align: center;
                    line-height: 70px;
                    border-radius: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .modal-header h3 {
                    margin-top: 0;
                    color: #ffffff;
                    text-align: center;
                    font-family: IntroHeader;
                }

                .modal-body {
                    text-align: center;
                    .callback-modal-answer {
                        /*line-height: 300px;*/
                        color: #ffffff;
                        line-height: 15;
                        width: 100%;
                        font-size: 14pt;
                        h02, h03, h04 {
                            color: #FFF;
                            display: block;
                            font-size: 24px;
                            font-weight: normal;
                            padding: 0 10px 10px;
                            text-align: justify;
                            /*font-family: IntroHeader;*/
                        }
                    }
                    .scale-img {
                        border-radius: 5px;
                    }
                    .close-modal-button {
                        background-color: #555;
                        width: 300px;
                        height: 70px;
                        color: #ffffff;
                        font-size: 20pt;
                        font-weight: 800;
                    }
                    margin: 20px 0;
                    .grid {
                        display: grid;
                        grid-template-columns: repeat(5, 20%);
                        text-align: center;
                        padding-left: 80px;
                        .grid-items {
                            padding: 10px;
                            .grid-item {
                                height: 140px;
                                width: 140px;
                                line-height: 140px;
                                border-radius: 14px;
                                background-color: #cecece;
                                border: 2px solid #a99f9f;
                                color: black;
                                text-align: center;
                                margin: 0 auto;
                                cursor: pointer;
                                img {
                                    width: 99%;
                                    height: 99%;
                                    border-radius: 14px;
                                }
                                &:hover {
                                    border: 2px solid #696363;
                                    box-shadow: 9px 9px 5px 0px rgba(0, 0, 0, 0.75);
                                }
                            }
                        }
                    }

                }

            }

        }

    }

    .modal-answer-enter {
        opacity: 0;
    }

    .modal-answer-leave-active {
        opacity: 0;
    }

    .modal-answer-enter .modal-container,
    .modal-answer-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(3);
    }

</style>
<script>

    import ajax from "./helpers/ajax";

    export default {
        data() {
            return {
                name: 'Модальное окно анкеты',
                imgAnswer: '',
                showHint: false,
                showModal: this.$store.state.app.showModalAnketa,
                settings: this.$store.state.settings,
                showNumpad: false,
                showType: 'primary',
                showCloseBtn: this.closeBtn,
                selectedItem: {},
                currentPhone: '',
                itemsList: [
                    {'name': 'ВКонтакте', 'img': 'vk', 'code': 'SN1'},
                    {'name': 'Instagram', 'img': 'instagram', 'code': 'SN3'},
                    {'name': 'Яndex', 'img': 'yandex', 'code': 'NW2'},
                    {'name': 'Google', 'img': 'google', 'code': 'NW1'},
                    {'name': 'Афиша', 'img': 'afisha', 'code': 'IN4'},
                    {'name': 'РестоРейтинг', 'img': 'restorating', 'code': 'NW4'},
                    {'name': 'Restoclub', 'img': 'restoclub', 'code': 'NW3'},
                    {'name': 'Реклама', 'img': 'outdoor-ad', 'code': 'SR5'},
                    {'name': 'От друзей', 'img': 'friends', 'code': 'SR1'},
                    {'name': 'Проезжал', 'img': 'drivepast', 'code': 'SR2'}
                ],
                visible: false,
                layout: "normal",
                input: null,
                options: {
                    useKbEvents: false
                }
            }
        },
        props: ['closeBtn'],
        mounted() {
        },
        computed: {
            phoneView: function () {
                const str = this.currentPhone;
                let res = '';
                switch (str.length) {
                    case 0:
                        res = '+7 ( _ _ _ ) _ _ _ - _ _ - _ _';
                        break;
                    case 1:
                        res = `+7 ( ${str[0]} _ _ ) _ _ _ - _ _ - _ _`;
                        break;
                    case 2:
                        res = `+7 ( ${str[0]} ${str[1]} _ ) _ _ _ - _ _ - _ _`;
                        break;
                    case 3:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) _ _ _ - _ _ - _ _`;
                        break;
                    case 4:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} _ _ - _ _ - _ _`;
                        break;
                    case 5:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} ${str[4]} _ - _ _ - _ _`;
                        break;
                    case 6:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} ${str[4]} ${str[5]} - _ _ - _ _`;
                        break;
                    case 7:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} ${str[4]} ${str[5]} - ${str[6]} _ - _ _`;
                        break;
                    case 8:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} ${str[4]} ${str[5]} - ${str[6]} ${str[7]} - _ _`;
                        break;
                    case 9:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} ${str[4]} ${str[5]} - ${str[6]} ${str[7]} - ${str[8]} _`;
                        break;
                    case 10:
                        res = `+7 ( ${str[0]} ${str[1]} ${str[2]} ) ${str[3]} ${str[4]} ${str[5]} - ${str[6]} ${str[7]} - ${str[8]} ${str[9]}`;
                        break;
                }
                return res;
            }
        },
        methods: {
            setShowHint() {
                this.showHint = !this.showHint;
            },
            goTo4start() {
                let path = `/${this.$store.state.settings.language}/menu/653232`;
                this.$router.replace(path);
            },
            getImgActions() {
                let res = '';
                let imgPath = this.getActions()[0];
            },
            getActions() {
                return this.settings.urlBase + this.settings.server + this.settings.urlBigImage + '/siry.png';
                /*let resp = '';
                let result = ajax.exec({name: 'getActions'}, (res) => {
                    console.log('Ответ');
                    console.log(res.data);
                    this.imgAnswer = this.settings.urlBase + this.settings.server + this.settings.urlBigImage  + '/';
                    console.log('ответ2: ' + this.settings.urlBase + this.settings.server + this.settings.urlBigImage + res);
                    return result.data;
                });*/

            },
            change(evt) {
                let digital = evt;
                digital = digital.replace(/[^-0-9]/gim, '')

                if (+digital >= 0 && +digital <= 9999999999 && digital.length <= 10) {
                    //this.printPhone(digital);
                    this.currentPhone = digital;
                }
                let el = document.getElementById('btn-accept');
                if (this.currentPhone.length === 10) {

                    if (el) {
                        el.removeAttribute('disabled');
                    }
                } else {
                    if (el) {
                        el.setAttribute('disabled', 'disabled');
                    }
                }
            },

            accept(text) {
                this.hide();
            },

            show(e) {
                this.showType = 'scale';
                this.input = e.target;
                this.layout = e.target.dataset.layout;

                if (!this.visible)
                    this.visible = true
            },

            hide() {
                this.visible = false;
                this.showType = 'primary';
            },
            printPhone(digit) {
                let len = this.currentPhone.length;
                if (len < 10) {
                    this.currentPhone = '' + this.currentPhone + digit;
                }
            },
            deletePhone() {
                let len = this.currentPhone.length;
                if (len > 0) {
                    this.currentPhone = this.currentPhone.substr(0, len - 1);
                }
            },
            getIndex(row, col) {
                // если первая строка, берем колонки, если вторая, добавляем 5, для печати второй строки
                // в любом случае вычитаем индекс для корректного индекса массива
                return (col + (row === 1 ? 0 : 5)) - 1;
            },
            getImgPath(name) {
                let path = this.settings.urlBase + this.settings.server + this.settings.urlSmallImage;
                path += name + '.png';
                return path;
            },
            getSelectedItemImg() {
                let res = '';
                if (this.selectedItem) {
                    res = _.find(this.itemsList, {'code': this.selectedItem.code}).img;
                }
                return res;
            },
            selectAnswer(currentitem) {
                let items = document.getElementsByClassName('grid-item');
                _.forEach(items, (item) => {
                    if (item.dataset.id === currentitem.code) {
                        item.classList.remove('item-opacity');
                    } else {
                        item.classList.add('item-opacity');
                    }
                });
                this.selectedItem = currentitem;
                this.showNumpad = true;
                let input = document.getElementsByClassName('phone-input')[0];
                input.focus();
                input.blur();
                //this.show(input);
                let el = document.getElementById('btn-accept');
                if (el) {
                    el.removeAttribute('disabled');
                    el.classList.add('btn-red')
                }

            },
            sendAnswer() {
                //this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                //this.showType = '';
                this.showType = 'callback';
                this.visible = false;
                //return;
                /*if (this.closeBtn === 'true') {
                    console.log('Закрыть окно ' + this.$store.state.app.showModalAnketa);
                    this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                }
                if (this.closeBtn === 'true') {
                    //this.showType = 'loading';
                    //this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                    /!*setTimeout(()=>{
                        this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                        let path;
                        let language = this.$store.state.settings.language === 'ru' ? 'en' : 'ru';
                        this.$store.state.settings.language = language;
                        this.language = language;
                        path = `/${this.$store.state.settings.language}/menu`;
                        this.$router.replace(path);
                    }, 3000)*!/
                }*/
                // включаем модальное окно загрузки
                //this.showType = 'loading';
                const payload = {
                    'code': this.selectedItem.code,
                    'name': this.selectedItem.name,
                    'phone': '8' + this.currentPhone,
                    'callback': resp => {
                        //setTimeout(()=>{
                        this.currentPhone = '';
                        this.showType = 'primary';
                        let path;
                        //let language = this.$store.state.settings.language === 'ru' ? 'en' : 'ru';
                        //this.$store.state.settings.language = language;
                        //this.language = language;
                        path = `/${this.$store.state.settings.language}/Actions3`;
                        this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                        if (this.closeBtn === 'false') {
                            this.showType = 'primary';
                            this.$router.replace(path);
                        } else {
                            this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                        }
                        /*if (this.closeBtn === 'false') {
                            this.$router.replace(path);
                            //this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': true});
                        } else {
                            this.showType = '';
                            //this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': true});
                        }*/
                        //this.showType = 'callback-success';
                        //}, 3000);
                        // включаем модальное окно коллбэка
                        // this.showType = 'callback';
                        /*if (resp.code && resp.code === 'error') {
                            if (this.closeBtn === 'false') {
                                this.success();
                            }
                        } else if (resp && resp.status && resp.status === 1) {
                            this.showType = 'callback';
                            setTimeout(()=>{
                                this.showType = 'loading';
                                let path;
                                let language = this.$store.state.settings.language === 'ru' ? 'en' : 'ru';
                                this.$store.state.settings.language = language;
                                this.language = language;
                                path = `/${this.$store.state.settings.language}/menu`;
                                this.$router.replace(path);
                                this.showType = 'callback-success';
                            }, 3000)
                        } else if (resp && resp.status && resp.status === 0) {
                            this.showType = 'callback-repeat';
                        } else if (resp && resp.status && resp.status === -1) {
                            this.success();
                        }*/
                    }
                };
                //this.showType = 'callback';
                setTimeout(() => {
                    this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                    this.$store.dispatch('SEND_ANKETA', payload);
                }, 2111);
                //this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});

            },

            sendAnswerOld(item) {
                // включаем модальное окно загрузки
                // this.showType = 'loading';
                // console.log('loading');
                if (this.closeBtn === 'true') {
                    this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                    this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                }
                const payload = {
                    'code': item.code,
                    'name': item.name,
                    'callback': resp => {
                        // включаем модальное окно коллбэка
                        // this.showType = 'callback';
                        if (resp.code === 'error') {
                            console.log('Ошибка отправки: ' + resp.message);
                            if (this.closeBtn === 'false') {
                                this.success();
                            }
                        } else {
                            this.success();
                        }
                    }
                };
                //this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                //setTimeout(()=>{
                this.$store.dispatch('SEND_ANKETA', payload);
                //}, 2000);

            },
            success() {
                console.log('Анкета успешно отправлена');
                if (this.closeBtn === 'false') {
                    this.showType = 'callback';
                } else {
                    this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                }
            }
        }
    }


</script>
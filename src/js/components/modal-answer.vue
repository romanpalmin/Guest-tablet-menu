<template>
    <div>
        <transition name="modal-answer">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="primary-modal" v-if="showType === 'primary'">
                            <template v-if="closeBtn === 'true'">
                                <div class="modal-close" @click="$emit('close')"><img
                                        :src="getImgPath('close')"/></div>
                            </template>
                            <div class="modal-header">
                                <h01> Расскажи, откуда ты о нас узнал</h01>
                            </div>

                            <div class="modal-body">
                                <div class="grid" v-if="itemsList.length > 0">
                                    <template v-for="row in 2">
                                        <div class="grid-items" v-for="cols in 5">
                                            <div class="grid-item" @click="sendAnswer(itemsList[getIndex(row, cols)])">
                                                <img :src="getImgPath(itemsList[getIndex(row, cols)].img)"/>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="loading-modal" v-if="showType === 'loading'">
                            <div class="modal-body">
                                Loading...
                            </div>
                        </div>
                        <div class="callback-modal" v-if="showType === 'callback'">
                            <div class="modal-body">
                                <div class="callback-modal-answer">
                                    <h01>Большое спасибо!</h01>
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
                                    </h02>
                                </div>
                                <button class="close-modal-button" @click="$emit('close')" v-if="closeBtn === true">
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="less">
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
            vertical-align: middle;
            h01 {
                font-family: IntroHeader;
                display: block;
                padding-bottom: 20px;
                font-size: 25pt;
                color: #42b983;
                text-align: center;
                width: 100%;
            }
            .modal-container {
                background-image: url(http://10.10.182.11/img/background.jpg);
                width: 900px;
                height: 450px;
                margin: 0 auto;
                padding: 20px 30px;
                background-color: #fff;
                box-shadow: 0 2px 8px rgba(76, 76, 76, 0.33);
                transition: all .3s ease;
                font-family: Helvetica, Arial, sans-serif;
                position: relative;
                border-radius: 13px;
                border: 4px solid #8a8787;
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
                    color: #42b983;
                    text-align: center;
                    font-family: IntroHeader;
                }

                .modal-body {
                    text-align: center;
                    .callback-modal-answer {
                        /*line-height: 300px;*/
                        color: #42b983;

                        width: 100%;
                        font-size: 14pt;
                        h02, h03, h04 {
                            color: #FFF;
                            display: block;
                            font-size: 24px;
                            font-weight: normal;
                            padding-top: 0;
                            padding-bottom: 10px;
                            padding-left: 10px;
                            padding-right: 10px;
                            text-align: justify;
                            /*font-family: IntroHeader;*/
                        }
                    }
                    .close-modal-button {
                        background-color: #555;
                        width: 300px;
                        height: 70px;
                        color: #42b983;
                        font-size: 20pt;
                        font-weight: 800;
                    }
                    margin: 20px 0;
                    .grid {
                        display: grid;
                        grid-template-columns: repeat(5, 20%);
                        text-align: center;
                        .grid-items {
                            padding: 20px;
                            .grid-item {
                                height: 140px;
                                width: 140px;
                                line-height: 140px;
                                border-radius: 14px;
                                background-color: #cecece;
                                border: 2px solid #a99f9f;
                                color: green;
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
    export default{
        data(){
            return{
                name:'Модальное окно анкеты',
                showModal: this.$store.state.app.showModalAnketa,
                settings: this.$store.state.settings,
                showType: 'primary',
                showCloseBtn: this.closeBtn,
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
                    ]
            }
        },
        props: ['closeBtn'],
        mounted(){
            console.log(this.closeBtn);
            console.log(this.showCloseBtn);
        },
        methods:{
            getIndex(row, col){
                // если первая строка, берем колонки, если вторая, добавляем 5, для печати второй строки
                // в любом случае вычитаем индекс для корректного индекса массива
                return (col + (row === 1 ? 0 : 5)) - 1;
            },
            getImgPath(name){
                let path = this.settings.urlBase + this.settings.server + this.settings.urlSmallImage;
                path += name + '.png';
                return path;
            },
            sendAnswer(item){
                // включаем модальное окно загрузки
                // this.showType = 'loading';
                // console.log('loading');
                const payload = {
                    'code': item.code,
                    'name': item.name,
                    'callback': resp => {
                        // включаем модальное окно коллбэка
                        // this.showType = 'callback';
                        if (resp.code === 'error'){
                            console.log('Ошибка отправки: ' + resp.message);
                            if (this.closeBtn === 'false'){
                                this.success();
                            }
                        } else {
                            this.success();
                        }
                        if (this.closeBtn === 'true'){
                            this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                            this.$store.commit('SET_IS_SHOW_MODAL_ANKETA', {'value': false});
                        }
                    }
                }
                //this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                //setTimeout(()=>{
                    this.$store.dispatch('SEND_ANKETA', payload);
                //}, 2000);

            },
            success(){
                console.log('Анкета успешно отправлена');
                if (this.closeBtn === 'false'){
                    this.showType = 'callback';
                }
            }
        }
    }




</script>
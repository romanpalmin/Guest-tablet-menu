<template>
    <div>
        <transition name="modal-answer">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-close" @click="$emit('close')"><img :src="getImgPath('close')"/></div>
                        <div class="modal-header">
                            <h3> Расскажи, откуда ты о нас узнал, и получи лимонад "Vanilla sky" </h3>
                        </div>

                        <div class="modal-body">
                            <div class="grid"  v-if="itemsList.length > 0">
                                <template v-for="row in 2">
                                <div class="grid-items" v-for="cols in 5">
                                    <div class="grid-item" @click="sendAnswer(itemsList[getIndex(row, cols)])">
                                        <img :src="getImgPath(itemsList[getIndex(row, cols)].code)" />
                                    </div>
                                </div>
                                </template>
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
            .modal-container {
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
                    margin: 20px 0;
                    .grid {
                        display: grid;
                        grid-template-columns: 20% 20% 20% 20% 20%;
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
                itemsList: [
                        {'name': 'ВКонтакте', 'code': 'vk'},
                        {'name': 'Instagram', 'code': 'instagram'},
                        {'name': 'Яndex', 'code': 'yandex'},
                        {'name': 'Google', 'code': 'google'},
                        {'name': 'Афиша', 'code': 'afisha'},
                        {'name': 'РестоРейтинг', 'code': 'restorating'},
                        {'name': 'Restoclub', 'code': 'restoclub'},
                        {'name': 'Реклама', 'code': 'outdoor-ad'},
                        {'name': 'От друзей', 'code': 'friends'},
                        {'name': 'Проезжал', 'code': 'drivepast'}
                    ]
            }
        },
        mounted(){
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
                const payload = {
                    'code': item.code,
                    'name': item.name
                }
                this.$store.commit('SET_MODAL_ANKETA_SHOW', {'value': false});
                this.$store.dispatch('SEND_ANKETA', payload);
            }
        }
    }








</script>
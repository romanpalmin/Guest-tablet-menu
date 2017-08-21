<template>
    <div>
        <transition name="modal-actions">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="primary-modal" v-if="isModal">
                            <div class="modal-close" @click="$emit('close')" v-if="getCurrentModal().escActive"><img :src="getImgPath('close')"/></div>
                            <div class="modal-body">
                                <div class="item">
                                    <div class="img-wrapper">
                                        <img :src="getImgByUrl(getCurrentModal().urlRuStock)"/>
                                        <button class="go-to-actions" @click="goTo4start()">ВЫБРАТЬ</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div v-else="!isModal" class="primary-list">
                            <div class="list-body">
                                <div class="item" v-for="item in getActionsList">
                                    <div class="img-wrapper">
                                        <img :src="getImgByUrl(item.urlRuStock)"/>
                                    </div>
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
                /*background-image: url(http://10.10.182.11/img/background.jpg);*/
                width: 990px;
                /*height: 600px;*/
                /*padding: 10px 20px;*/
                margin: 0 auto -60px;
                /*background-color: #fff;*/
                /*box-shadow: 0 2px 8px rgba(76, 76, 76, 0.33);*/
                transition: all .3s ease;
                font-family: Helvetica, Arial, sans-serif;
                position: relative;
                border-radius: 13px;
                /*border: 4px solid #8a8787;*/
                /*height: 600px;*/
                .modal-body {

                }
                .item {
                    /*width: 100%;*/
                    margin: 0 auto;
                    text-align: center;
                    .img-wrapper {
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            border-radius: 5px;
                        }
                    }
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
                .primary-modal {
                    /*background-color: green;*/
                    /*height: 700px;*/
                    min-height: 400px;
                    .go-to-actions {
                        width: 200px;
                        height: 60px;
                        border-radius: 8px;
                        position: absolute;
                        bottom: 130px;
                        font-size: 20pt;
                        font-weight: bold;
                        left: 400px;
                    }
                }
                .primary-list {
                    max-height: 600px;
                    overflow-y: auto;
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
    export default {
        data() {
            return {
                name: 'Модальное/списочное окно акций',
                showModal: this.$store.state.app.showModalActions,
                settings: this.$store.state.settings,
                showCloseBtn: this.isModal,
            }
        },
        computed: {
            getActionsList: function () {
                let current = this.$store.state.app.actions;
                current = _.sortBy(
                    _.filter(current, (item) => {
                        return item.stock &&
                            item.urlRuStock !== '';
                    }),
                    ['orderStock']);
                return current;
            },
            getIsShowCloseBtn: function(item){
                return item.escActive;
            }
        },
        mounted() {
        },
        props: ['isModal'],
        methods: {
            goTo4start() {
                this.$store.commit('SET_IS_SHOW_MODAL_ACTIONS', {'value': false});
                this.$store.commit('SET_MODAL_ACTIONS_SHOW', {'value': false});
                this.$store.commit('SET_CHANGE_PAGE');
                //let path = `/${this.$store.state.settings.language}/menu/653232#656932`;
                let path = `/${this.$store.state.settings.language}/menu/653232/656932`;
                this.$router.replace(path);
            },
            getImgPath(name) {
                let path = this.settings.urlBase + this.settings.server + this.settings.urlSmallImage;
                path += name + '.png';
                return path;
            },
            getImgByUrl(url) {
                let path = this.settings.urlBase + this.settings.server + this.settings.urlBackImage;
                if (url === '/siry.jpg'){
                    path += '/siry2.png';
                } else {
                    path += url;
                }

                return path;
            },
            getCurrentModal() {
                let current = this.$store.state.app.actions;
                let index = 0;
                /*current = _.sortBy(
                    _.filter(current, (item) => {
                        return item.modal &&
                            item.urlRuStock !== '';
                    }),
                    ['orderStock']);
                console.log(current[index]);*/
                return current[index];
            }
        }

    }
</script>
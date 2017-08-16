<template>
    <div>
        <transition name="modal-actions">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="primary-modal" v-if="closeBtn">
                            <div class="modal-close" @click="$emit('close')"><img :src="getImgPath('close')"/></div>
                            <div class="modal-body">
                                <template v-for="items in getActionsList">
                                    {{items}}
                                </template>
                                TEST<br/>
                                TEST<br/>
                                TEST<br/>
                                TEST<br/>
                                  </div>
                        </div>
                        <div v-else="!closeBtn" class="primary-list">
                            <div class="list-body">
                                <template v-for="items in getActionsList">
                                    {{items['Наименование']}}
                                </template>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>
                                TEST TEST TEST<br/>

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
                background-image: url(http://10.10.182.11/img/background.jpg);
                width: 790px;
                /*height: 600px;*/
                padding: 10px 20px;
                margin: 0 auto -60px;
                background-color: #fff;
                box-shadow: 0 2px 8px rgba(76, 76, 76, 0.33);
                transition: all .3s ease;
                font-family: Helvetica, Arial, sans-serif;
                position: relative;
                border-radius: 13px;
                border: 4px solid #8a8787;
                .modal-body {

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
                }
                .primary-list {
                    /*background-color: lightseagreen;*/
                    max-height: 200px;
                    overflow: scroll;
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
                showCloseBtn: this.closeBtn,
            }
        },
        computed:{
            getActionsList: function(){
                console.log(this.$store.state.app.actions);
                return this.$store.state.app.actions;
            }
        },
        mounted() {
        },
        props: ['closeBtn'],
        methods: {
            getImgPath(name) {
                let path = this.settings.urlBase + this.settings.server + this.settings.urlSmallImage;
                path += name + '.png';
                return path;
            }
        }

    }
</script>
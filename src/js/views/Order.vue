<template>
    <div>
        <div>
            <div class='white-panel'>
                <div class="dummy-logo">
                    <img :src="urlLogo">
                </div>
            </div>
            <header>
                Вы выбрали:
            </header>
            <div class="order-list-holder">
                <table class="order-list">
                    <tr class="tr-header">
                        <td>Количество</td>
                        <td>Наименование</td>
                        <td></td>
                    </tr>
                    <template v-for="item in positions">
                        <tr class="tr-row">
                            <td>{{ item.count }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                                <div class="close-wrap">
                                    <div class="delete"><img :data-code="item.id"
                                                             @click="deleteOrder" :src="urlClose">
                                    </div>
                                </div>
                            </td>
                        <tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">

    .order-list-holder {
        text-align: center;
        position: absolute;
        left: 320px;
        top: 130px;
        color: white;
        height: 400px;
        width: 60%;
        overflow-y: auto;
        overflow-x: hidden;
        .order-list {
            border-collapse: collapse;
            width: 100%;
            float: right;
            .close-wrap {
                width: 100%;
                height: 20px;
                .delete {
                    cursor: pointer;
                    width: 20px;
                    height: 20px;
                    img {
                        width: 100%;
                    }
                }

            }
            .tr-header {
                td {
                    border-bottom: solid 4px darkgray;
                    border-top: solid 4px darkgray;
                }
            }
            .tr-row {
                td {
                    border-bottom: solid 1px darkgray;
                    border-top: solid 1px darkgray;
                }
            }
        }

    }

    header {
        position: absolute;
        left: 320px;
        top: 80px;
        height: 40px;
        width: 200px;
        color: white;
        font-size: xx-large;
    }

    .white-panel {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 100%;
        background-color: #ffffff;
        z-index: -1;
        .dummy-logo {
            position: fixed;
            top: 59px;
            left: 0;
            width: 300px;
            height: 220px;
            text-align: left;
            color: #3b3d4a;
            background: #F7F7F7;

            img {
                width: 100%;
                padding-left: 10%;
                padding-right: 10%;
                padding-top: 60px;
            }
        }
        .dummy-logo *, .dummy-logo *:after, .dummy-logo *:before {
            box-sizing: border-box;
        }
    }


</style>
<script>
    import orders from './components/data/orders';
    import sets from './components/store/currentStates';
    export default{
        data(){
            return {
                positions: orders,
                urlLogo: '',
                urlClose: ''
            }
        },

        methods:{
            deleteOrder: function(evt){
                console.log(+evt.target.dataset.code);
            }
        },
        mounted(){
            console.log(sets.settings);
            this.urlLogo = sets.settings.server + sets.settings.urlSmallImage + sets.settings.images.logo;
            this.urlClose = sets.settings.server + sets.settings.urlSmallImage + sets.settings.images.close;
        }
    }
</script>

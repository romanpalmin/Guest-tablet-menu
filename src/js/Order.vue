<template>
    <div>
        <div class="container">

            <div class="logo">
                <img :src=this.urlLogo class="logo-style">
            </div>

            <div class="content" id="content">
                <div class="overflow-content">
                    <table class="main-table">
                        <tr class="table-row ">
                            <td colspan="3" class="table-header">Вы выбрали:</td>
                        </tr>
                        <tr class="table-row">
                            <td class="table-cell col-header col1">КОЛ-ВО</td>
                            <td class="table-cell col-header col2">НАИМЕНОВАНИЕ</td>
                            <td class="table-cell col-header col3"></td>
                        </tr>
                        <template v-for="item in positions">
                            <tr class="table-row">
                                <td class="table-cell col1">{{item.count}}</td>
                                <td class="table-cell col2">{{item.name}}</td>
                                <td class="table-cell col3">
                                    <img class="delete" @click="deleteOrderById(item.code, item.stroka)"
                                         :src="urlClose">
                                </td>
                            </tr>
                        </template>
                        <template class="table-footer">
                            <tr>
                                <td class="table-header"></td>
                                <td class="table-header"></td>
                                <td class="table-header"></td>
                            </tr>
                        </template>
                        <tr class="table-row ">
                            <td colspan="3" class="footer">
                                <div class="btn-wrapper" v-if="showDeleteBtn">
                                    <div class="btn delete-all" @click="deleteAll">Удалить все выбранное</div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .container {
        .logo-style {
            width: 240px;
            padding-left: 30px;
            padding-right: 30px;
            padding-top: 60px;
        }

        .logo {
            display: block;
            width: 300px;
            height: 100vh;
            background-color: #F7F7F7;
            top: 60px;
            left: 0;
            position: absolute;
        }
        .content {
            padding-top: 60px;
            padding-left: 301px;

            .overflow-content{
                height: 600px;
                overflow: scroll;
            }

            .main-table {
                border-collapse: collapse;
                width: 90%;
                margin: 30px;
                .delete {
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    img {
                        width: 100%;
                    }
                }
                .table-header {

                }

                .table-header {
                    color: #FFFFFF;
                    font-family: sans-serif;
                    font-size: 60px;
                    width: calc(100vw - 311px);
                    height: 99px;
                    top: 0;
                }
                .table-row {
                    text-align: left;
                    padding-top: 10px;
                    padding-bottom: 10px;

                    height: 24px;
                    .footer {
                        .btn-wrapper {
                            width: 100%;
                            .btn {
                                text-align: center;
                                line-height: 39pt;
                                width: 350px;
                                margin: 0 auto;
                                color: #000000;
                                background-color: #F7F7F7;
                                font-family: sans-serif;
                                font-size: 28px;
                                border-radius: 15px;
                                user-select: none;
                                cursor: pointer;

                            }
                        }
                        border-bottom: none;

                    }

                }
                .table-cell {
                    border-bottom: #8A8A8A 1px solid;
                    color: #F7F7F7;
                    font-family: sans-serif;
                    font-size: 18px;
                    &.col1 {
                        text-align: center;
                    }
                    padding-left: 20px;
                    height: 50px;
                    border-bottom: #8A8A8A 1px solid;
                    &.col-header {
                        text-align: center;
                        border-bottom: #8A8A8A 4px solid;
                        border-top: #8A8A8A 4px solid;
                        font-family: sans-serif;
                        font-size: 18px;
                        &.col1 {
                            width: 15%;
                        }
                        &.col2 {
                            width: 75%;
                        }
                        &.col3 {
                            width: 10%;
                        }
                    }
                }
            }
        }

    }
</style>
<script>
    import state from './components/store/currentStates';
    import _ from 'lodash';

    let orderState = state.appState.orders;

    export default{
        data(){
            return {
                positions: [],
                urlLogo: '',
                urlClose: '',
                showDeleteBtn: false
            }
        },

        watch:{
            positions : function(){
                this.showDeleteBtn = this.positions.length && this.positions.length > 0;

            }
        },

        methods:{
            deleteOrderById: function(id, stroka){
                this.positions = _.without(this.positions, _.find(this.positions, {code:id, stroka:stroka}))
                orderState.currentState = this.positions;
                let url = '/menu/hs/model?groups=342020&tovar='+id+'&dellcartitem=' + stroka;
                this.axios.get(url)
                        .then((response) => {
                            })
                        .catch( (error) => {
                            console.log(error);
                        });
            },
            deleteAll: function() {
                let url = '/menu/hs/model?groups=342020&delcart=1&tovar=1';
                this.positions = [];
                this.axios.get(url)
                        .then((response) => {
                            this.showDeleteBtn = false;
                            })
                        .catch( (error) => {
                            console.log(error);
                        });
            },

            getJson: function(){
                let url = state.settings.server + '/menu/hs/model?groups=1&korzina=1';

                this.axios.get(url)
                        .then((response) => {
                            this.positions = response.data;
                            orderState.currentState = response.data;
                        })
                        .catch( (error) => {
                            console.log(error);
                        });
            }
        },
        mounted(){
            this.urlLogo = state.settings.server + state.settings.urlSmallImage + state.settings.images.logo;
            this.urlClose = state.settings.server + state.settings.urlSmallImage + state.settings.images.close;
            if (orderState.currentState.length === 0){
                this.getJson();
            } else {
                this.positions = orderState.currentState;
            }

        }
}




</script>

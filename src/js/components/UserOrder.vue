<template>
    <div>
        <div class="container">
            <div class="content" id="content">
                <div class="header-title">Вы выбрали:</div>
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
        .content {
            padding-top: 30px;
            padding-left: 301px;

            .header-title{
                color: #fff;
                font-family: sans-serif;
                font-size: 60px;
                width: -211vw;
                height: 99px;
                top: 0;
                margin-left: 30px;
            }

            .overflow-content{
                height: 600px;
                overflow-y: scroll;
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
    import state from './store/currentStates';
    import ajax from './helpers/ajax';
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
                const operation = {};
                operation.name = 'deleteFromOrder';
                operation.id = id;
                operation.stroka = stroka;
                ajax.exec(operation);
            },
            deleteAll: function() {
                this.positions = [];
                orderState.currentState = this.positions;
                const operation = {name:'clearOrder'};
                ajax.exec(operation);
            },

            getJson: function(){
                const self = this;
                const operation = {};
                if (orderState.currentState.length === 0){
                    operation.name = 'order';
                    ajax.exec(operation, function(response){
                        self.positions = response.data;
                        orderState.currentState = response.data;
                    });
                } else {
                    this.positions = orderState.currentState;
                }

            }
        },
        mounted(){
            this.urlLogo = state.settings.server + state.settings.urlSmallImage + state.settings.images.logo;
            this.urlClose = state.settings.server + state.settings.urlSmallImage + state.settings.images.close;
            this.getJson();
        }
}

</script>

<template>
    <div>
        <div class="container">
            <div class="content" id="content">
                <div class="header-title">{{words.title}}</div>
                <div class="overflow-content">
                    <table class="main-table">
                        <tr class="table-row">
                            <td class="table-cell col-header col1">{{words.qty}}</td>
                            <td class="table-cell col-header col2">{{words.name}}</td>
                            <td class="table-cell col-header col3"></td>
                            <td class="table-cell col-header col4"></td>
                        </tr>
                        <template v-for="item in unionStrings">
                            <tr class="table-row">
                                <td class="table-cell col1">
                                    <div class="btn-plus_minus minus" :style="addingToCartStyle"
                                         @click="minus(item.code)">-
                                    </div>
                                    {{item.stroka.length}}
                                    <div class="btn-plus_minus plus" :style="addingToCartStyle" :data-code="item.code"
                                         @click="setCurrentPressedPlus" @click="plus(item.code)">+
                                    </div>
                                </td>
                                <td class="table-cell col2">
                                    <template v-if="$store.state.settings.language === 'ru'">
                                        {{item.nameRU | deleteQuotes}}
                                    </template>
                                    <template v-else>
                                        {{item.nameEN | deleteQuotes}}
                                    </template>
                                </td>

                                <td class="table-cell col3">
                                    {{item.price}}×{{(+item.stroka.length)}} ₽
                                </td>
                                <td class="table-cell col4">
                                    <img class="delete" @click="deleteFullPositionsNew(item.code)"
                                         :src="urlClose">
                                </td>
                            </tr>
                        </template>
                        <tr class="table-row summary" v-if="showDeleteBtn">
                            <td colspan="2" class="check-order-string">
                                {{words.checkOrder}}
                            </td>
                            <td class="">{{words.summary}}</td>
                            <td class=""> {{summary}} ₽</td>
                        </tr>
                        <template class="table-footer">
                            <tr>
                                <td class="table-header"></td>
                                <td class="table-header"></td>
                                <td class="table-header"></td>
                                <td class="table-header"></td>
                            </tr>
                        </template>

                        <tr class="table-row ">
                            <td colspan="4" class="footer">
                                <div class="btn-wrapper" v-if="showDeleteBtn">
                                    <div class="btn delete-all" @click="deleteAll">{{words.delete}}</div>
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

            .header-title {
                color: #fff;
                font-family: sans-serif;
                font-size: 60px;
                width: -211vw;
                top: 0;
                margin-left: 30px;
                padding-top: 40px;
            }

            .overflow-content {
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
                    &.summary {
                        height: 100px;
                        font-size: 14pt;
                        font-weight: 600;
                    }
                    td.check-order-string {
                        text-align: center;
                    }
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
                    .btn-plus_minus {
                        width: 22px;
                        height: 22px;
                        border-radius: 6px;
                        line-height: 22px;
                        background-color: gray;
                        &.plus {
                            float: right;
                            margin-right: 20px;
                        }
                        &.minus {
                            float: left;
                            margin-left: 20px;
                        }
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
                            width: 60%;
                        }
                        &.col3 {
                            width: 15%;
                        }
                        &.col4 {
                            width: 10%;
                        }
                    }
                }
            }
        }

    }
</style>
<script>
    import _ from 'lodash';

    export default {
        data() {
            return {
                positions: [],
                urlLogo: '',
                urlClose: '',
                showDeleteBtn: false,
                isAdding: false,
                currentPressedKey: [],
                store: this.$store.state
            }
        },

        computed: {
            unionStrings: function () {
                let res = [];
                _.forEach(_.groupBy(this.positions, 'code'), item => {
                    let strArray = [];
                    let row = {};
                    _.forEach(item, str => {
                        if (str.stroka) {
                            strArray.push(str.stroka);
                        }
                    });
                    let it = this.getItem(item[0].code)[0];
                    if (it) {
                        row = {
                            client: item[0].client,
                            code: item[0].code,
                            name: item[0].name,
                            nameEN: it.name_en,
                            nameRU: it.name_ru,
                            price: it.price,
                            stroka: strArray,
                        };
                        if (row.code) {
                            res.push(row);
                        }
                    }
                });
                return res;
            },
            summary() {
                //console.log(this.$store.state.app.FullTree);
                let res = this.unionStrings.reduce((sum, currentItem) => {
                    return sum + currentItem.price * currentItem.stroka.length;
                }, 0);
                return res;
            },
            addingToCartStyle: function () {
                return this.isAdding ? "color:darkgrey" : '';
            },
            words: function () {
                let words = {};
                if (this.store.settings.language === 'ru') {
                    words.title = 'Вы выбрали:';
                    words.qty = 'КОЛ-ВО';
                    words.name = 'НАИМЕНОВАНИЕ';
                    words.delete = 'Удалить все выбранное';
                    words.checkOrder = 'Проверьте Ваш заказ и позовите официанта. Приятного аппетита.';
                    words.summary = 'ИТОГО:';
                }
                else {
                    words.title = 'Your order:';
                    words.qty = 'Q-ty';
                    words.name = 'NAME';
                    words.delete = 'Delete all';
                    words.checkOrder = 'Check your order and call the waiter. Bon appetit.';
                    words.summary = 'IN TOTAL:';
                }
                return words;
            }

        },

        watch: {
            positions: function () {
                this.showDeleteBtn = this.positions && this.positions.length && this.positions.length > 0;
            }
        },

        filters: {
            deleteQuotes: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/&QUOT/g, '"');
            }
        },

        methods: {
            getItem(code) {
                return _.filter(this.$store.state.app.SourceTree.items, item => {
                    return item.code === code;
                });
            },

            showState: function () {
                //console.log(orderState);
            },

            showArr: function () {
                //console.log(this.currentPressedKey);
            },

            isInArray: function (id) {
                for (let i = 0; i < this.currentPressedKey.length; i++) {
                    if (this.currentPressedKey[i] === id) {
                        return true;
                    }
                }
                return false;
            },

            setCurrentPressedPlus: function (evt) {
                this.currentPressedKey.push(evt.target.dataset.code);
            },

            plus: function (id) {
                if (this.isAdding) return;
                this.isAdding = true;
                let self = this;
                const payload = {
                    positionId: id,
                    count: 1,
                    tableId: this.store.app.TableNumberPrimary,
                    callback: function () {
                        self.isAdding = false;
                        let idx = self.currentPressedKey.indexOf(id);
                        self.currentPressedKey.splice(idx, 1);
                        self.positions = _.map(self.$store.state.app.orders, function (item) {
                            return item;
                        });
                    }
                };
                this.$store.dispatch('ADD_TO_CART', payload);
            },

            minus: function (id) {
                if (this.isAdding) return;
                let positionsCodesArray = _.find(this.positions, {code: id});
                if (positionsCodesArray.length === 0) {
                    return 0;
                }
                this.deleteOrderById(id, positionsCodesArray.stroka);
            },

            deleteFullPositions: function (id) {
                let positionsCodesArray = _.filter(this.positions, {code: id});
                for (let i = 0; i < positionsCodesArray.length; i++) {
                    let stroka = positionsCodesArray[i].stroka;
                    this.deleteOrderById(id, stroka);
                }
            },

            deleteFullPositionsNew: function (id) {
                this.isAdding = true;
                const self = this;
                const payload = {
                    positionId: id,
                    callback: function () {
                        self.isAdding = false;
                        self.positions = self.store.app.orders;
                    }
                };
                this.$store.dispatch('EMPTY_STRING_BY_ID', payload);
            },

            deleteOrderById: function (id, stroka) {
                this.isAdding = true;
                //this.positions = _.without(this.positions, _.find(this.positions, {code: id, stroka: stroka}))
                const self = this;
                const payload = {
                    id: id,
                    stroka: stroka,
                    callback: function () {
                        self.$store.dispatch('GET_ORDERS');
                        self.isAdding = false;
                        self.positions = self.store.app.orders;
                    }
                };
                this.$store.dispatch('DELETE_ORDER_BY_ID', payload);
            },

            deleteAll: function () {
                const self = this;
                const payload = {
                    callback: function () {
                        self.positions = [];
                    }
                };
                this.$store.dispatch('EMPTY_ORDERS_FULL', payload);

            },

            getJson: function (isUpdate) {
                const self = this;

                if (this.store.app.orders && this.store.app.orders.length === 0 || isUpdate) {
                    let payload = {
                        callback: function () {
                            self.positions = self.store.app.orders;
                        }
                    };
                    this.$store.dispatch('GET_ORDERS', payload);
                    self.$store.commit('INCREMENT_ORDER_COUNTER');
                } else {
                    self.positions = this.store.app.orders;
                }
            }

        },
        mounted() {
            const self = this;
            this.urlLogo = this.$store.state.settings.urlBase + this.store.settings.urlSmallImage + this.store.settings.images.logo;
            this.urlClose = this.$store.state.settings.urlBase + this.store.settings.urlSmallImage + this.store.settings.images.close;
            this.getJson();
            /*let upTimer = setInterval(function () {
             self.getJson(true);
             }, 30000);*/
        }
    }

</script>

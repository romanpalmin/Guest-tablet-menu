<template>
    <div>
        <div class="main-frame">
            <button class="btn-refresh" @click="getData">{{words.button}}</button>
            <table class="main-table">
                <tr>
                    <th>{{words.tablet}}</th>
                    <th>{{words.table}}</th>
                </tr>
                <template v-for="item in list">
                    <tr>
                        <td>{{item.planshet}}</td>
                        <td>{{item.table}}</td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template>
<style scoped lang="less">
    .main-frame{
        width: 100%;
        text-align: center;
        .btn-refresh{
            width: 297px;
            height: 40px;
            margin-bottom: 30px;
        }
        .main-table{
            text-align: center;
            background-color: #cecece;
            border-collapse: collapse;
            margin: 0 auto;
            color: black;
            width: 300px;
            td,th{
                border: 1px solid;
            }
        }
    }
</style>
<script>
    import ajax from './components/helpers/ajax.js';
    export default{
        data(){
            return{
                msg:'',
                list:[]
            }
        },
        computed:{
            words: function(){
                let words = {};
                if (this.$store.state.settings.language === 'ru'){
                    words.button = 'Обновить данные по столам и планшетам';
                    words.tablet='Планшет';
                    words.table='Стол';
                }
                else {
                    words.button = 'Refresh data';
                    words.tablet='Tablet';
                    words.table='Table';
                }
                return words;
            }
        },
        mounted(){
            this.$parent.showMenu = false;
            this.getData();
            setTimeout(function(){
                this.getData();
            }, state.settings.whereTabletFrequency);
        },
        methods:{
            getData(){
                const self = this;
                ajax.exec({'name':'whereTablets'}, function (resp) {
                    self.list = resp.data;
                });
            },

        }
    }
</script>

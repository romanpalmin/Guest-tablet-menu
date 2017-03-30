<template>
    <div>
        <div class="main-frame">
            <button @click="getData">Обновить данные по столам и планшетам</button>
            <table class="main-table">
                <tr>
                    <th>Планшет</th>
                    <th>Стол</th>
                </tr>
              <!--  <template>-->
                    <tr>
                        <td>2</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                    </tr>
               <!-- </template>-->
            </table>
        </div>
    </div>
</template>
<style scoped lang="less">
    .main-frame{
        width: 100%;
        text-align: center;
        .main-table{
            text-align: center;
            background-color: #cecece;
            border-collapse: collapse;
            td{
                border: 1px;
            }
        }
    }
</style>
<script>
    import state from './components/store/currentStates';
    import ajax from './components/helpers/ajax.js';
    export default{
        data(){
            return{
                msg:'',
                list:{}
            }
        },
        mounted(){
            this.$parent.showMenu = false;

        },
        methods:{
            getData(){
                const self = this;
                let options = {'name':'whereTablets'};
                ajax.exec(operation, function (resp) {
                    self.list = resp.data;
                });
            }
        }
    }
</script>

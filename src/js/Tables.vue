<template>
    <div class="tables">
        <div>
            <ul class="root-tables">
                <li class='root-table' v-for="n in 100"> <div class="single-table" @click=getTableNumber(n)>{{ n }} </div></li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="less">
    .tables {
        padding-top: 20px;
        .root-tables{
            align-items: center;
            text-align: center;
            .root-table{
                display: inline-block;
                width: 50px;
                height: 50px;
                margin-top: 20px;
                margin-right: 20px;
                margin-left: 20px;
                .single-table{
                    width: 40px;
                    height: 40px;
                    background-color: #757575;
                    margin: 0 auto;
                    line-height: 40px;
                    cursor: pointer;
                    color: white;
                }
            }
        }
        .table {
            width: 50px;
            height: 50px;
            background-color: darkgray;
            margin: 5px;
        }
    }
</style>
<script>
    import state from './components/store/currentStates';
    export default{
        data(){
            return{
                msg:'Choose table manually'
            }
        },
        methods:{
            getTableNumber( num ){
                state.appState.TableNumber = num;
                alert(`Стол №${state.appState.TableNumber} выбран вручную.`);
            }
        }
    }

</script>

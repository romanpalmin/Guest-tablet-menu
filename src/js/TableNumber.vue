<template>
    <div>
        <div class="tableNameTitle"><br/><br/><br/>
            Номер стола: {{table}}<br />
        </div>

    </div>
</template>
<style scoped lang="less">
.tableNameTitle{
    width: 100%;
    height: 780px;
    background-color: #000;
    color: #fff;
    font-size: xx-large;;
    text-align: center;
}
</style>
<script>
    import state from './components/store/currentStates';
    export default{
        data(){
            return{
                msg:'Номер стола',
                table: state.appState.TableNumberPrimary
            }
        },
        computed:{
            tableNumber: function(){
                return this.table;
            }
        },
        watched: {
            table : function(){
                console.log('Данные изменились');
            }
        },
        mounted(){
            let self = this;
            setInterval(function(){
                console.log(state.appState.TableNumberPrimary);
                self.table = state.appState.TableNumberPrimary;
             }, 1000)
        }
    }

</script>

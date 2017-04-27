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
    height: 93vh;


    color: #fff;
    font-size: xx-large;;
    text-align: center;
}
</style>
<script>
    export default{
        data(){
            return{
                msg:'Номер стола',
                table: this.$store.state.app.TableNumberPrimary
            }
        },
        computed:{
            tableNumber: function(){
                return this.table;
            }
        },
        mounted(){
            let self = this;
            setInterval(function(){
                self.table = self.$store.state.app.TableNumberPrimary;
             }, 1000)
        }
    }

</script>

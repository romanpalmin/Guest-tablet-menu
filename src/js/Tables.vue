<template>
    <div class="tsbles">
        <div>Tables</div>
        <div>
            <ul class="root-tables">
                <li class='root-table' v-for="n in 100"> <div class="single-table">{{ n }} </div></li>
            </ul>
        </div>
    </div>
</template>
<style scoped lang="less">
    .tables {
        padding-top: 20px;
        .root-tables{
            display: inline;
            align-items: center;
            text-align: center;
            padding: 0;
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
    export default{
        data(){
            return{
                msg:'Choose table manually'
            }
        }
    }

</script>

<template>
    <div>
        <div>this is template body</div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import _ from 'lodash'
    export default{
        data(){
            return{
                name:'this component',
                data: {}
            }
        },
        methods:{
            getNewJson(){
                this.$store.dispatch('GET_FULL_TREE');
            }
        },
        mounted() {
            if (this.$store.state.app.FullTree && this.$store.state.app.FullTree.length === 0){
                console.log('Формируем новые данные ');
                this.getNewJson();
            }
            else {
                console.log('Данные уже загружены');
            }
        }
    }
</script>
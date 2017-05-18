<template>
    <div>
        <sidebar :categoryId="currentCategoryId" />
        <div class="list">
            <positionslist :categoryId="currentCategoryId"/>
        </div>
    </div>
</template>
<style scoped lang="less">
    .list {
        padding-left: 300px;
    }
</style>
<script>
    import positionslist from './PositionsList.vue';
    import sidebar from './SideBar.vue';

    export default{
        data(){
            return{
                currentSelectedId: this.$route.params.id
            }
        },
        computed: {
            currentCategoryId: function(){
                let newVal = this.$route.params.id;
                return newVal;
            }
        },

        components:{
            positionslist,
            sidebar
        },
        mounted(){
            //alert(this.$route.params.id);
        }
    }


</script>

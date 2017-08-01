<template>
    <div>
        <sidebar :categoryId="currentCategoryId"/>
        <div class="list">
            <positionslistNew :categoryId="currentCategoryId"/>
            <vm-back-top></vm-back-top>
        </div>

    </div>
</template>
<style scoped lang="less">
    .list {
        padding-left: 300px;
    }
</style>
<script>
    import positionslistNew from './PositionsListNew.vue';
    import sidebar from './SideBar.vue';
    import VmBackTop from 'vue-multiple-back-top'

    export default{
        data(){
            return {
                currentSelectedId: this.$route.params.id
            }
        },
        computed: {
            currentCategoryId: function () {
                let newVal = this.$route.params.id;
                return newVal;
            }
        },

        components: {
            positionslistNew,
            sidebar,
            'vm-back-top': VmBackTop
        },
        mounted(){
        }
    }
</script>

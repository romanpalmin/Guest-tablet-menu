<template>
    <div>
        <div class="bg-panel">
            <sidebar/>
        </div>
        <userorder/>
    </div>
</template>
<style scoped lang="less">
    .bg-panel {
        width: 300px;
        height: 100%;
        background-color: white;
        display: block;
        position: absolute;
    }

</style>
<script>
    import sidebar from './components/SideBar.vue'
    import userorder from './components/UserOrder.vue'
    export default{
        components:{
            sidebar,
            userorder
        }
    }


</script>

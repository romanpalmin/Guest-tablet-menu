<template>
    <div>
        <div class="left-panel">
            <sidebar/>
        </div>
        <div class="right-panel">
            <userorder/>
        </div>
    </div>
</template>
<style scoped lang="less">
    .left-panel {
        width: 300px;
        height: 100vh;
        background-color: #ffffff;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
    .right-panel{
        opacity: 1;
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

<template>
    <div>
        <sidebar/>
        <userorder/>
    </div>
</template>
<style>

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

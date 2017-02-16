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
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            sidebar,
            userorder
        }
    }
</script>

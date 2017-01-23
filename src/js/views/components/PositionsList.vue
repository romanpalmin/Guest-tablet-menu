<template>
    <div>
        <div>this is template body </div>
    </div>
</template>
<style>
    p{
        background-color:#ff0000;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        ready: function(){
            console.log(this);
        },
        components:{

        }
    }
</script>

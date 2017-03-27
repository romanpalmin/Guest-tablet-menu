<template>
    <div>
        <div>this is template body</div>
    </div>
</template>
<style>
</style>
<script>
    import state from './components/store/currentStates';
    import ajax from './components/helpers/ajax';

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        mounted(){
            let operation = {};
            operation.name = 'getBle';
            ajax.exec(operation, function(resp){
                console.log(resp.data);
            });
        }
    }
</script>

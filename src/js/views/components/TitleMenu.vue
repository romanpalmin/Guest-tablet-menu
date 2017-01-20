<template>
    <div>
        <div>Большое меню</div>
        <button @click="switchView">Переключиться</button>
        <p>{{msg}}</p>
    </div>
</template>

<style>
    p{

    }
</style>

<script>
    export default{
        data(){
            return{
                msg:'hello vue menu'
            }
        },
        methods:{
            switchView: function(){
                console.log('Переключаем на тип');
                console.log(this);
                if(this.view === 'TitleMenu'){
                    console.log(123);
                }
            }
        }
    }
</script>

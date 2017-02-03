<template>
    <div>
        <mainMenu />
    </div>
</template>

<script>
    import mainMenu from './components/MainMenu.vue';
    import $ from 'jquery'
    export default{
        data(){
            return{
                msg:'Загружаем компонент списка бургеров',
                items:[]
            }
        },
        components:{
            mainMenu
        },
        mounted: function(){
        console.log('Проверим аякс');





        $.ajax({
            url: "http://tab01:01@10.10.250.61/menu/hs/model?groups=",
            method: 'GET'
        }).done(function(resp) {
         console.log(resp);
        });


        }
    }
</script>

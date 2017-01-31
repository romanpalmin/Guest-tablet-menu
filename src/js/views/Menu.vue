<template>
    <div>
        <mainMenu />
    </div>
</template>

<script>
    import mainMenu from './components/MainMenu.vue';
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
            var api = 'http://DataExchange:123456@birzhaserv/menu/hs/display/get-current-actions';
            var api2 = 'http://DataExchange:123456@birzhaserv/menu/hs/display/get-super-action';
            console.log('Почему бы и не здесь');

            this.axios.get(api).then((response) => {
              console.log(response.data)
            });
            this.axios.get(api2).then((response) => {
              console.log(response.data)
            });
        }
    }
</script>

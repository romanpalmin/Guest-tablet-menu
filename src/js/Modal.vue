<template>
    <div>
        <div>
            <modal v-if="showModal" @close="closeModal()">
                <h3 slot="body">Включенв BT</h3>
                <h3 slot="header">Заголовок</h3>
            </modal>
        </div>
        <br/>
    </div>
</template>
<style>
</style>
<script>
    import state from './components/store/currentStates';
    import ajax from './components/helpers/ajax';
    import modal from './components/ModalWindow.vue';

    export default{
        data(){
            return{
                msg:'hello vue',
                showModal: true
            }
        },
        props:{

        },
        mounted(){
           // let operation = {};
           // operation.name = 'getBle';
           // ajax.exec(operation, function(resp){
           //     console.log(resp.data);
           // });
        },
        components:{
            modal
        },
        methods:{
            closeModal(){
                this.showModal = false;
                this.$router.replace('/ru/menu');
            }
        }
    }

</script>

<template>
    <div>
        <div class="modal-page-wrapper">
            <modal-actions :isModal="false" />
        </div>
    </div>
</template>
<style scoped lang="less">
    .modal-page-wrapper{
       /* max-height: 500px;
        min-height: 300px;*/
    }
</style>
<script>
    import modal from './components/modal-actions.vue';
    export default {
        data() {
            return {
                name: 'this component'
            }
        },
        mounted() {
        },
        components:{
            'modal-actions': modal
        }
    }
</script>
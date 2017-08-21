<template>
    <div class="content">
        <anketa closeBtn="false"/>
        <!--<actions :closeBtn="false"/>-->
    </div>

</template>
<style scoped lang="less">
    .content{
        .modal-close img{
            display: none;
        }

    }
</style>
<script>
    import modal from './components/modal-answer.vue';
    export default{
        data(){
            return{
                msg:'Стрит фуд бар'
            }
        },
        computed: {
            anketaUrl: function(){ return 'http://planshet:planshet@10.10.182.11/menu/hs/ank1/display';}
        },
        components:{
            anketa: modal/*,
            actions*/
        }
    }


</script>

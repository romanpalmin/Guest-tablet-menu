<template>
    <div>
        <div>this is template body sidebr {{$route.params.id}}</div>
        <div @click="getData"> test</div>
        <div>{{id}}</div>
    </div>
</template>
<style>
    p{
     }
</style>
<script>
   import categories from './data/category'
    export default{
        data(){
            return{
                ctgs: categories,
                id: this.$route.params.id
            }
        },
        computed: {
            ctgs_with_params: function() {
                var res = this.ctgs.map(function(item) {
                    return item;
                });
                console.log(res);
                return res;
            }
        },
        methods: {
            getData: function(){
            }
        }
    }
</script>

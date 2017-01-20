<template>
    <div>
        <div>this is template body</div>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
   import categories from './data/category'
    export default{
        data(){
            return{
                ctgs: categories
            }
        },
        computed: {
            ctgs_with_styles: function() {
                var res = this.ctgs.map(function(item) {
                    return item;
                });
                console.log(res);
                return res;
            }
        }
    }
</script>

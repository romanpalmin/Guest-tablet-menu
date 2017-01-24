<template>
    <div>
        <div class="products">

            dsdsdsdsds sd s ds s s d s
        </div>

    </div>
</template>
<style scoped lang="less">
    .products {
        width:100%;
        text-align: right;
        user-select: none;
        margin: 0px;
        padding: 1em;
        background-color: #0000cc;
    }

</style>
<script>
    import bus from './store/store';

    export default{
        data(){
            return{
                msg:'hello vue',
                currentCatId: this.categoryId
            }
        },
        props: ["categoryId"],

        computed: {
            catId: function(){
                return this.currentCatId;
            }
        },
        watch:{
            currentCatId: function(){
                console.log('test');
            }
        },
        mounted: function(){
            var self = this;
            this.populateData(this.currentCatId);
            bus.$on('select-cat-id', function (id) {
                this.currentCatId = id;
                self.populateData(id);
            });
        },

        destroyed: function(){
            bus.$off();
        },

        methods: {
           getData: function(){
                console.log('Первичная инициализация');
           },
           populateData: function(id){
                console.log('Заполняем данные по ID = ' + id);
           }
        }
    }

</script>

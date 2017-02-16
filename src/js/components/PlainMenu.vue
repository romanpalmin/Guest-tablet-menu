<template>
    <div>
        <sidebar />
        <div class="list">
            <positionslist :categoryId="currentCategoryId"/>
        </div>
    </div>
</template>
<style scoped lang="less">
    .list {
        padding-left: 300px;
    }
</style>
<script>
    import positionslist from './PositionsList.vue';
    import sidebar from './SideBar.vue';

    import mp from './store/currentStates';

    export default{
        data(){
            return{
                ctgs: [],
                urlLogo: '',
                currentSelectedId: this.$route.params.id
            }
        },
        computed: {
            ctgs_with_params: function() {
                var self = this;
                var res = this.ctgs.map(function(item) {
                    item.style = 'background-image: url(' + mp.settings.server + mp.settings.urlBigImage + item.urlSmallImage + ');';
                    item.route = '/ru/menu/'+ item.code;

                    if (+item.code ===+self.$route.params.id){
                        item.newClass = 'menu__link--current';
                    } else {
                        item.newClass = '';
                    }
                    return item;
                });
                return res;
            },
            currentCategoryId: function(){
                let newVal = this.$route.params.id;
                return newVal;
            }
        },

        components:{
            positionslist,
            sidebar
        },
        mounted(){
            var self = this;
             this.urlLogo = mp.settings.server +  mp.settings.urlSmallImage + mp.settings.images.logo;
             const operation = {};
             if (mp.appState.MenuPoints.length > 0){
                 self.ctgs = mp.appState.MenuPoints;
                 } else {
                    operation.name = 'categories';
                    ajax.exec(operation, function(resp){
                        self.ctgs = resp.data;
                        mp.appState.MenuPoints = resp.data;
                 });
             }
        }


    }

</script>

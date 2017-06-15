<template>
    <div class="top rolling">
        <div class="div-overlay">
            <hr />
            <div>
                <ul v-for="item in currentData">
                        <div v-if="item.groups.length===0">
                            <li>
                                {{item.name_RU}}
                                <ul v-for="item in item.items">
                                    <li>{{item.name}}</li>
                                </ul>
                            </li>
                        </div>
                        <div v-else="item.groups.length > 0">
                            <li>
                                {{item.name_RU}}
                                <ul v-for="sub1 in sortArray(item.groups)">
                                    <div v-if="sub1.groups.length===0">
                                        <li>
                                            {{sub1.name_RU}}
                                            <ul v-for="sub1item in sub1.items">
                                                <li>{{sub1item.name}}</li>
                                            </ul>
                                        </li>
                                    </div>
                                    <div v-else="sub1.groups.length > 0">
                                        {{sub1.name_RU}}
                                        <ul v-for="sub2 in item.groups">
                                            <div v-if="sub2.groups.length===0">
                                                <li>
                                                    {{sub2.name_RU}}
                                                    <ul v-for="sub2item in sub2.items">
                                                        <li>{{sub2item.name}}</li>
                                                    </ul>
                                                </li>
                                            </div>
                                            <div v-else="sub2.groups.length > 0">
                                                {{sub2.name_RU}} + ...
                                            </div>
                                        </ul>
                                    </div>
                                </ul>
                            </li>
                        </div>

                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .top{
        padding-top: 70px;
    }

    .rolling {
        overflow-y: scroll;
        height: 100vh;
    }
</style>
<script>
    import _ from 'lodash'
    export default{
        data(){
            return{
                name:'New positions list',
                data: []
            }
        },
        computed:{
            currentData: function(){
                return _.sortBy(this.data, ['order']);
            }
        },
        watch:{
            categoryId: function(){
                this.rebuildData();
            }
        },

        props: ["categoryId"],

        methods:{
            getNewJson(){
                this.$store.dispatch('GET_FULL_TREE');
            },
            sortArray(arr){
                return _.sortBy(arr, 'order');
            },
            rebuildData(){
                const self = this;
                let category = _.filter(this.$store.state.app.FullTree, function(item){
                        return item.code === self.categoryId;
                    });
                this.data = _.filter(category[0].groups, (item)=>{return !(item.items.length === 0 && item.groups.length ===0)});
            }
        },
        mounted() {
            if (this.$store.state.app.FullTree && this.$store.state.app.FullTree.length === 0){
                this.getNewJson();
            }
            else {
                console.log('Данные уже загружены');
                this.rebuildData();
            }
        }
    }

</script>
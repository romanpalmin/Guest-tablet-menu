<template>
    <div>
        <div>this is template body</div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import ajax from './components/helpers/ajax.js';
    import _ from 'lodash'
    export default{
        data(){
            return{
                name:'this component',
                data: {}
            }
        },
        methods:{
            getNewJson(){
                const self = this;
                ajax.exec({name: 'getDataNew'}, function (resp) {
                    self.formNewData(resp.data);
                });
            },
            formNewData(json){
                let roots = _.filter(json.groups, function(item){
                    if (item.parrent_code === '') {
                        // заполняем первый уровень
                        item.groups = _.filter(json.groups, function(sub1){
                            if (sub1.parrent_code !== sub1.code && sub1.parrent_code === item.code){
                                    sub1.items = _.filter(json.items, function(item1){
                                    //item1.img = загружваем на планшет
                                    return item1.parent_code === sub1.code;
                                });
                                // заполняем второй уровень
                                sub1.groups = _.filter(json.groups, function(sub2){
                                    if (sub2.parrent_code !== sub2.code && sub2.parrent_code === sub1.code){
                                            sub2.items = _.filter(json.items, function(item2){
                                            //item2.img = загружваем на планшет
                                            return item2.parent_code === sub2.code;
                                        });
                                        // Заполняем третий уровень
                                        sub2.groups = _.filter(json.groups, function(sub3){
                                            if (sub3.parrent_code !== sub3.code && sub3.parrent_code === sub2.code){
                                                    sub3.items = _.filter(json.items, function(item3){
                                                    //item3.img = загружваем на планшет
                                                    return item3.parent_code === sub3.code;
                                                });
                                                // Заполняем четвертый уровень
                                                sub3.groups = _.filter(json.groups, function(sub4){
                                                    if (sub4.parent_code !== sub4.code && sub4.parrent_code === sub3.code){
                                                        // При добавление новых уровней, добавляем фильтры по аналогичному алгоритму...
                                                        return sub4;
                                                    }
                                                })
                                                return sub3;
                                            }
                                        })
                                        return sub2;
                                    }
                                })
                                return sub1;
                            }
                        })
                        return item;
                    }});
                console.log(json);
                console.log(_.filter(roots, {'code':'332020'}));
                console.log(roots);
            }
        },
        mounted(){
            console.log('Формируем новые данные');
            this.getNewJson();
        }
    }
</script>
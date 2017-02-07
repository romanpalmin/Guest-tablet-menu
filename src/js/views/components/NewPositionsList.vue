<template>
    <div>
        <content>
            Просто {{msg}}
        </content>
    </div>
</template>
<style>
    .content{
        background-color:green;
        width: 100%;
        margin:20px;
    }



</style>
<script>
    export default{
        data(){
            return {
                resultList: [],
                msg:'hello vue',
                src: {
                    'burger': {
                        url: 'assets/data/json/burgers.json',
                        code: 332020
                    },
                    'factory': {
                        url: 'assets/data/json/factory.json',
                        code: 342020
                    },
                    'bbq': {
                        url: 'assets/data/json/bbq.json',
                        code: 352020
                    },
                    'snakes': {
                        url: 'assets/data/json/snakes.json',
                        code: 392020
                    },
                    'starts': {
                        url: 'assets/data/json/4starts.json',
                        code: 412020
                    },
                    'ice': {
                        url: 'assets/data/json/ice.json',
                        code: 422020
                    },
                    'beer': {
                        url: 'assets/data/json/beer.json',
                        code: 462020
                    },
                    'drinks': {
                        url: 'assets/data/json/drinks.json',
                        code: 432020
                    }
            }
        }
        },
        watch: {
            resultList : function(){
                console.log(this.resultList);
            }
        },

        mounted() {
            this.resultList = this.getJson('burger');
        },

        methods:
        {
            getJson: function (name) {
            console.log(name);
            var self = this;
            var testSet = {};
            var current = this.src[name];
            var urlCategory = current.url;
            console.log(urlCategory);
            //var urlCategory = 'http://10.10.250.61/menu/hs/model?groups=432020&category=432020';
            this.axios.get(urlCategory)
                .then(function (response) {
                console.log(responce);
                    //self.positions = response.data[current.code];
                    testSet = response.data[current.code];
                    return self.formatJson(testSet, current.code);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

            formatJson: function (resp, code) {
            var cur;
            var curO = [];
            if ('tovar' in resp) {
                console.log('Выводим товар');
                return resp;
            }
            else {
                for (var item in resp) {
                    var newO = {};
                    cur = resp[item];
                    for (var subitem in cur) {
                        var curSubItem = cur[subitem];
                        if (curSubItem === 'ИКОНКАМИ' || curSubItem === 'СПИСКОМ') {
                            if (curSubItem === 'ИКОНКАМИ') {
                                newO.type = 'icons';
                            }
                            if (curSubItem === 'СПИСКОМ') {
                                newO.type = 'list';
                            }
                        } else {
                            newO.name = subitem;
                            if ('tovar' in curSubItem) {
                                newO.items = curSubItem['tovar'];
                                newO.groups = [];
                            } else {
                                var groups = [];
                                for (var it in curSubItem) {
                                    var newSO = {};
                                    var curSubItemIt = curSubItem[it]
                                    for (var nso in curSubItemIt) {
                                        var curSubItemItNso = curSubItemIt[nso];
                                        if (curSubItemItNso === 'ИКОНКАМИ' || curSubItemItNso === 'СПИСКОМ') {
                                            if (curSubItemItNso === 'ИКОНКАМИ') {
                                                newSO.type = 'icons';
                                            }
                                            if (curSubItemItNso === 'СПИСКОМ') {
                                                newSO.type = 'list';
                                            }
                                        }
                                        else {
                                            newSO.name = nso;
                                            if ('tovar' in curSubItemItNso) {
                                                newSO.items = curSubItemItNso['tovar'];
                                                newSO.groups = [];
                                            }
                                            else {
                                                //todo в худшем случае
                                            }
                                        }
                                    }
                                    groups.push(newSO);
                                }
                                newO.groups = groups;
                            }
                        }
                    }
                    curO.push(newO);
                    console.log(curO);
                }
                return curO;
            }

    }
    }
    }
</script>

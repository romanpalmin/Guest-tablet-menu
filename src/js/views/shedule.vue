<template>
    <div>
        <div class="watch-container">
            <div class="watch-content" v-for="dayItem in fixedShedule">
                <div class="day-date">{{ dayItem.daydate }}</div>
                <div class="day-descr">{{ dayItem.daydescr }}</div>
                <div class="day-content" v-for="contentItem in dayItem.daycontent">
                    <div class="event-header">
                        <div class="event-time">
                            <div class="event-time-begin">{{ contentItem.event.timebegin }}</div>
                        </div>
                        <div class="event-type">{{ contentItem.event.eventtype }}</div>
                    </div>
                    <div class="event-descr-row">
                        <div class="event-descr-cell">{{ contentItem.event.description  }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .watch-container {
        width: 100%;
        height: 100vh;
        display: block;
        text-align: center;
        vertical-align: top;
        overflow-y: auto;
        overflow-x: hidden;

        .watch-content {
            width: 28vw;
            display: inline-block;
            vertical-align: top;
            padding: 30px;
        }
        .day-date {
            text-align: left;
            padding: 10px;
            background-color: #F7F7F7;
            color: #000000;
            font-size: 36px;
        }
        .day-descr {
            text-align: left;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
            background-color: #F7F7F7;
            color: #000000;
            font-size: 26px;
            margin-bottom: 15px;
        }
        .day-content {
            text-align: left;
            display: table;
            .event-header {
                display: block;
                width: 100%;
                margin-top: 15px;
                padding-top: 5px;
                padding-bottom: 5px;
                .event-time {
                    font-size: 24px;
                    display: inline-block;
                    width: 76px;
                    text-align: center;
                    background-color: #F7F7F7;
                    color: #000000;
                    .event-time-begin {
                    }
                }
                .event-type {
                    font-size: 24px;
                    display: inline-table;
                    width: calc(28vw - 80px);
                    color: #FFFFFF;
                }
            }
            .event-descr-row {
                display: block;
                width: 28vw;
                margin-bottom: 15px;
                padding-left: 80px;
                .event-descr-cell {
                    display: block;
                    width: 100%;
                    font-size: 18px;
                }
            }

        }
    }
</style>
<script>

//import shedule from './components/data/watches';
    export default{
        data(){
            return {
                rasp : []
            }
        },
        computed: {
            fixedShedule: function(){
                return this.rasp;
            }
        },

        filters: {
            replaceHash : function( value ){
                return value.replace('#', '"');
            }
        },

        methods:{
            parseJson: function(json){
                var res = [];
                var dayEvent = {};
                var day = {};
                console.log(json);
                for (var item in json){
                    var dayEvents = [];
                    day.daydate = item;
                    day.daydescr = json[item]["День"];

                    var events = json[item]["события"];
                    for (var event in events){
                        var dayEvent = {
                            'event':{
                                'timebegin': events[event]["Время"],
                                'eventtype': events[event]["ВидМероприятия_Наименование"],
                                'description': events[event]["Наименование"]
                            }
                        }
                        dayEvents.push(dayEvent);
                    }
                    day.daycontent = dayEvents;
                    res.push(day);
                }
                console.log(JSON.srtingify(res));
                this.rasp = res;
            },

            getShow: function(){
                var self = this;
                //var url = 'http://10.10.250.61/menu/hs/model?groups=1&shows=1';
                var url = './assets/data/shows.json';
                this.axios.get(url)
                        .then(function (response) {
                            self.ctgs = self.parseJson(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        },

        mounted() {
            this.getShow();
        }
    }


</script>

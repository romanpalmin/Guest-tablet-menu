<template>
    <div>
        <div class="watch-container">
            <!-- Блок сайдбара -->
            <div class="shedule-sidebar">
                <!-- Заголовки сайдбара -->
                <div class="shedule-sidebar-header">
                    <div class="tv" @click="currentType='tv'"><img :src="getImg('sport-tv')" /></div>
                    <div class="events" @click="currentType='events'"><img :src="getImg('events')" /></div>
                </div>
                <!-- Список дней на сайдбаре -->
                <div class="shedule-days-list" v-if="currentType==='tv'">
                    <div class="day-week" v-for="days, index in daysWeek" @click="currentDayIndex=index; currentContent=days.daycontent">
                        <template v-if="$store.state.settings.language === 'ru'">
                            <div :class="index === currentDayIndex ? 'day-week-abbr selected' : 'day-week-abbr'">
                                {{days.daydescRU}}
                            </div>
                            <div :class="index === currentDayIndex ? 'day-week-str selected' : 'day-week-str'">
                                {{days.datedayRU}}
                            </div>
                        </template>
                        <template v-else>
                            <div :class="index === currentDayIndex ? 'day-week-abbr selected' : 'day-week-abbr'">
                                {{days.daydescEN}}
                            </div>
                            <div :class="index === currentDayIndex ? 'day-week-str selected' : 'day-week-str'">
                                {{days.datedayEN}}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <!-- Блок BODY -->
            <div class="shedule-body">
                <div class="shedule-body-tv" v-if="currentType==='tv'">
                    <div class="watch-content" v-for="(value, key) in dayContent">
                        <div class="hall-title">{{key === '' ? 'Зал не определен' : key}}</div>
                        <div class="day-descr" ></div>
                        <div class="day-content"  v-for="contentItem in dayContent[key]">
                            <div class="event-header">
                                <div class="event-time">
                                    <div class="event-time-begin">{{ contentItem.event.timebegin }}</div>
                                </div>
                                <div class="event-type">{{ contentItem.event.eventtype }}</div>
                            </div>
                            <div class="event-descr-row">
                                <div class="event-descr-cell">{{ contentItem.event.description | deleteQuotes}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shedule-body-events" v-if="currentType==='events'">
                    EVENTS
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .watch-container {
        width: 100%;
        /*height: 100vh;*/
        display: block;
        text-align: center;
        vertical-align: top;
        overflow-y: auto;
        overflow-x: hidden;
        padding-top: 40px;
        .shedule-sidebar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 300px;
            background-color: white;
            .shedule-sidebar-header {
                margin-top: 80px;
                .tv {
                    cursor: pointer;
                    float: left;
                    padding-left: 5px;
                }
                .events {
                    float: right;
                    cursor: pointer;
                    padding-right: 5px;
                }
            }
            .shedule-days-list {
                float: left;
                margin-top: 50px;
                width: 100%;
                .day-week {
                    text-align: left;
                    padding-left: 10px;
                    padding-bottom: 4px;
                    cursor: pointer;
                    font-size: 20pt;
                    &-abbr {
                        background-color: black;
                        color: white;
                        float: left;
                        width: 60px;
                        text-align: center;
                        border-radius: 4px;
                        &.selected {
                            background-color: red;
                        }
                    }
                    &-str {
                        background-color: white;
                        color: black;
                        padding-left: 70px;
                        &.selected {
                            color: red;
                        }
                    }
                }
            }
        }

        .shedule-body {
            padding-left: 300px;
            display: block;
            height: 100%;
            &-tv {
                padding-top: 100px;
                .watch-content {
                    width: 28vw;
                    display: inline-block;
                    vertical-align: top;
                    padding: 30px;
                }
                .hall-title {
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
                &-events {
                    padding-top: 100px;
                    background-color: #232eff;
                }
            }
        }
    }
</style>
<script>
    import ajax from './components/helpers/ajax.js';

    export default {
        data() {
            return {
                rasp: [],
                settings: this.$store.state.settings,
                currentType: 'tv',
                currentDayWeek: '',
                currentDayIndex: '',
                currentContent: []
            }
        },
        computed: {
            fixedShedule: function () {
                return this.rasp;
            },
            daysWeek: function () {
                if (!this.rasp.schedule) return;
                let list = this.rasp.schedule.map((item, index) => {
                    let res = {
                        datedayRU: item.daydateRU,
                        datedayEN: item.daydateEN,
                        daydescEN: item.daydescEN,
                        daydescRU: item.daydescRU,
                        daycontent: item.daycontent

                    };
                    if (index === 0 && this.currentDayIndex === '') {
                        this.currentDayIndex = 0;
                        this.currentContent = item.daycontent;
                    }
                    return res;
                });
                return list;
            },
            dayContent: function(){
                let res = _.groupBy(this.currentContent, item => item.event.hallCode);
                return res;
            }
        },

        methods: {
            getImg(name){
                let path = this.settings.urlBase + this.settings.server + this.settings.urlSmallImage;
                path += name + '.png';
                return path;
            },
            getShow: function () {
                const self = this;
                const payload = {
                    callback: function () {
                        /*self.rasp = _.map(self.$store.state.app.show, function (item) {
                            return item;
                        });*/
                        self.rasp = self.$store.state.app.show;
                    }
                };
                this.$store.dispatch('GET_SHOW', payload);
            }
        },
        filters: {
            deleteQuotes: function (value) {
                if (!value) return '';
                value = value.toString();
                return value.replace(/&quot/g, '"');
            }
        },

        mounted() {
            const self = this;
            if (this.$store.state.app.show.length === 0) {
                console.log('Заполняем');
                this.getShow();
            } else {
                console.log('Из кэша');
                /*this.rasp = _.map(this.$store.state.app.show, function (item) {
                    return item;
                });*/
                this.rasp = this.$store.state.app.show;
            }
        }
    }
</script>

<template>
    <div>

        <div class="main-menu" v-if="menuType === 'Main'">
            <div>Основное меню :</div>
            <ul class="root-icons">
                <li class="root-icon" v-for="item in ctgs_with_styles" @click="changeMenu">
                    <a :root-data-code="item.code">
                        <div class="root-icon-image" :style="item.style">
                            <div class="root-icon-descr">
                                {{ item.name }}
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

        <div class="sidebar-menu" v-if="menuType === 'Sidebar'">
            <div>Боковое меню:</div>

        </div>
    </div>
</template>
<style scoped lang="less">
    .main-menu {
        .root-icon-descr {
            color: #FFFFFF;
            position: relative;
            height: 35px;
            top: 280px;
            text-align: center;
            padding-top: 5px;
        }

        .root-icon-image {
            background-size: cover;
            width: 280px;
            height: 280px;
        }

        .root-icons {
            display: inline;
            align-items: center;
            text-align: center;
            padding: 0;
        }

        .root-icon {
            display: inline-block;
            width: 280px;
            height: 315px;
            margin-top: 30px;
            margin-right: 30px;
        }

        a {
            text-decoration: none;
            color: #000;
            outline: none;
        }
    }

    .sidebar-menu {
        .dummy-logo {
            position: fixed;
            top: 0;
            left: 0;
            width: 300px;
            height: 220px;
            text-align: center;
            color: #3b3d4a;
            background: #F7F7F7;
        }
    }

</style>
<script>
    import categories from './data/category'
    export default{
        data(){
            return{
                ctgs: categories,
                menuType: 'Main'
            }
        },
        computed: {
            ctgs_with_styles: function() {
                var res = this.ctgs.map(function(item) {
                    item.style = 'background-image: url(' + item.urlBigImage + ');'
                    return item;
                });
                console.log(res);
                return res;
            }
        },
        methods:{
            changeMenu: function(evt){
                this.menuType = 'Sidebar';
            }
        },
        beforeRouteLeave (to, from, next) {
    // вызывается перед переходом от пути, соответствующего текущему компоненту;
    // имеет доступ к контексту инстанса компонента `this`.
        }
    }


</script>

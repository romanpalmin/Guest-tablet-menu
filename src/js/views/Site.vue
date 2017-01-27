<template>
    <div>
        <div class="preload">
            <div v-if="!showFrame" class=" outer">
                <div class="inner">
                    <div>{{msg}}</div>
                    <div>
                        <button @click="showFrame=!showFrame">Добавить iframe?</button>
                    </div>
                </div>
            </div>
            <div v-if="showFrame">
                <div class="top-panel"><button @click="showFrame=!showFrame">Скрыть iframe?</button></div>
                <iframe src="http://1streetfood.bar/" width="100%" height="900px" align="left">
                    Ваш браузер не поддерживает плавающие фреймы!
                </iframe>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
    .top-panel{
        width:100%;
        text-align: center;
        padding-top: 12px;
    }
    .preload {
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        height: 100%;
        display: block;

        .outer {
            width: 300px;
            height: 220px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -100px 0 0 -150px;
            border: 2px solid #ffffff;
            background: lightblue;
            background: linear-gradient(to right, blue, lightblue);
            line-height: 200px;
            text-align: center;
            border-radius: 3%;
            color: #ffffff
        }
        .inner {
            display: inline-block; /* центрировать..*/
            vertical-align: middle; /* ..по вертикали */
            line-height: 1.25; /* переопределить высоту строки на обычную */
        }
    }


</style>
<script>
    export default{
        data(){
            return{
                msg:'Можем вставить <iframe>',
                showFrame:false
            }
        }
    }



</script>

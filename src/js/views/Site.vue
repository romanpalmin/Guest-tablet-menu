<template>
    <div>
        <div class="preload">
            <div class=" outer">
                <div class="inner">
                    <div>Loading {{msg}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
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
                msg:'hello vue site'
            }
        }
    }


</script>

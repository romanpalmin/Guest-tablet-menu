<template>
    <div>
        <div v-if="showFrame">
            <iframe src="http://1streetfood.bar/" width="100%" height="900px" align="left">
                Ваш браузер не поддерживает плавающие фреймы!
            </iframe>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return{
                msg:'Можем вставить <iframe>',
                showFrame:true
            }
        }
    }
</script>

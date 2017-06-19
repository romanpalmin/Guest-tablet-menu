<template>
    <div>
        <mainMenuNew/>
    </div>
</template>

<script lang="Javascript">
    //import mainMenu from './components/MainMenu.vue';
    import mainMenuNew from './components/MainMenuNew.vue';
    export default{
        data(){
            return {
                items: []
            }
        },
        components: {
            mainMenuNew
        }
    }
</script>

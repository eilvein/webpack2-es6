<template>
    <p>Hello {{ name}}</p>
    <button @click="alertName">alert!</button>
</template>
<style>
    p{
        background-color:#ff0000;
    }

</style>
<script>
    module.exports = {
        name: 'roobo',
        data: function(){
            return {
                name: 'lixinwei'
            }
        },
        methods: {
            alertName: function(event){
                alert(this.name)
            }
        }
    }
</script>
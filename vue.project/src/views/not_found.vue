<template>
    <div class="box-404">
        {{ msg }}
    </div>
</template>
<style>
    nav{
        background: #e5e5e5;
    }
</style>
<script>
    module.exports = {
        name: 'Notpage',
        data: function(){
            return {
                msg: '我是404!',
                title:'404'
            }
        }

    }
</script>
<template>
    <div id="shop" class="shop">
        {{ content }}
    </div>
</template>
<style>
    .shop{
        color: #00c7ff;
        font-weight:700;
    }

</style>
<script>
    module.exports = {
        name: 'Shop',
        data: function(){
            return {
                content: 'roobo shop'
            }
        }
    }
</script>
<template>
    <div class="app">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>
<style>
    p{
        background-color:#ff0000;
    }

</style>
<script>
    var Navbar = require('../components/nav');

    module.exports = {
        name: 'App',
        components: {
            Navbar
        }
    };
</script>
<template>
    <nav class="nav">
        <ul>
            <li><a v-link="{ name: 'home', exact: true}">index</a></li>
            <li><a v-link="{ name: 'shop' }">shop</a></li>
            <li><a v-link="{ name: 'about' }">about</a></li>
            <li><a v-link="{ name: 'contact' }">contact</a></li>
        </ul>
    </nav>
</template>
<style>
    nav{
        background: #e5e5e5;
    }
    a.v-link-active {
        color: red;
    }
    a.custom-link-active{
        color: #f22346;
    }
</style>
<script>
    module.exports = {
        name: 'Nav'

    }
</script>
/**
 * @description: main
 * @author: lixinwei
 * @version: V1
 * @update: 16/5/13
 */

"use strict";

var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var VueValidator = require('vue-validator');

var RegisterRouter = require('./router');
var App = require('../views/app');


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueValidator);

var router = new VueRouter({
    linkActiveClass:'custom-link-active'

});

RegisterRouter(router);

router.start(App, '#app');


console.log(1111);
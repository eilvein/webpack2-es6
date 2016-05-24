/**
 * @description: router
 * @author: lixinwei
 * @version: V1
 * @update: 16/5/10
 */

"use strict";

module.exports = function(router){
    router.map({
        '/': {
            name: 'home',
            component: require('../views/home')
        },
        '*': {
            component: require('../views/not_found')
        },
        '/shop': {
            name: 'shop',
            component: function(resolve){
                require(['../views/shop'], resolve)
            }
        },
        '/about': {
            name: 'about',
            component: function(resolve){
                require(['../views/shop'], resolve)
            }
        },
        '/contact': {
            name:'contact',
            component: function(resolve){
                require(['../views/shop'], resolve)
            }
        }
    });



};





















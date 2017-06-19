'use strict';

export let desc = '欢迎使用'
export let url = 'https://github.com/eilvein'

export class Person {
    constructor(_name = 'eilvein',_hello = 'Hello!'){
        this.name = _name
        this.hello = _hello
    }
    getHello(){
        return this.hello;
    }
    getName(){
        return this.name;
    }
}

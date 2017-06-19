'use strict';

import {desc, url, Person} from './modules/mod1'

// global app css
import '../style/app'


import jquery from 'jquery';
import Utils from 'util'

let person = new Person;
console.log(person.getHello() + person.getName());
console.log(desc);
console.log(url);

console.log(Utils.proxy);


let tpl = `<p>${desc}<a href="${url}">点击我吧</a></p>`
jquery('body').append(tpl);

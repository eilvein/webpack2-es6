'use strict';

module.exports = {
    '/github': {
        target: 'https://api.github.com',
        secure: true,
        headers: {
            'Host': 'api.github.com',
            'Cookie': ''
        },
        pathRewrite: function(path) {
            return path.replace('^/github', '');
        }
    },
    '/npm': {
        target: 'https://registry.npmjs.org',
        secure: true,
        headers: {
            'Host': 'registry.npmjs.org',
            'Cookie': ''
        },
        pathRewrite: function(path) {
            return path.replace('^/npm', '');
        }
    }

};

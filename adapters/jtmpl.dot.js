(function (global, factory) {
    'use strict';
    // Node.js, CommonJS, CommonJS Like
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global, true);
    } else {
        factory(global);
    }
})(this, function (global, noGlobal) {
    // Support cmd && amd
    if (define && (define.cmd || define.amd)) {
        return define("jtmpl.dot", [], factory);
    }
    // Global require
    if (typeof require === 'function') {
        return factory(require);
    }
    // Common
    return factory(function (id) {
        var key;
        for (key in global)
            if (key.toLowerCase() === id.toLowerCase())
                return global[key];
    });

    function factory(require, exports) {
        var
        doT = require('dot'),
        jTmpl = require('jtmpl');

        jTmpl.adapter('dot', {
            output : '',
            valid : function () {
                return typeof doT === 'object';
            },
            init : function (tpl, data, options) {
                var fn = doT.template(tpl, options);
                this.output = fn(data);
            }
        });
    }
});

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
        return define("jtmpl.jtemplates", [], factory);
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
        $ = require('jquery'),
        jTmpl = require('jtmpl');

        require('jtemplates');

        jTmpl.adapter('jtemplates', {
            output : '',
            valid : function () {
                return !!$.createTemplate;
            },
            init : function (tpl, data, options) {
                tpl = $.createTemplate(tpl);
                this.output = $.processTemplateToText(tpl, data);
            }
        });
    }
});

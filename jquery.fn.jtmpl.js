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
        return define("jquery.fn.jtmpl", [], factory);
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

        $.fn.jTmpl = function (tpl, data, tplEngine) {
            var
            // newer, attrs = [], self = this,
            tplobj = $.isPlainObject(tpl) ?
                jTmpl(this.html(), tpl, data) :
                jTmpl(tpl, data, tplEngine);

            /**
            newer = $(tplobj.output);

            attrs = $.grep(newer[0].attributes, function(attr) {
            // <IE8
            if (attr.specified)
            return true;
            })

            if (attrs.length) {
            $.each(attrs, function() {
            self.attr(this.nodeName, this.nodeValue);
            });
            }

            this.html(newer.html());
             */
            this.html(tplobj.output);
        };
    }
});

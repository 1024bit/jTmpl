/**
 * An template adapter for JavaScript template engine, support doT, jtemplates, juicer...
 * So you can use the common api in various projects, then don't need to modify the source code...
 * Usage: jTmpl(tpl, data, options)
 */
(function (global, factory) {
    'use strict';
    // Node.js, CommonJS, CommonJS Like
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global, true);
    } else {
        factory(global);
    }
})(this, function (global, noGlobal) {
    function jTmpl(tpl, data, tplEngine) {
        if (!(this instanceof jTmpl))
            return new jTmpl(tpl, data, tplEngine);

        var
        adapter,
        key,
        elem;
        tplEngine = tplEngine || jTmpl.tplEngine;
        if (tplEngine.adapter) {
            for (key in jTmpl.adapters) {
                elem = jTmpl.adapters[key];
                if (elem.adapter === tplEngine.adapter) {
                    adapter = elem.valid() ? elem : undefined;
                    break;
                }
            }

        } else {
            // Default
            for (key in jTmpl.adapters) {
                elem = jTmpl.adapters[key];
                adapter = elem.valid() ? elem : undefined;
                if (adapter)
                    break;
            }
        }
        if (!adapter)
            throw 'unkonwn template engine.';

        for (key in adapter) {
            this[key] = adapter[key];
        }

        // Initialize adapter
        this.init(tpl, data, tplEngine.options);
    }

    jTmpl.adapters = [];
    jTmpl.adapter = function (id, obj) {
        obj['adapter'] = id;
        // Define interface
        var implementing = 'adapter output valid init'.split(' '),
        key;
        for (key in obj) {
            if (!~$.inArray(key, implementing)) {
                throw 'Invalid adapter! Nonstandard method: ' + key;
            }
        }

        jTmpl.adapters.unshift(obj);
    };

    if (noGlobal) {
        global.jTmpl = jTmpl;
    }

    // Support cmd && amd
    if (define && (define.cmd || define.amd)) {
        return define("jtmpl", [], factory);
    }
    // Global require
    if (typeof require === 'function') {
        return factory(require);
    }
    // Common
    return factory();

    function factory(require, exports) {
        return jTmpl;
    }
});

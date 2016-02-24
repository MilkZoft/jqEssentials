'use strict';

var jqEssentials = {};

(function() {
    var init = function(selector) {
        var el = selector[0] === '.' ? document.querySelectorAll(selector) : document.querySelector(selector);

        return {
            addClass: addClass,
            each: each,
            on: on,
            val: val
        };

        function addClass(className) {
            if (!el.classList.contains(className)) {
                el.className += ' ' + className;
            }
        }

        function each(callback) {
            console.log('Dentro de each', el);
            var node;
            var i;

            for (i = 0; i < el.length; i++) {
                node = el[i];
                callback.call(node, i, node)
            }

            return this;
        }

        function on(event, handler) {
            el.addEventListener(event, handler, false);
        }

        function val(value, filter) {
            if (value) {
                if (filter === 'slug') {
                    el.value = slug(value);
                } else {
                    el.value = value;
                }
            } else {
                return el.value;
            }
        }

        /// Private functions ///
        function slug(str) {
            var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
            var to   = 'aaaaaeeeeeiiiiooooouuuunc------';

            str = str.replace(/^\s+|\s+$/g, '').toLowerCase();

            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
            }

            return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        }
    }

    jqEssentials = function(selector) {
        return new init(selector)
    }

    if (!window.$) {
        window.$ = jqEssentials;
    }
})();

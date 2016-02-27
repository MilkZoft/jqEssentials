/**
 * jqEssentials JavaScript Library v0.0.1
 * https://github.com/MilkZoft/jqEssentials
 *
 * Copyright (c) 2016 Carlos Santana
 * Released under the MIT license
 * https://github.com/MilkZoft/jqEssentials/blob/master/LICENSE
 */
var jqEssentials = {};

(function() {
    'use strict';

    /**
     * Initializes the $ function.
     * @param {string} selector Query Selector
     */
    var init = function(selector) {
        // Gets the element (by id) or the elements (by class)
        var el = selector[0] === '.' ? document.querySelectorAll(selector) : document.querySelector(selector);

        // Filters
        var filters = {
            slug: function(str) {
                var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
                var to   = 'aaaaaeeeeeiiiiooooouuuunc------';

                str = str.replace(/^\s+|\s+$/g, '').toLowerCase();

                for (var i = 0, l = from.length; i < l; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }

                return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
            }
        };

        // Public Methods
        return {
            addClass: addClass,
            each: each,
            on: on,
            val: val
        };

        /**
         * Adds a class to an element
         * @param {string} className Name of the class
         */
        function addClass(className) {
            if (!el.classList.contains(className)) {
                el.className += ' ' + className;
            }
        }

        /**
         * Iterates over elements
         * @param {function} callback Callback action
         */
        function each(callback) {
            var node;
            var i;

            for (i = 0; i < el.length; i++) {
                node = el[i];
                callback.call(node, i, node);
            }

            return this;
        }

        /**
         * Attach events
         * @param {string} event Event type (click, keyup, etc.)
         * @param {function} handler Function that will be executed for that event
         */
        function on(event, handler) {
            el.addEventListener(event, handler, false);
        }

        /**
         * Gets and sets a value applying optional filters
         * @param {string} value String Value
         * @param {string} filter Filter function
         */
        function val(value, filter) {
            if (value || value === '' || value === null) {
                if (filter) {
                    el.value = filters[filter](value || '');
                } else {
                    el.value = value || '';
                }
            } else {
                return el.value;
            }
        }
    }

    // Creating new instance
    jqEssentials = function(selector) {
        return new init(selector)
    }

    // If there is no jQuery we take the $ function
    if (!window.$) {
        window.$ = jqEssentials;
    }
})();

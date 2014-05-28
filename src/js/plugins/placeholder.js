/*global meditor*/

(function (window, document) {
    'use strict';

    meditor.plugins.placeholder = {

        // TODO: break method
        init: function init(elements) {
            var i,
                activatePlaceholder = function (el) {
                    if (!(el.querySelector('img')) &&
                            !(el.querySelector('blockquote')) &&
                            el.textContent.replace(/^\s+|\s+$/g, '') === '') {
                        el.classList.add('medium-editor-placeholder');
                    }
                },
                placeholderWrapper = function (e) {
                    this.classList.remove('medium-editor-placeholder');
                    if (e.type !== 'keypress') {
                        activatePlaceholder(this);
                    }
                };
            for (i = 0; i < elements.length; i += 1) {
                activatePlaceholder(elements[i]);
                elements[i].addEventListener('blur', placeholderWrapper);
                elements[i].addEventListener('keypress', placeholderWrapper);
            }
            return this;
        }

    };

}(window, document));

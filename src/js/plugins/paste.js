/*global meditor*/

(function (window, document) {
    'use strict';

    meditor.plugins.paste = {

        // TODO: break method
        init: function init(elements, options) {
            var i, self = this;
            this.options = options;
            this.pasteWrapper = function (e) {
                var paragraphs,
                    html = '',
                    p;

                this.classList.remove('medium-editor-placeholder');
                if (!self.options.forcePlainText && !self.options.cleanPastedHTML) {
                    return this;
                }

                if (e.clipboardData && e.clipboardData.getData && !e.defaultPrevented) {
                    e.preventDefault();

                    if (self.options.cleanPastedHTML && e.clipboardData.getData('text/html')) {
                        return meditor.plugins.cleanPaste.clean(e.clipboardData.getData('text/html'));
                    }
                    if (!(self.options.disableReturn || this.getAttribute('data-disable-return'))) {
                        paragraphs = e.clipboardData.getData('text/plain').split(/[\r\n]/g);
                        for (p = 0; p < paragraphs.length; p += 1) {
                            if (paragraphs[p] !== '') {
                                if (navigator.userAgent.match(/firefox/i) && p === 0) {
                                    html += meditor.util.htmlEntities(paragraphs[p]);
                                } else {
                                    html += '<p>' + meditor.util.htmlEntities(paragraphs[p]) + '</p>';
                                }
                            }
                        }
                        document.execCommand('insertHTML', false, html);
                    } else {
                        document.execCommand('insertHTML', false, e.clipboardData.getData('text/plain'));
                    }
                }
            };
            for (i = 0; i < elements.length; i += 1) {
                elements[i].addEventListener('paste', this.pasteWrapper);
            }
            return this;
        },

        unbind: function unbind(el) {
            el.removeEventListener('paste', this.pasteWrapper);
        }

    };

}(window, document));

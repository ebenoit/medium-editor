/*global meditor*/

(function (window, document) {
    'use strict';

    meditor.selection = {
        // http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
        // by Tim Down
        save: function save() {
            var i,
                len,
                ranges,
                sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                ranges = [];
                for (i = 0, len = sel.rangeCount; i < len; i += 1) {
                    ranges.push(sel.getRangeAt(i));
                }
                return ranges;
            }
            return null;
        },

        restore: function restore(savedSel) {
            var i,
                len,
                sel = window.getSelection();
            if (savedSel) {
                sel.removeAllRanges();
                for (i = 0, len = savedSel.length; i < len; i += 1) {
                    sel.addRange(savedSel[i]);
                }
            }
        },

        // http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
        // by You
        getStart: function getStart() {
            var node = document.getSelection().anchorNode,
                startNode = (node && node.nodeType === 3 ? node.parentNode : node);
            return startNode;
        },

        // http://stackoverflow.com/questions/4176923/html-of-selected-text
        // by Tim Down
        html: function html() {
            var i,
                selHtml = '',
                sel,
                len,
                container;
            if (window.getSelection !== undefined) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    container = document.createElement('div');
                    for (i = 0, len = sel.rangeCount; i < len; i += 1) {
                        container.appendChild(sel.getRangeAt(i).cloneContents());
                    }
                    selHtml = container.innerHTML;
                }
            } else if (document.selection !== undefined) {
                if (document.selection.type === 'Text') {
                    selHtml = document.selection.createRange().htmlText;
                }
            }
            return selHtml;
        },

        getParentElement: function getParentElement() {
            var selectedParentElement = null,
                range = window.getSelection().getRangeAt(0);
            if (this.isSingleNode(range)) {
                selectedParentElement = range.startContainer.childNodes[range.startOffset];
            } else if (range.startContainer.nodeType === 3) {
                selectedParentElement = range.startContainer.parentNode;
            } else {
                selectedParentElement = range.startContainer;
            }
            return selectedParentElement;
        },

        // http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
        isSingleNode: function (range) {
            var startNode = range.startContainer;
            return startNode === range.endContainer &&
                startNode.hasChildNodes() &&
                range.endOffset === range.startOffset + 1;
        }

    };

}(window, document));

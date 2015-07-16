System.register([], function (_export) {
    "use strict";

    var initialize;
    return {
        setters: [],
        execute: function () {
            initialize = function initialise(element, valueAccessor, allBindings) {};

            if (ko !== undefined && ko.bindingHandlers !== undefined) {
                ko.bindingHandlers.uploader = {
                    init: initialize
                };
            }
        }
    };
});
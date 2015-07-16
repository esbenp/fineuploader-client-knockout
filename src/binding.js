var initialize = function initialise(element, valueAccessor, allBindings)
{
 
}

if (ko !== undefined && ko.bindingHandlers !== undefined) {
    ko.bindingHandlers.uploader = {
        init: initialize
    };
}

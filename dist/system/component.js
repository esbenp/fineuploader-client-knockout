System.register(['knockout', 'jquery', './binding'], function (_export) {
  'use strict';

  var ko, $, binding;
  return {
    setters: [function (_knockout) {
      ko = _knockout['default'];
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_binding) {
      binding = _binding['default'];
    }],
    execute: function () {

      ko.components.register('fineuploader', {
        template: '<div data-bind="fineuploader: observable, ' + 'initializer: initializer, settings: settings, instance: instance, ' + 'engineResolver: engineResolver, loaderResolver: loaderResolver' + '"></div>',
        viewModel: function viewModel(params) {
          var defaults = {
            initializer: false,
            settings: {},
            instance: false,
            engineResolver: false,
            loaderResolver: false
          };

          $.extend(this, defaults, params);
        }
      });
    }
  };
});
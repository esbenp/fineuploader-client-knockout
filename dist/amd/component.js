define(['exports', 'knockout', 'jquery', './binding'], function (exports, _knockout, _jquery, _binding) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _ko = _interopRequireDefault(_knockout);

  var _$ = _interopRequireDefault(_jquery);

  var _binding2 = _interopRequireDefault(_binding);

  _ko['default'].components.register('fineuploader', {
    template: '<div data-bind="fineuploader: observable, ' + 'initializer: initializer, settings: settings, instance: instance, ' + 'engineResolver: engineResolver, loaderResolver: loaderResolver' + '"></div>',
    viewModel: function viewModel(params) {
      var defaults = {
        initializer: false,
        settings: {},
        instance: false,
        engineResolver: false,
        loaderResolver: false
      };

      _$['default'].extend(this, defaults, params);
    }
  });
});
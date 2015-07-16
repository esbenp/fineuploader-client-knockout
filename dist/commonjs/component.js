'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _binding = require('./binding');

var _binding2 = _interopRequireDefault(_binding);

_knockout2['default'].components.register('fineuploader', {
  template: '<div data-bind="fineuploader: observable, ' + 'initializer: initializer, settings: settings, ' + 'engineResolver: engineResolver, loaderResolver: loaderResolver' + '"></div>',
  viewModel: function viewModel(params) {
    var defaults = {
      initializer: false,
      settings: {},
      engineResolver: false,
      loaderResolver: false
    };

    _jquery2['default'].extend(this, defaults, params);
  }
});
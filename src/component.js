import ko from 'knockout';
import $ from 'jquery';
import binding from './binding';

ko.components.register('fineuploader', {
    template: '<div data-bind="fineuploader: observable, ' +
      'initializer: initializer, settings: settings, ' +
      'engineResolver: engineResolver, loaderResolver: loaderResolver' +
      '"></div>',
    viewModel: function(params) {
      var defaults = {
        initializer: false,
        settings: {},
        engineResolver: false,
        loaderResolver: false
      };

      $.extend(this, defaults, params);
    }
});

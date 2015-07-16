define(['exports', 'knockout', 'jquery', 'fineuploader-client/index', 'fineuploader-client/utilities', './observable-plugin', './template-engine'], function (exports, _knockout, _jquery, _fineuploaderClientIndex, _fineuploaderClientUtilities, _observablePlugin, _templateEngine) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _ko = _interopRequireDefault(_knockout);

  var _$ = _interopRequireDefault(_jquery);

  var defaultSettings = {
    engineResolver: function engineResolver() {
      return new _templateEngine.KnockoutEngine(_ko['default']);
    },
    loaderResolver: function loaderResolver() {},
    uploaderSettings: {
      templatePathOrMarkup: 'fineuploader-client-assets/html/uploader.min.html'
    }
  };

  var initialize = function initialise(element, valueAccessor, allBindings) {
    var defaultSettings = _ko['default'].bindingHandlers.fineuploader.defaultSettings;
    var inputSettings = allBindings.get('settings') || {};
    var settings = _$['default'].extend({}, defaultSettings.uploaderSettings, inputSettings);

    if (_fineuploaderClientUtilities.isUndefined(settings.container)) {
      var container = _$['default']('<div/>');
      container.appendTo(_$['default'](element));

      settings.container = container;
    }

    if (!_fineuploaderClientUtilities.isArray(settings.plugins)) {
      settings.plugins = [];
    }

    var observable = valueAccessor();
    if (_ko['default'].isObservable(observable)) {
      var observablePlugin = new _observablePlugin.KnockoutObservable(observable);
      settings.plugins.push(observablePlugin);
    } else if (_fineuploaderClientUtilities.isString(observable) && observable !== '') {
      settings.session = observable;
    }

    var engineResolver = allBindings.get('engineResolver') || defaultSettings.engineResolver;
    var loaderResolver = allBindings.get('loaderResolver') || defaultSettings.loaderResolver;
    var uploader = new _fineuploaderClientIndex.Uploader(settings, engineResolver(), loaderResolver());

    var instance = allBindings.get('instance') || false;
    if (_ko['default'].isObservable(instance)) {
      instance(uploader);
    }

    var initializer = allBindings.get('initializer') || false;

    if (_ko['default'].isObservable(initializer)) {
      var subscription = initializer.subscribe(function (newValue) {
        if (newValue) {
          uploader.initialize();
        }
      });

      if (initializer()) {
        uploader.initialize();
        subscription.dispose();
      }

      _ko['default'].utils.domNodeDisposal.addDisposeCallback(element, function () {
        subscription.dispose();
      });
    }

    return { controlsDescendantBindings: true };
  };

  _ko['default'].bindingHandlers.fineuploader = {
    defaultSettings: defaultSettings,
    extend: function extend(settings) {
      _$['default'].extend(this.defaultSettings, settings);
    },
    init: initialize
  };
});
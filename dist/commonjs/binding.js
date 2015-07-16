'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fineuploaderClientIndex = require('fineuploader-client/index');

var _fineuploaderClientUtilities = require('fineuploader-client/utilities');

var _observablePlugin = require('./observable-plugin');

var _templateEngine = require('./template-engine');

var defaultSettings = {
  engineResolver: function engineResolver() {
    return new _templateEngine.KnockoutEngine(_knockout2['default']);
  },
  loaderResolver: function loaderResolver() {},
  uploaderSettings: {
    templatePathOrMarkup: 'fineuploader-client-assets/html/uploader.min.html'
  }
};

var initialize = function initialise(element, valueAccessor, allBindings) {
  function setup() {
    var defaultSettings = _knockout2['default'].bindingHandlers.fineuploader.defaultSettings;
    var inputSettings = allBindings.get('settings') || {};
    var settings = _jquery2['default'].extend({}, defaultSettings.uploaderSettings, inputSettings);

    if (_fineuploaderClientUtilities.isUndefined(settings.container)) {
      var container = _jquery2['default']('<div/>');
      container.appendTo(_jquery2['default'](element));

      settings.container = container;
    }

    if (!_fineuploaderClientUtilities.isArray(settings.plugins)) {
      settings.plugins = [];
    }

    var observable = valueAccessor();
    if (_knockout2['default'].isObservable(observable)) {
      var observablePlugin = new _observablePlugin.KnockoutObservable(observable);
      settings.plugins.push(observablePlugin);
    } else if (_fineuploaderClientUtilities.isString(observable) && observable !== '') {
      settings.session = observable;
    }

    var engineResolver = allBindings.get('engineResolver') || defaultSettings.engineResolver;
    var loaderResolver = allBindings.get('loaderResolver') || defaultSettings.loaderResolver;
    var uploader = new _fineuploaderClientIndex.Uploader(settings, engineResolver(), loaderResolver());

    var instance = allBindings.get('instance') || false;
    if (_knockout2['default'].isObservable(instance)) {
      instance(uploader);
    }

    uploader.initialize();

    return uploader;
  }

  var initializer = allBindings.get('initializer') || false;

  if (_knockout2['default'].isObservable(initializer)) {
    var subscription = initializer.subscribe(function (newValue) {
      if (newValue) {
        setup();
      }
    });

    if (initializer()) {
      setup();
      subscription.dispose();
    }

    _knockout2['default'].utils.domNodeDisposal.addDisposeCallback(element, function () {
      subscription.dispose();
    });
  } else {
    setup();
  }

  return { controlsDescendantBindings: true };
};

_knockout2['default'].bindingHandlers.fineuploader = {
  defaultSettings: defaultSettings,
  extend: function extend(settings) {
    _jquery2['default'].extend(this.defaultSettings, settings);
  },
  init: initialize
};
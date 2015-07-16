System.register(['knockout', 'jquery', 'fineuploader-client/index', 'fineuploader-client/utilities', './observable-plugin', './template-engine'], function (_export) {
  'use strict';

  var ko, $, Uploader, isArray, isString, isUndefined, KnockoutObservable, KnockoutEngine, defaultSettings, initialize;
  return {
    setters: [function (_knockout) {
      ko = _knockout['default'];
    }, function (_jquery) {
      $ = _jquery['default'];
    }, function (_fineuploaderClientIndex) {
      Uploader = _fineuploaderClientIndex.Uploader;
    }, function (_fineuploaderClientUtilities) {
      isArray = _fineuploaderClientUtilities.isArray;
      isString = _fineuploaderClientUtilities.isString;
      isUndefined = _fineuploaderClientUtilities.isUndefined;
    }, function (_observablePlugin) {
      KnockoutObservable = _observablePlugin.KnockoutObservable;
    }, function (_templateEngine) {
      KnockoutEngine = _templateEngine.KnockoutEngine;
    }],
    execute: function () {
      defaultSettings = {
        engineResolver: function engineResolver() {
          return new KnockoutEngine(ko);
        },
        loaderResolver: function loaderResolver() {},
        uploaderSettings: {
          templatePathOrMarkup: 'fineuploader-client-assets/html/uploader.min.html'
        }
      };

      initialize = function initialise(element, valueAccessor, allBindings) {
        var defaultSettings = ko.bindingHandlers.fineuploader.defaultSettings;
        var inputSettings = allBindings.get('settings') || {};
        var settings = $.extend({}, defaultSettings.uploaderSettings, inputSettings);

        if (isUndefined(settings.container)) {
          var container = $('<div/>');
          container.appendTo($(element));

          settings.container = container;
        }

        if (!isArray(settings.plugins)) {
          settings.plugins = [];
        }

        var observable = valueAccessor();
        if (ko.isObservable(observable)) {
          var observablePlugin = new KnockoutObservable(observable);
          settings.plugins.push(observablePlugin);
        } else if (isString(observable) && observable !== '') {
          settings.session = observable;
        }

        var engineResolver = allBindings.get('engineResolver') || defaultSettings.engineResolver;
        var loaderResolver = allBindings.get('loaderResolver') || defaultSettings.loaderResolver;
        var uploader = new Uploader(settings, engineResolver(), loaderResolver());

        var instance = allBindings.get('instance') || false;
        if (ko.isObservable(instance)) {
          instance(uploader);
        }

        var initializer = allBindings.get('initializer') || false;

        if (ko.isObservable(initializer)) {
          var subscription = initializer.subscribe(function (newValue) {
            if (newValue) {
              uploader.initialize();
            }
          });

          if (initializer()) {
            uploader.initialize();
            subscription.dispose();
          }

          ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            subscription.dispose();
          });
        }

        return { controlsDescendantBindings: true };
      };

      ko.bindingHandlers.fineuploader = {
        defaultSettings: defaultSettings,
        init: initialize
      };
    }
  };
});
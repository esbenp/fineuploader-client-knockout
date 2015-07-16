import ko from 'knockout';
import $ from 'jquery';
import {Uploader} from 'fineuploader-client/index';
import {
  isArray,
  isString,
  isUndefined
} from 'fineuploader-client/utilities';
import {KnockoutObservable} from './observable-plugin';
import {KnockoutEngine} from './template-engine';

var defaultSettings = {
  engineResolver: function(){
    return new KnockoutEngine(ko);
  },
  loaderResolver: function(){},
  uploaderSettings: {
    templatePathOrMarkup: "fineuploader-client-assets/html/uploader.min.html"
  }
};

var initialize = function initialise(element, valueAccessor, allBindings)
{
  var defaultSettings = ko.bindingHandlers.fineuploader.defaultSettings;
  var inputSettings = allBindings.get('settings') || {};
  var settings = $.extend({}, defaultSettings.uploaderSettings, inputSettings);

  if (isUndefined(settings.container)) {
    // We create a new child otherwise we get multiple apply bindings
    // error, since our element container is already bound by knockout
    var container = $("<div/>");
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
  } else if(isString(observable) && observable !== "") {
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
    var subscription = initializer.subscribe(function(newValue){
      if (newValue) {
        uploader.initialize();
      }
    });

    if (initializer()) {
      uploader.initialize();
      subscription.dispose();
    }

    ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
        subscription.dispose();
    });
  }

  return { controlsDescendantBindings: true };
}

ko.bindingHandlers.fineuploader = {
  defaultSettings: defaultSettings,
  extend: function(settings) {
    $.extend(this.defaultSettings, settings);
  },
  init: initialize
};

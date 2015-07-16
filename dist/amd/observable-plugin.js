define(['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var KnockoutObservable = (function () {
    function KnockoutObservable(observable) {
      _classCallCheck(this, KnockoutObservable);

      this._observable = observable;
    }

    KnockoutObservable.prototype.populateSession = function populateSession() {
      if (!this._uploader.isInitialized()) {
        this._uploader.setSession(this._observable());
      }
    };

    KnockoutObservable.prototype.__setUploader = function __setUploader(uploader) {
      this._uploader = uploader;

      this._setupListeners();
      this.populateSession();
    };

    KnockoutObservable.prototype._setupListeners = function _setupListeners() {
      this._uploader.listen('onComplete', this._updateObservableUpload.bind(this));
      this._uploader.listen('onDeleteComplete', this._updateObservableDelete.bind(this));
    };

    KnockoutObservable.prototype._updateObservableDelete = function _updateObservableDelete(id, xhr, isError) {
      var name = this._uploader.fineuploader.getName(id);

      if (this._uploader.settings.limit === 1) {
        this._observable(null);
      } else {
        this._observable.remove(name);
      }
    };

    KnockoutObservable.prototype._updateObservableUpload = function _updateObservableUpload(id, name, responseJSON, xhr) {
      var type = responseJSON.type;

      if (type === 'upload') {
        if (this._uploader.settings.limit == 1) {
          this._observable(name);
        } else {
          this._observable.push(name);
        }
      }
    };

    return KnockoutObservable;
  })();

  exports.KnockoutObservable = KnockoutObservable;
});
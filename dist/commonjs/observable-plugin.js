'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var KnockoutObservable = (function () {
  function KnockoutObservable(observable) {
    _classCallCheck(this, KnockoutObservable);

    this._observable = observable;
  }

  KnockoutObservable.prototype.addFile = function addFile(upload_path) {
    if (this._uploader.settings.limit == 1) {
      this._observable(upload_path);
    } else {
      this._observable.push(upload_path);
    }
  };

  KnockoutObservable.prototype.getObservable = function getObservable() {
    return this._observable;
  };

  KnockoutObservable.prototype.removeFile = function removeFile(upload_path) {
    if (this._uploader.settings.limit === 1) {
      this._observable(null);
    } else {
      this._observable.remove(upload_path);
    }
  };

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

  KnockoutObservable.prototype._updateObservableDelete = function _updateObservableDelete(id, xhr, isError, upload_path) {
    var name = this._uploader.fineuploader.getName(id);

    this.removeFile(upload_path);
  };

  KnockoutObservable.prototype._updateObservableUpload = function _updateObservableUpload(id, name, responseJSON, xhr, upload_path) {
    var type = responseJSON.type;

    if (type === 'upload') {
      this.addFile(upload_path);
    }
  };

  return KnockoutObservable;
})();

exports.KnockoutObservable = KnockoutObservable;
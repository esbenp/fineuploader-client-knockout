import $ from 'jquery';

export class KnockoutObservable {
  constructor(observable) {
    this._observable = observable;
  }

  addFile(upload_path) {
    if (this._uploader.settings.limit == 1) {
      this._observable(upload_path);
    } else {
      this._observable.push(upload_path);
    }
  }

  getObservable() {
    return this._observable;
  }

  removeFile(upload_path) {
    if (this._uploader.settings.limit === 1) {
      this._observable(null)
    } else {
      this._observable.remove(upload_path);
    }
  }

  populateSession() {
    if (!this._uploader.isInitialized()) {
      this._uploader.setSession(this._observable());
    }
  }

  __setUploader(uploader) {
    this._uploader = uploader;

    this._setupListeners();
    this.populateSession();
  }

  _setupListeners() {
    this._uploader.listen('onComplete', this._updateObservableUpload.bind(this));
    this._uploader.listen('onDeleteComplete', this._updateObservableDelete.bind(this));
  }

  _updateObservableDelete(id, xhr, isError, upload_path) {
    var name = this._uploader.fineuploader.getName(id);

    this.removeFile(upload_path);
  }

  _updateObservableUpload(id, name, responseJSON, xhr, upload_path) {
    var type = responseJSON.type;

    if (type === 'upload') {
      this.addFile(upload_path);
    }
  }

}

export class KnockoutObservable {
  constructor(observable) {
    this._observable = observable;
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

  _updateObservableDelete(id, xhr, isError) {
    var name = this._uploader.fineuploader.getName(id);

    if (this._uploader.settings.limit === 1) {
      this._observable(null)
    } else {
      this._observable.remove(name);
    }
  }

  _updateObservableUpload(id, name, responseJSON, xhr) {
    var type = responseJSON.type;

    if (type === 'upload') {
      if (this._uploader.settings.limit == 1) {
        this._observable(name);
      } else {
        this._observable.push(name);
      }
    }
  }

}

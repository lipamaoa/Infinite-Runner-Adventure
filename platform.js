class Platform {
  constructor() {
    this.platform = null;
  }

  getPlatform() {
    if (this.platform === null) {
      this.platform = this._getPlatform();
    }

    return this.platform;
  }

  _getPlatform() {
    return 'unknown';
  }
}
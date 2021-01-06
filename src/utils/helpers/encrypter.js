const bcrypt = require('bcrypt');

module.exports = class Encrypter {
  async compare(value, hash) {
    this.value = value;
    this.hash = hash;

    const isValid = await bcrypt.compare(this.value, this.hash);
    return isValid;
  }
};

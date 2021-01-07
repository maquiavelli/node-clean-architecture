const jwt = require('jsonwebtoken');
const MissingParamError = require('../errors/missing-param-error');

module.exports = class TokenGenerator {
  constructor(secret) {
    this.secret = secret;
  }

  async generate(id) {
    if (!this.secret) {
      throw new MissingParamError('secret');
    }
    if (!id) {
      throw new MissingParamError('id');
    }
    this.id = id;
    return jwt.sign(this.id, this.secret);
  }
};

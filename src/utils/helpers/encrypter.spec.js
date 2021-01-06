const bcrypt = require('bcrypt');

class Encrypter {
  async compare(value, hash) {
    this.value = value;
    this.hash = hash;

    const isValid = await bcrypt.compare(this.value, this.hash);
    return isValid;
  }
}

describe('Encrypter', () => {
  test('Should return true if bcrypt return true', async () => {
    const sut = new Encrypter();
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(true);
  });

  test('Should return false if bcrypt return false', async () => {
    const sut = new Encrypter();
    bcrypt.isValid = false;
    const isValid = await sut.compare('any_password', 'hashed_value');
    expect(isValid).toBe(false);
  });
});

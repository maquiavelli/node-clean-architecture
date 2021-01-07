const jwt = require('jsonwebtoken');

class TokenGenerator {
  async generate(id) {
    this.id = id;
    return jwt.sign(this.id, 'secret');
  }
}

describe('Token Generator', () => {
  test('Shoul return null if JWT returns null', async () => {
    const sut = new TokenGenerator();
    jwt.token = null;
    const token = await sut.generate('any_id');
    expect(token).toBe(null);
  });
  test('Shoul return a token if JWT returns token', async () => {
    const sut = new TokenGenerator();
    const token = await sut.generate('any_id');
    expect(token).toBe(jwt.token);
  });
});

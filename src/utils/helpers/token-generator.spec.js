class TokenGenerator {
  async generate(id) {
    this.id = id;
    return null;
  }
}

describe('Token Generator', () => {
  test('Shoul return null if JWT returns null', async () => {
    const sut = new TokenGenerator();
    const token = await sut.generate('any_id');
    expect(token).toBe(null);
  });
});

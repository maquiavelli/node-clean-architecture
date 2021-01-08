const { MongoClient } = require('mongodb');

let client;
let db;

class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    this.email = email;
    const user = await this.userModel.findOne({ email });
    return user;
  }
}

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);
  return { userModel, sut };
};

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL, {
      userNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db('');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    await client.close();
  });

  test('Should return null if no user is found', async () => {
    const { sut } = makeSut();
    const user = await sut.load('invalid_email@mail.com');
    expect(user).toBeNull();
  });

  test('Should return user if user is found', async () => {
    const { userModel, sut } = makeSut();
    await userModel.insertOne({ email: 'valid_email@mail.com' });
    const user = await sut.load('valid_email@mail.com');
    expect(user.email).toBe(user.email);
  });
});

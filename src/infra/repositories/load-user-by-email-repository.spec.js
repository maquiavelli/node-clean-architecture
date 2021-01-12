const { MongoClient } = require('mongodb');
const LoadUserByEmailRepository = require('./load-user-by-email-repository');

let client;
let db;

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
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password',
    });
    const user = await sut.load('valid_email@mail.com');
    expect(user.email).toBe(user.email);
    expect(user).toEqual({
      // eslint-disable-next-line no-underscore-dangle
      _id: fakeUser.ops[0]._id,
      password: fakeUser.ops[0].password,
    });
  });
});

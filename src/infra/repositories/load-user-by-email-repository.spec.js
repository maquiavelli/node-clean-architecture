const MongoHelper = require('../helpers/mongo-helper');
const LoadUserByEmailRepository = require('./load-user-by-email-repository');

let db;

const makeSut = () => {
  const userModel = db.collection('users');
  const sut = new LoadUserByEmailRepository(userModel);
  return { userModel, sut };
};

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    db = await MongoHelper.getDb();
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany();
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
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

  test('Should throw if no userModel is provided', async () => {
    const sut = new LoadUserByEmailRepository();
    const promise = sut.load('any_email@mail.com');
    expect(promise).rejects.toThrow();
  });
});

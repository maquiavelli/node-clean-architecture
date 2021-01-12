module.exports = class LoadUserByEmailRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async load(email) {
    this.email = email;
    const user = await this.userModel.findOne(
      { email },
      { projection: { password: 1 } }
    );
    return user;
  }
};

'use strict'

const User = use("App/Models/User");

class UserController {

  async login ({request, auth}){
      const {email, password} = request.all();
      const token = await auth.attempt(email,password);
      return token;
  };

  async register( {request}) {
    console.log("run run run");
    const {email, password} = request.all();
    await User.create({
      email,
      password,
      username: email
    });
    return this.login(...arguments);
  };

  async show(){
    const users = await User.all();
    return users;
  }
}

module.exports = UserController

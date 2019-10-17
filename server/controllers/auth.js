import { User } from '../services';
import { Helpers } from '../utils';

const { errorResponse, successResponse, createUserResponse, comparePassword } = Helpers;

class Auth {
  static async signup(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      const userData = createUserResponse(user);
      successResponse(res, userData, 201);
    } catch (e) {
      errorResponse(res, {});
    }
  }
  static async signin(req, res) {
    try {
      const { user, body } = req;
      const isAuthenticUser = comparePassword(body.password, user.password);
      console.log(isAuthenticUser);
      if (!isAuthenticUser)
        return errorResponse(res, {
          code: 401,
          message: 'Invalid email/password'
        });
      const userData = createUserResponse(user);

      successResponse(res, userData, 200);
    } catch (e) {
      errorResponse(res, {});
    }
  }
}

export default Auth;

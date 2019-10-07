import { validateAuthSchema } from '../validations';
import { Helpers } from '../utils';
import { User } from '../services';

const { fetchByEmail } = User;
const { errorResponse } = Helpers;

class AuthMiddleware {
  static validate(req, res, next) {
    const message = validateAuthSchema(req.body);
    if (message === true) return next();
    errorResponse(res, {
      code: 400,
      message
    });
  }
  static async verifyIfExistingEmail(req, res, next) {
    try {
      const { email } = req.body;
      const [user] = await fetchByEmail(email);
      if (user)
        return errorResponse(res, {
          code: 409,
          message: 'A user with your email already exists'
        });
      next();
    } catch (e) {
      errorResponse(res, {});
    }
  }
  static async validateLoginFields(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, {
        code: 401,
        message: 'Invalid email/password'
      });
    next();
  }
  static async verifyIfExistingUser(req, res, next) {
    try {
      const { email } = req.body;
      const [user] = await User.find({ email });
      if (!user)
        return errorResponse(res, {
          code: 401,
          message: 'Invalid email/password'
        });
      req.user = user;
      next();
    } catch (e) {
      errorResponse(res, {});
    }
  }
}

export default AuthMiddleware;

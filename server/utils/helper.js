import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET } = process.env;
class Helpers {
  static hashPassword(plainPassword) {
    const salter = bcrypt.genSaltSync;
    const hasher = bcrypt.hashSync;
    return hasher(plainPassword, salter(10));
  }

  static comparePassword(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
  }

  static generateToken(payLoad, expiresIn = '2h') {
    return jwt.sign(payLoad, SECRET, { expiresIn });
  }
  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET);
    } catch (err) {
      throw new Error('Invalid Token');
    }
  }

  static successResponse(res, data, code = 200) {
    return res.status(code).json({
      status: 'success',
      data
    });
  }

  static errorResponse(
    res,
    { code = 500, message = 'Some error occurred, try again', errors }
  ) {
    return res.status(code).json({
      status: 'fail',
      error: {
        message,
        errors
      }
    });
  }

  static getAuthorizationToken(authorization) {
    let bearerToken = null;
    if (authorization)
      bearerToken = authorization.split(' ')[1]
        ? authorization.split(' ')[1]
        : authorization;
    return bearerToken;
  }
  static checkToken(req) {
    const {
      headers: { authorization }
    } = req;
    const bearerToken = Helpers.getAuthorizationToken(authorization);
    return (
      bearerToken || req.headers['x-access-token'] || req.headers.token || req.body.token
    );
  }

  static extractUserPayLoad(createdUser) {
    const { _id: id, firstName, lastName, email } = { ...createdUser._doc };
    return { id, firstName, lastName, email };
  }
  static createUserResponse(user) {
    const newUser = Helpers.extractUserPayLoad(user);
    const { email, id } = newUser;
    const token = Helpers.generateToken({ email, id });
    return { ...newUser, token };
  }
}

export default Helpers;

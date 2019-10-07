import { User } from '../models';

class UserService extends User {
  constructor(options) {
    super(options);
  }
  static async fetch(options = {}) {
    return UserService.find(options).select('-__v -password');
  }
  static async fetchById(id) {
    return UserService.findById(id).select('-__v -password');
  }
  static async fetchByEmail(email) {
    return UserService.find({ email }).select('-__v -password');
  }
  static async updateById(id, options) {
    return UserService.findByIdAndUpdate(id, options, {
      new: true,
      useFindAndModify: false
    });
  }
  static async deleteById(id) {
    return UserService.findByIdAndDelete(id, { useFindAndModify: false });
  }
}

export default UserService;

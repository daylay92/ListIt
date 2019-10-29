import { BucketList } from '../models';

class BucketService extends BucketList {
  static async fetch(options = {}) {
    const { filter, skip, limit } = options;
    return BucketService.find(filter || {})
      .select('-__v')
      .skip(skip)
      .limit(limit);
  }
  static async fetchById(id) {
    return BucketService.findById(id).select('-__v');
  }
  static async updateById(id, options) {
    return BucketService.findByIdAndUpdate(id, options, {
      new: true,
      useFindAndModify: false
    });
  }
  static async deleteById(id) {
    return BucketService.findByIdAndDelete(id, { useFindAndModify: false });
  }
}

export default BucketService;

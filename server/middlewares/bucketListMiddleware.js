import {
  validateName,
  validateBucketListSchema,
  validateGoalSchema
} from '../validations';
import { BucketList } from '../services';
import { Helpers } from '../utils';
const { errorResponse } = Helpers;
const { fetchById } = BucketList;

class BucketListMiddleware {
  static validateBucketList(req, res, next) {
    const message = validateBucketListSchema(req.body);
    if (message === true) return next();
    errorResponse(res, {
      code: 400,
      message
    });
  }
  static validateBucketListName(req, res, next) {
    const message = validateName(req.body);
    if (message === true) return next();
    errorResponse(res, {
      code: 400,
      message
    });
  }
  static validateGoal(req, res, next) {
    const message = validateGoalSchema(req.body);
    if (message === true) return next();
    errorResponse(res, {
      code: 400,
      message
    });
  }
  static async verifyBucketListId(req, res, next) {
    const { bucketListId } = req.params;
    try {
      const bucketList = await fetchById(bucketListId);
      if (!bucketList)
        return errorResponse(res, {
          code: 404,
          message: "This bucket list doesn't exist"
        });
      req.bucketList = bucketList;
      next();
    } catch (e) {
      const regex = /Cast to ObjectId/i;
      if (regex.test(e.message)) {
        return errorResponse(res, {
          code: 400,
          message: 'Invalid bucket list Id'
        });
      }
      errorResponse(res, {});
    }
  }
  static verifyGoalId(req, res, next) {
    const {
      params: { goalId },
      bucketList
    } = req;
    const goal = bucketList.goals.id(goalId);
    if (!goal)
      return errorResponse(res, {
        code: 404,
        message: "The goal doesn't exist"
      });
    req.goal = goal;
    next();
  }
  static verifyOwner(req, res, next) {
    const {
      bucketList: { userId },
      data: { id }
    } = req;
    const isOwner = userId.toString() === id;
    if (isOwner) return next();
    errorResponse(res, {
      code: 403,
      message: "You cannot access someone else's bucket list"
    });
  }
}

export default BucketListMiddleware;

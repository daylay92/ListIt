import { BucketList } from '../services';
import { Helpers } from '../utils';
const { errorResponse, successResponse, createFilter } = Helpers;
const { fetch, deleteById } = BucketList;

class BucketListController {
  static async create(req, res) {
    try {
      const body = { ...req.body, userId: req.data.id };
      const bucketList = new BucketList(body);
      await bucketList.save();
      successResponse(res, bucketList, 201);
    } catch (err) {
      errorResponse(res, {});
    }
  }
  static async getLists(req, res) {
    const options = createFilter(req);
    try {
      const bucketLists = await fetch(options);
      successResponse(res, bucketLists, 200);
    } catch (err) {
      errorResponse(res, {});
    }
  }

  static async updateName(req, res) {
    const {
      bucketList,
      body: { name }
    } = req;
    bucketList.name = name;
    try {
      await bucketList.save();
      successResponse(res, bucketList, 200);
    } catch (e) {
      errorResponse(res, {});
    }
  }
  static async deleteBucketList(req, res) {
    const { bucketListId } = req.params;
    try {
      await deleteById(bucketListId);
      successResponse(res, {}, 204);
    } catch (e) {
      errorResponse(res, {});
    }
  }
  static async addNewGoal(req, res) {
    const { bucketList, body } = req;
    bucketList.goals.push(body);
    try {
      await bucketList.save();
      successResponse(res, bucketList, 200);
    } catch (e) {
      errorResponse(res, {});
    }
  }
  static async deleteGoal(req, res) {
    const { bucketList, goal } = req;
    try {
      goal.remove();
      await bucketList.save();
      successResponse(res, bucketList, 204);
    } catch (e) {
      errorResponse(res, {});
    }
  }
  static async updateGoalStatus(req, res) {
    const { bucketList, goal } = req;
    try {
      goal.status = goal.status === 'pending' ? 'completed' : 'pending';
      await bucketList.save();
      successResponse(res, bucketList, 200);
    } catch (e) {
      errorResponse(res, {});
    }
  }
}

export default BucketListController;

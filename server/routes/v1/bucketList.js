import { Router } from 'express';
import { BucketListController } from '../../controllers';
import { AuthMiddleware, BucketListMiddleware } from '../../middlewares';

const router = Router();
const { authenticate } = AuthMiddleware;
const {
  validateBucketList,
  verifyBucketListId,
  verifyOwner,
  verifyGoalId,
  validateBucketListName,
  validateGoal
} = BucketListMiddleware;
const {
  create,
  getLists,
  updateName,
  deleteBucketList,
  addNewGoal,
  updateGoalStatus,
  deleteGoal
} = BucketListController;

router.use(authenticate);
router.post('/', validateBucketList, create);
router.get('/', getLists);
router.patch('/:bucketListId', verifyBucketListId, verifyOwner,validateBucketListName, updateName);
router.delete('/:bucketListId', verifyBucketListId, verifyOwner, deleteBucketList);
router.post('/:bucketListId/goal', verifyBucketListId, verifyOwner,validateGoal, addNewGoal);
router.patch(
  '/:bucketListId/goal/:goalId',
  verifyBucketListId,
  verifyOwner,
  verifyGoalId,
  updateGoalStatus
);
router.delete(
  '/:bucketListId/goal/:goalId',
  verifyBucketListId,
  verifyOwner,
  verifyGoalId,
  deleteGoal
);

export default router;

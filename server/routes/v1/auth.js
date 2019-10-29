import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares';
import { AuthController } from '../../controllers';

const { signup, signin } = AuthController;
const {
  validate,
  verifyIfExistingEmail,
  validateLoginFields,
  verifyIfExistingUser
} = AuthMiddleware;

const router = Router();

router.post('/signup', validate, verifyIfExistingEmail, signup);
router.post('/signin', validateLoginFields, verifyIfExistingUser, signin);

export default router;

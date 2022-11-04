import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

router.post('/user', authController.register);
router.post('/user/login', authController.login);

export const authRouter = router;

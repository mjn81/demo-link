import { Router } from "express";

import { userController } from "../controllers";

const router = Router();


router.get('/', userController.getUsers);
router.get('/profile', userController.getProfile);

export const userRouter = router;
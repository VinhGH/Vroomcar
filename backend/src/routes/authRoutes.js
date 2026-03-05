import express from 'express';
import { loginUser, registerUser, googleLoginController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/google-login', googleLoginController);

export default router;

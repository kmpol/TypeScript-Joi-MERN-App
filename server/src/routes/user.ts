import express from 'express';

import { auth } from '../middleware/auth';
import { ValidateSchema, JoiSchemas } from '../middleware/joi';
import {
    createUser,
    loginUser,
    logoutUser,
    fetchUser,
} from '../controllers/user';

const router = express.Router();

router.post('/users', ValidateSchema(JoiSchemas.createUser), createUser);
router.post('/users/login', ValidateSchema(JoiSchemas.loginUser), loginUser);
router.post('/users/logout', auth, logoutUser);
router.get('/users/me', auth, fetchUser);

export default router;

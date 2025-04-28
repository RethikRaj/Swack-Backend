import express from 'express';

import { signinController, signupController } from '../../controllers/userController.js';
import { validate } from '../../validators/validateSchema.js';
import { zodsignupSchema } from '../../validators/zodUserSchema.js';

const router = express.Router();

router.post('/signup', validate(zodsignupSchema),signupController);
router.post('/signin', signinController);

export default router;
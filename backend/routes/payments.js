import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// TODO: Implement payment routes
// router.post('/initiate', authenticate, authorize('client'), initiatePayment);
// router.get('/verify/:reference', verifyPayment);
// router.post('/release/:jobId', authenticate, authorize('client'), releasePayment);

export default router;

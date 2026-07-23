import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// TODO: Implement job routes
// router.post('/', authenticate, authorize('client'), createJob);
// router.get('/', getJobs);
// router.get('/:id', getJobById);
// router.post('/:id/apply', authenticate, authorize('worker'), applyJob);
// router.put('/offers/:offerId/accept', authenticate, authorize('client'), acceptOffer);
// router.put('/:id/status', authenticate, updateJobStatus);
// router.get('/my-jobs', authenticate, getMyJobs);

export default router;

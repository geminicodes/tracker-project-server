import express from 'express';

import { getJobs, getJobsBySearch, getJob, createJob, updateJob, likeJob, deleteJob } from '../controllers/jobs.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', auth, getJobsBySearch);
router.get('/', auth, getJobs);
router.get('/:id', auth, getJob);

router.post('/', auth, createJob);
router.patch('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);
router.patch('/:id/likeJob', auth, likeJob);

export default router;
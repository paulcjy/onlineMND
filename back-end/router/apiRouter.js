import express from 'express';
import cors from 'cors';

import authRouter from './../routes/auth';
import userRouter from './../routes/user';
import courseRouter from './../routes/course';
import lectureRouter from './../routes/lecture';


const router = express.Router();

// middleware
router.use(cors());

// routing
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/course', courseRouter);
router.use('/lecture', lectureRouter);


export default router;
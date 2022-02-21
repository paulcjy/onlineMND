import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import child_process from 'child_process';
import bodyParser from 'body-parser';

import { DB_connection as db, Err } from './../configs'


// express
const router = express.Router();

// middleware
router.use(cors());








export default router;
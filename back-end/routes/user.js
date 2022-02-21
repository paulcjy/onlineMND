import express from 'express';
import cors from 'cors';

import { DB_connection as db, Err } from '../configs';



// express
const router = express.Router();

// middleware
router.use(cors());



/* GET users listing. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

router.get('/profile', (req, res) => {
	res.send('user profile inquiry page');
});

router.post('/update', (req, res) => {
	res.send('user profile update page');
});

export default router;

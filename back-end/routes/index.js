import express from 'express';
import cors from 'cors';

// express
const router = express.Router();

// middleware
router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

export default router;

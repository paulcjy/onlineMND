import express from 'express';
import cors from 'cors';

import { DB_connection as db, Err, statusJson } from './../configs'
import e from 'express';


// express
const router = express.Router();

// middleware
router.use(cors());




router.get('/:courseId', (req, res) => {
	const { courseId } = req.params;

	if (isNaN(courseId)) {
		res.json(statusJson(400, 'Bad Request: Course id must be integer.'));
		return;
	}

	// 전체 강의 조회
	// TODO 페이지네이션을 위해 /page/:pageNum으로 이동
	if (courseId == 0) {
		db.query(
			'SELECT a.course_id, a.course_name, a.course_description, a.course_cat1, a.course_cat2, a.course_thumbnail, a.course_difficulty, a.course_created, b.user_id AS course_instructor FROM course AS a LEFT JOIN (SELECT user_id, user_name FROM user) b ON a.course_inst_id=b.user_id',
			(err, results, f) => {
				if (err) return res.json(Err(err.message));
				
				res.json(results);
			}
		)
	}
	// 한 강의 조회
	// TODO 카테고리도 조회해서 String으로 돌려주기, 태그도 배열로 담기
	else {
		db.query(
			'SELECT * FROM course WHERE course_id=?',
			[courseId],
			(err, results, f) => {
				if (err) return res.json(Err(err.message));

				if (results.length === 1) {
					let ret = results[0];
					db.query(
						'SELECT user_name FROM user WHERE user_id=?',
						[ret.course_inst_id],
						(err, results, f) => {
							if (err) return res.json(Err(err.message));

							ret['course_instructor'] = results[0].user_name;
							delete ret['course_inst_id'];
							res.json(ret);
						}
					);
				} else {
					res.json(statusJson(400, 'Bad Request: Invalid course id.'));
				}
			}
		);
	}


});

router.get('/page/:pageNum', (req, res) => {
	return; // 전체 강의 페이지네이션
});

router.get('/cat1/:catNum/page/:pageNum', (req, res) => {
	res.json(statusJson(req.params.catNum, req.params.pageNum));
});

router.get('/cat2/:catNum/page/:pageNum', (req, res) => {
	res.json(statusJson(req.params.catNum, req.params.pageNum));

});

router.get('/', (req, res) => {
	return;
});


export default router;
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

import { DB_connection as db, hashSettings, Err, statusJson } from './../configs';


// express
const router = express.Router();

// middleware
router.use(cors());



// 회원가입
router.post('/join', (req, res) => {
	const salt = crypto.randomBytes(hashSettings.keylen).toString(hashSettings.encoding);
	const key = crypto.pbkdf2Sync(req.body.password, salt, hashSettings.iterations, hashSettings.keylen, hashSettings.digest).toString(hashSettings.encoding);
	db.query(
		'INSERT INTO user(user_email, user_password, user_name, user_sex, user_phone, user_birth, user_joined, user_description, user_salt) VALUES(?, ?, ?, ?, ?, ?, NOW(), ?, ?)',
		[req.body.email, key, req.body.name, req.body.sex, req.body.phone, req.body.birth, req.body.desc, salt],
		(err, results, f) => {
			if (err) return res.json(Err(err.message));

			res.json(statusJson(201, 'Created'));
		}
	);
});

// 아이디 중복체크
router.get('/emailCheck/:email', (req, res) => {
	db.query(
		'SELECT user_id FROM user WHERE user_email=?',
		[req.params.email],
		(err, results, f) => {
			if (err) return res.json(Err(err.message));

			if (results.length == 0) {
				res.json(statusJson(200, 'OK'));
			} else {
				res.json(statusJson(409, 'Conflict'));
			}
		}
	);
});

// // 로그인
// // Parameter : id(String), pw(String)
// // Method : Post
// // Response : 로그인에 성공하면 세션을 만든다.
// router.post('/login', (req, res, next) => {
// 	users.query(
// 		`SELECT * FROM userinfo WHERE userID=?`,
// 		[req.body.id],
// 		(err, results, f) => {
// 			if (err) return res.json(Err(err.message));
			
// 			if (results[0] == undefined) {
// 				res.json({
// 					'statusCode': 401,
// 					'state': 'invalid ID'
// 				});
// 			}
// 			else {
// 				const { userNo, userID, userPW, userSalt } = results[0];
// 				const key = crypto.pbkdf2Sync(req.body.pw, userSalt, iterations, keylen, digest).toString(encoding);
// 				if (userPW == key) {
// 					req.session.uid = userNo;
// 					req.session.isLogined = true;
// 					req.session.userName = userID;
// 					res.json({
// 							'statusCode': 200,
// 							'state': 'Success'
// 					});
// 				}
// 				else {
// 					res.json({
// 						'statusCode': 401,
// 						'state': 'wrong password'
// 					});
// 				}
// 			}
// 		}
// 	);
// });

// // 로그아웃
// // Parameter : 없음
// // Method : Get
// // Response : 세션을 삭제한다.
// router.get('/logout', (req, res, next) => {
// 	req.session.destroy(function(err){});
// 	res.json({
// 		'statusCode': 200,
// 		'state': 'Success'
// 	});
// });


export default router;

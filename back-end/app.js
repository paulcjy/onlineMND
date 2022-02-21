import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import mysqlSession from 'express-mysql-session';
import cors from 'cors';
import 'dotenv/config';

import indexRouter from './routes/index';
import apiRouter from './router/apiRouter';

import { DB_options as options } from './configs'


const app = express();

// session connect
var MySQLStore = mysqlSession(session);
var sessionStore = new MySQLStore(options);

app.use(session({
	secret: 'keyboard cat', // 안보이게 작성
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// router
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// Don't change
module.exports = app;

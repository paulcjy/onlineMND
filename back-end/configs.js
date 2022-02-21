import mysql from 'mysql2';

// console.log('config is loaded!');

export const hashSettings = {
	iterations: Number(process.env.HASH_ITERATIONS),
	keylen: Number(process.env.HASH_KEYLEN),
	digest: process.env.HASH_DIGEST,
	encoding: process.env.HASH_ENCODING
}

export const DB_options = {
	host: process.env.DB_USERS_HOST || 'localhost',
	port: Number(process.env.DB_USERS_PORT || 3310),
	user: process.env.DB_USERS_USER || 'root',
	password: process.env.DB_USERS_PASSWORD || 'root',
	database: process.env.DB_USERS_DATABASE || 'mnd'
}

const DB_connection = mysql.createConnection(DB_options);
DB_connection.connect();
export { DB_connection };

export function statusJson(code, msg) {
	return {
		statusCode: code,
		msg: msg
	}
}

export function Err(msg) {
	return statusJson(401, msg);
}
import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
const app: Express = express();

app.use(express.json());

app.use("/",express.static(path.join(__dirname, "../../realmTNK/dist")));

const dotenv = require('dotenv');
dotenv.config();
let blogData = require('./blogs/blogList.json');
let fs = require('fs');
let parser = require('xml2json');
let XMLWriter = require('xml-writer');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
	host: process.env.HOST,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
});

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
	inResponse.header("Access-Control-Allow-Origin", "*");
	inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
	inNext();
});

app.post("/deleteBlog",
	async (inRequest: Request, inResponse: Response) => {
		console.log("POST /deleteBlog");
		console.log(inRequest.body);
		let conn;
		try {
			conn = await pool.getConnection();
			let sqlString = "INSERT INTO deleted_blogs SELECT * FROM blogs WHERE BlogID = " + inRequest.body.blogId + ";";
			let res = await conn.query(sqlString);
			conn.close();
			console.log(res);
		} catch (inError) {
			console.log("POST /deleteBlog: Error", inError);
			inResponse.send("error");
		}
		try {
			conn = await pool.getConnection();
			let sqlString = "DELETE FROM blogs WHERE BlogID = " + inRequest.body.blogId + ";";
			let res = await conn.query(sqlString);
			conn.close();
			console.log(res);
			inResponse.status(201);
			inResponse.send("ok");
		} catch (inError) {
			console.log("POST /deleteBlog: Error", inError);
			inResponse.send("error");
		}
	}
); 

app.post("/saveBlog",
	async (inRequest: Request, inResponse: Response) => {
		console.log("POST /saveBlog");
		console.log(inRequest.body);
		let conn;
		try {
			conn = await pool.getConnection();
			let sqlString = "INSERT INTO blogs (Title,BlogBody) VALUES ('" + inRequest.body.blogTitle + "','" + inRequest.body.blogBody + "');";
			let res = await conn.query(sqlString);
			conn.close();
			console.log(res);
			inResponse.status(201);
			inResponse.send("ok");
		} catch (inError) {
			console.log("POST /saveBlog: Error", inError);
			inResponse.send("error");
		}		
	}
);

app.post("/editBlog",
	async (inRequest: Request, inResponse: Response) => {
		console.log("POST /createBlog");
		console.log(inRequest.body);
		let conn;
		try {
			conn = await pool.getConnection();
			let sqlString = "UPDATE blogs SET Title = '" + inRequest.body.blogTitle + "', blogBody = '" + inRequest.body.blogBody + "' WHERE BlogID = " + inRequest.body.blogId + ";";
			let res = await conn.query(sqlString);
			conn.close();
			console.log(res);
			inResponse.status(201);
			inResponse.send("ok");
		} catch (inError) {
			console.log("POST /saveBlog: Error", inError);
			inResponse.send("error");
		}		
	}
);


//get list of blogs
app.get("/blogs",
	async (inRequest, inResponse: Response) => {
		console.log("GET /blogs");
		let conn;
		try {
			conn = await pool.getConnection();
			let res = await conn.query("SELECT * FROM blogs");
			console.log(res);
			conn.close();
			inResponse.json(res);
		} catch (inError) {
			console.log("GET /blogs: Error", inError);
			inResponse.send("error");
		}		
	}
);
app.listen(80, () => {
	console.log("Realm server open for requests");
});


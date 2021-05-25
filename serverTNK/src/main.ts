import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

app.use("/",express.static(path.join(__dirname, "../../realmTNK/dist")));

let blogData = require('./blogs/blogList.json');
let fs = require('fs');
let parser = require('xml2json');
let XMLWriter = require('xml-writer');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: "test",
	user: "test",
	password: "test",
	database: "test"
});
async function asyncFunction() {
	let conn;
	try {
		conn = await pool.getConnection();
		const res = await conn.query("SELECT * FROM blogs");
		console.log(res);
	} catch (err) {
		console.log("error found");
			throw err;
	} finally {
			if (conn) return conn.end();
	}
}


app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
	inResponse.header("Access-Control-Allow-Origin", "*");
	inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
	inNext();
});

app.post("/saveBlog",
	async (inRequest, inResponse: Response) => {
		console.log("POST /saveBlog");
		try {
				console.log(blogData);
			blogData.blogs.push(
				{"title": 'ExampleBlog4',
				 "dateWritten": '2021-05-22',
				 "blogFilename":'blog4.xml'			
				}
			);
			var updateBlogData = JSON.stringify(blogData);
			fs.writeFile('./blogs/blogList.json', updateBlogData, function(err:any, result:any){
				if(err) console.log('error', err);
			});
			inResponse.json(blogData);
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
			const res = await conn.query("SELECT * FROM blogs");
			console.log(res);
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


import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

app.use("/",express.static(path.join(__dirname, "../../realmTNK/dist")));

let blogData = require('./blogs/blogList.json');
let fs = require('fs');
let parser = require('xml2json');

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
	inResponse.header("Access-Control-Allow-Origin", "*");
	inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
	inNext();
});

//get list of blogs
app.get("/blogs",
	async (inRequest, inResponse: Response) => {
		console.log("GET /blogs");
		try {
			console.log(blogData);
			inResponse.json(blogData);
		} catch (inError) {
			console.log("GET /mailboxes: Error", inError);
			inResponse.send("error");
		}		
	}
);
//get selected blog data:
app.get("/getSelectedBlogPost/:blogFilepath",
	(inRequest: Request, inResponse: Response) => {
		console.log("GET /getSelectedBlogPost");
		try {
			console.log(inRequest.params.blogFilepath);
			let data = fs.readFileSync(process.cwd() + "/dist/blogs/current/" + inRequest.params.blogFilepath);
			//let data = fs.readFileSync(process.cwd() + '/dist/blogs/current/blog1.xml');
			let jsonBlogData = parser.toJson(data);
			console.log("to json ->", jsonBlogData);
			inResponse.json(JSON.parse(jsonBlogData));	
		} catch (inError) {
			console.log("GET /mailboxes: Error", inError);
			inResponse.send("error");
		}		
	}
);
app.listen(80, () => {
	console.log("Realm server open for requests");
});


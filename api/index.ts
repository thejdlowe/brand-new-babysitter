import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// this example uses axios and form-data
const axios = require("axios");
const FormData = require("form-data");

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

app.get("/text", (req: Request, res: Response) => {
	const data = new FormData();
	data.append("text", "You gotta stop farting so much");
	data.append("lang", "en");
	data.append("mode", "ml");
	data.append("api_user", `${process.env.SIGHTENGINE_USER}`);
	data.append("api_secret", `${process.env.SIGHTENGINE_SECRET}`);

	axios({
		url: "https://api.sightengine.com/1.0/text/check.json",
		method: "post",
		data: data,
		headers: data.getHeaders(),
	})
		.then(function (response: any) {
			// on success: handle response
			//console.log(response.data);
			res.send(response.data);
		})
		.catch(function (error: any) {
			// handle error
			if (error.response) console.log(error.response.data);
			else console.log(error.message);
		});
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//https://sightengine.com/docs/text-moderation-guide for text moderation
//https://unsplash.com/documentation for image generation

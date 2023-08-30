import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// this example uses axios and form-data
const axios = require("axios");
const FormData = require("form-data");

const app: Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
	res.send("Express + TypeScript Server");
});

const suggestions: string[] = [];

app.post("/suggestion", (req: Request, res: Response) => {
	try {
		const data = new FormData();
		const suggestion = req.body.suggestion;
		data.append("text", suggestion);
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
				const data = response.data;
				if (data.moderation_classes) {
					const keys = data.moderation_classes.available;
					let good = true;
					let message: string[] = [];
					keys.forEach((key: string) => {
						if (
							data.moderation_classes[key] &&
							data.moderation_classes[key] >= 0.5
						) {
							message.push(`Invalid due to being too ${key}`);
							good = false;
						}
					});
					if (good === true) {
						suggestions.push(suggestion);
						res.send(response.data);
						return;
					}
					throw { message: message.join(", ") };
				}
				throw { message: "Unable to validate suggestion" };
			})
			.catch(function (error: any) {
				// handle error
				if (error.response) console.log(error.response.data);
				else console.log(error.message);
				res.status(500).send(error.message);
			});
	} catch (e: any) {
		res.status(500).send(e.message);
	}
});

app.get("/suggestion", (req: Request, res: Response) => {
	console.log({ suggestions });
	return res.json({ suggestions });
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//https://sightengine.com/docs/text-moderation-guide for text moderation
//https://github.com/unsplash/unsplash-js#photosgetrandomarguments-additionalfetchoptions for image generation
//https://www.skema.cloud/en/blog/sagot-dev-2/get-started-with-sqlite-database-in-a-typescript-project-7?utm_campaign=Migration+blog+sagot.dev&utm_source=sagot.dev&utm_medium=Website

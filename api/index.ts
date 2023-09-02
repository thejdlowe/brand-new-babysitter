import express, { Express, Request, Response } from "express";
import { createApi } from "unsplash-js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db.sqlite");

db.exec(`CREATE TABLE IF NOT EXISTS suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    suggestion VARCHAR(100) NOT NULL
)`);

dotenv.config();

// this example uses axios and form-data
const axios = require("axios");
const FormData = require("form-data");

const unsplash = createApi({
	accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

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
						db.run(
							`INSERT INTO suggestions(suggestion) VALUES(?)`,
							[suggestion],
							(err: any) => {
								if (err) {
									console.log(err);
									throw { message: "Unable to add suggestion to database" };
								}
								res.send(response.data);
								return;
							}
						);
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
	db.get(
		`SELECT * FROM suggestions ORDER BY RANDOM() LIMIT 1;`,
		[],
		(err: any, row: any) => {
			if (err) {
				res.status(500).send("Unable to select a suggestion");
			}
			if (!row) return res.json({ suggestion: null });
			db.get(`delete from suggestions where id = ?`, [row.id], () => {});
			return res.json({ suggestion: row.suggestion });
		}
	);
});

app.get("/reset", (req: Request, res: Response) => {
	db.get(`delete from suggestions`, [], (err: any, row: any) => {
		if (err) {
			res.status(500).json({ resetSuccessfully: false });
		}
		return res.json({ resetSuccessfully: true });
	});
});

app.get("/image", (req: Request, res: Response) => {
	db.get(
		`SELECT * FROM suggestions ORDER BY RANDOM() LIMIT 1;`,
		[],
		(err: any, row: any) => {
			if (err) {
				res.status(500).send("Unable to select a suggestion");
			}
			if (!row) return res.json({ image: null });
			unsplash.photos.getRandom({ query: row.suggestion }).then((result) => {
				if (result.errors) {
					res.status(500).send("Unable to fetch image");
				} else {
					// @ts-ignore
					res.json({ image: result.response.urls.full });
				}
			});
		}
	);
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//https://sightengine.com/docs/text-moderation-guide for text moderation
//https://github.com/unsplash/unsplash-js#photosgetrandomarguments-additionalfetchoptions for image generation
//https://www.skema.cloud/en/blog/sagot-dev-2/get-started-with-sqlite-database-in-a-typescript-project-7?utm_campaign=Migration+blog+sagot.dev&utm_source=sagot.dev&utm_medium=Website

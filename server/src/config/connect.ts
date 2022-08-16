import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

mongoose.connect(`${URI}`, (err) => {
	if (err) console.log("mongodb connection error.");
	console.log("mongodb connected.");
});

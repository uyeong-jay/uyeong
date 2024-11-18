import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

mongoose.connect(`${URI}`, (err) => {
  if (err) console.log("mongodb connection error.");
  console.log("mongodb connected.");
});

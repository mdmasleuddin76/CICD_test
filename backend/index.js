// require('dotenv').config()
import "dotenv/config";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
const app = express();
import cors from "cors";
// const bodyParser = require('body-parser');
import bodyParser from "body-parser";
import twilio from "twilio";
const { MessagingResponse } = twilio.twiml;
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const genAI = new GoogleGenerativeAI(AIzaSyAz_lPhTPQcudHRLeL9J9F2OoeRzqVz04g);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
async function run(test) {
  const prompt = `Please generate a list of 5 movies similar to Money \n ${test}.\n Provide the movies in a comma-separated format with each movie's name and genre. The format should be exactly as follows: name:Movie Name, genre:Genre. Ensure there are no extra characters, no additional text, and no colons (:) used anywhere except after name and genre.example, name:Money Heist, genre:action,kdlgjlgndgdl  name:The Wandering Earth, genre:sci-fi..Do not write anything else in the response. This is crucial for my code to parse the data correctly.if there are multiple genre for a movie, please separate them with a slash (/) and no space.`;

  return prompt;
}

app.get("/", async (req, res) => {
  const { test } = req.body;
  const data = await run(test);
  res.json({ name: "Hacked", data: data });
});

app.post("/", async(req, res) => {
  const twiml = new MessagingResponse();
  // const result = await model.generate(req.body.Body);
  const result = await model.generateContent(req.body.Body);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  twiml.message(text);
  // if (req.body.Body == "hello") {
  //   twiml.message("Hi!");
  // } else if (req.body.Body == "bye") {
  //   twiml.message("Goodbye");
  // } else {
  //   twiml.message(
  //     "No Body param match, Twilio sends this in the request to your server."
  //   );
  // }
  res.type("text/xml").send(twiml.toString());
});
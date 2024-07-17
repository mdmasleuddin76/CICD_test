// require('dotenv').config()
import "dotenv/config";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
const app = express();
import cors from "cors";
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function run(test) {

  const prompt = `Please generate a list of 5 movies similar to Money \n ${test}.\n Provide the movies in a comma-separated format with each movie's name and genre. The format should be exactly as follows: name:Movie Name, genre:Genre. Ensure there are no extra characters, no additional text, and no colons (:) used anywhere except after name and genre.example, name:Money Heist, genre:action,  name:The Wandering Earth, genre:sci-fi..Do not write anything else in the response. This is crucial for my code to parse the data correctly.if there are multiple genre for a movie, please separate them with a slash (/) and no space.`;

  return prompt;
}

app.post("/", async (req, res) => {
  const {test } = req.body;
  const data = await run(test);
  res.json({ name: "Hacked", data: data });
});

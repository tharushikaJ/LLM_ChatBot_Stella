require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages,
      temperature: 0.7
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.json({
      reply: "Something went wrong 💗" 
    });
  }
});

app.listen(3000, () => {
  console.log("Stella is running at http://localhost:3000");
});

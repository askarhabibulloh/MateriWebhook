import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);

app.get("/", async (req, res) => {
  const response = await fetch("http://localhost:3000/");
  const body = await response.text();

  console.log(body);
  res.json("web-b");
});

app.get("/trigger-webhook-event", async (req, res) => {
  try {
    const data = {
      secret: "secret123",
    };

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    // Handle the response if needed
    const responseData = await response.json();
    console.log(responseData);

    res.json("Webhook event triggered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

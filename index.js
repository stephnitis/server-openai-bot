// requiring configuration from openai
// setting the configuration with the organization
const { Configuration, OpenAIApi } = require("openai");

const express = require('express');
const bodyParser = require('body-parser');

// cors allows us to send messages to and from different ports and domains
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
app.use(bodyParser.json())
app.use(cors())


dotenv.config();
const PORT = 3080;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// create a simple express api that calls this function
app.post('/', async (req, res) => {

  const {message} = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({

    message: response.data.choices[0].text
  })
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
});
const express = require("express");
const app = express();
const dfff = require("dialogflow-fulfillment");

const axios = require("axios");

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.get("/", async function (req, res) {
  const data = [];
  let url =
    "https://api.openweathermap.org/data/2.5/forecast?q=chennai&appid=c1bea648f3c6db74595c7c465820709c";

  await axios
    .get(url)
    .then((res) => {
      data.push(res.data.list[0].weather[0].description);
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(`Current weather in chennai will be ${data} ☁`);
});

app.post("/chat", async function (request, response) {
  var city = "krypton";
  city = request.body.queryResult.parameters.city;
  request.body.queryResult.parameters["city"];
  console.log("city" + " " + city);
  if (city == null) {
    city = "dubai";
  }
  let data = [];
  let weatherapi =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=c1bea648f3c6db74595c7c465820709c";

  await axios(weatherapi)
    .then((response) => {
      data.push(response.data.list[0].weather[0].description);
      console.log("response", response);
    })

    .catch((error) => {
      console.log(error);
    });
  response.send(
    JSON.stringify({
      fulfillmentText: `Current weather in ${city} will be ${data} ☁`,
    })
  );
});

app.listen(PORT, () => console.log(`server is  live on port ${PORT}`));

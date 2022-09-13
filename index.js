const express = require("express");
const app = express();
const dfff = require("dialogflow-fulfillment");

const axios = require("axios");

const dotenv = require("dotenv");

// const nodefetch = require("node-fetch");

dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(express.json());

// var admin = require("firebase-admin");

// var serviceAccount = require("./lookupbot2-firebase-adminsdk-zub5z-550ede69cb.json");

// admin.initializeApp({
//   Credential: admin.Credential.cert(serviceAccount),
//   databaseURL: "https://lookupbot2.firebaseio.com",
// });

// const axios = require('axios')
app.get("/", async function (req, res) {
  const data = [];
  let url =
    "https://api.openweathermap.org/data/2.5/forecast?q=secunderabad&appid=c1bea648f3c6db74595c7c465820709c";

  await axios
    .get(url)
    .then((res) => {
      data.push(res.data.list[0].weather[0].description);
    })
    .catch((error) => {
      console.log(error);
    });
  res.send(data);
});

// app.get("/", async function (req, res) {
//   try {
//     const response = await axios.get(
//       // "https://api.openweathermap.org/data/2.5/forecast?q=secunderabad&appid=c1bea648f3c6db74595c7c465820709c"
//       "https://restcountries.com/v2/all"
//       // method: "get"
//     );
//     res.status(200).json([...response]);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// app.post("/", express.json(), (req, res) => {
//   const agent = new dfff.webhookclient({
//     request: req,
//     response: res,
//   });

//   function demo(agent) {
//     agent.add("sending response from webhook server ");
//   }

//   var intentmap = new Map();

//   intentmap.set("get_weather", demo);

//   agent.handlerequest(intentmap);
// });

app.post("/chat", async function (request, response) {
  // var request = require("request");

  var city = "krypton";
  city = req.body.queryResult.parameters.city;
  request.body.queryResult.parameters["city"];
  console.log("city" + " " + city);
  if (city == null) {
    city = "singapore";
  }
  let data = [];
  let weatherapi =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=c1bea648f3c6db74595c7c465820709c";
  await axios(weatherapi)
    .then((response) => {
      data.push(response.data.list[0].weather[0].description);
    })
    .catch((error) => {
      console.log(error);
    });
  response.send(
    JSON.stringify({
      data: "hi",
      fullfillment: data,
    })
  );
  console.log(`Current weather in ${city} will be ${data}`);
});

//   {
//     response.setHeader('Content-Type', 'application/json'),
//     response.send(JSON.stringify({
//         "speech" : "Couldn't find any deatails. :(  ",
//         "displayText" : "Couldn't find any deatails. :(  "
//     }));
// }

// var obj = JSON.parse(body);
// console.log(obj);

// var list = obj.list[0];
// console.log("total length : " + obj.list.length);
// var tempDate = new Date("2022-09-10T12:00:00+09:00");
// console.log("tempdate month is " + tempDate.getMonth());

// var s = "";
// var description = "none found";
// for (var i = 0; i < obj.list.length; i++) {
//   var date = new Date(obj.list[i].dt * 1000);

//   var s = "";
//   var description = "none found";
//   for (var i = 0; i < obj.list.length; i++) {
//     var date = new Date(obj.list[i].dt * 1000);
//     var weather = obj.list[i].weather[0].description;

//     console.log("monthis " + date.getMonth());
//     console.log("the day is " + date.getDate());

//     if (date.getMonth() == month && date.getDate() == day) {
//       description = weather;
//       description = description + " " + date.toString();
//     }
//   }
// }

app.listen(PORT, () => console.log(`server is  live on port ${PORT}`));

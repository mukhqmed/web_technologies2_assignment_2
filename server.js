
const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));



app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "dfe2f0f85af50928919ba51d8b0e4e3d";
  const astronomyApiKey = "fHiCapPrSK";
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  try {
    const weatherResponse = await axios.get(weatherAPIUrl);
    const weatherData = weatherResponse.data;

    const { coord } = weatherData;
    const lat = coord.lat;
    const lon = coord.lon;

    const astronomyAPIUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today&api_key=${astronomyApiKey}`;
    const astronomyResponse = await axios.get(astronomyAPIUrl);
    const astronomyData = astronomyResponse.data.results;

    res.render("index", {
      weather: weatherData,
      astronomy: astronomyData,
      error: null,
      lat: lat,
      lon: lon,
      weatherName: weatherData.name
    });
  } catch (error) {
    res.render("index", {
      weather: null,
      astronomy: null,
      error: "Error, Please try again",
      lat: null,
      lon: null
    });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
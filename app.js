

const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");



});

app.post("/", (req, res) => {

    const cityName= req.body.cityName;
   

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=2d0e44b04e212c590f65e993c2c31d3d&units=metric"

    https.get(url, (response) => {

        response.on("data", (data) => {

            const weatherData = JSON.parse(data); //converting data from hex to JSON 

            const imageURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";



            res.write("<br><br><center><h1>The temperature in " + cityName+ "is " + weatherData.main.temp + " degrees Celcius</h1></center>");

            res.write("<center><p>The sky is: " + weatherData.weather[0].description + "</p></center>")

            res.write("<center><img src=" + imageURL + "></center>");

            res.send();





        });

    });



});







app.listen(3000, () => {
    console.log("Server Running on port 3000");
});
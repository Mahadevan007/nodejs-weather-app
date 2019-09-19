const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Dev"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dev"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Hi, I am here to help"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          forecast: forecastdata,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("helperror.hbs", {
    title: "Help error Page",
    message: "Help page not found"
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "Error page",
    message: "404 Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up ;)");
});

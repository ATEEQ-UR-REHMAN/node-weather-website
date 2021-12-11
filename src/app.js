import path from "path";
import express from "express";
import hbs from "hbs";

import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const app = express();

// Define paths for Express config
const __dirname = path.resolve();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index",{
        title: "Weather",
        name: "Ateeq Aziz"
    })
});

app.get("/about", (req, res) => {
    res.render("about",{
        title: "About Me",
        name: "Ateeq Aziz"
    })
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text",
        title: "Help",
        name: "Ateeq Aziz"
    })
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ateeq Aziz",
        errorMessage: "Help page not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ateeq Aziz",
        errorMessage: "Page not found"  
    });
});

app.listen(3000,() => {
    console.log("Server is up on port 3000.");
});

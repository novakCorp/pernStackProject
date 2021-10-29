require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

// Defining the body property in the response
app.use(express.json());

// Building a restful API
// DEFINING THE ROUTES

app.get("/api/v1/restaurants", (req, res) => {

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "MCDonalds"
        }
    });
});


app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req);
});


app.post("/api/v1/restaurants/", (req, res) => {
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "MCDonalds"
        }
    });
});



app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    res.status(200).json({
        status: "success",
        data: {
            restaurant: "MCDonalds"
        }
    });
});


app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(200).json({
        status: "Deleted succesfully baby"
    });
});



app.listen(port, () => {
    console.log(`server is up and listening on port: ${port}`);
});
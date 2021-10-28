require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT || 3001;

// Building a restful API
// DEFINING THE ROUTES

app.get("/getRestaurants", (req, res) => {
    res.json({
        status: "success",
        restaurant: "MCDonalds",
        quality: "Delicious hamburguers"
    });
});






app.listen(port, () => {
    console.log(`server is up and listening on port: ${port}`);
});
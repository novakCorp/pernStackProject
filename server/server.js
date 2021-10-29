require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

// importing the file to work with postgres
const db = require("./db/index");

// Defining the body property in the response
app.use(express.json());

// Building a restful API
// DEFINING THE ROUTES

app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("select * from restaurants");

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});


app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const result = await db.query(`select * from restaurants where id= $1`, [req.params.id]);
        res.status(200).json({
            status: "success",
            result: result.rows.length,
            data: {
                restaurant: result.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err)
    }
});


app.post("/api/v1/restaurants/", async (req, res) => {

    try {
        // returning: returns the row inserted or created, 
        // * means = return all the data of the new inserted value
        const result = await db.query(`INSERT INTO restaurants (name, location, price_range) values ($1,$2,$3) returning *`,
            [req.body.name, req.body.location, req.body.price_range]);

        res.status(201).json({
            status: "success",
            result: result.rows.length,
            data: {
                restaurant: result.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});



app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const result = await db.query(`UPDATE restaurants SET name= $1, location= $2, price_range= $3 WHERE id=$4 returning *`,
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);

        res.status(200).json({
            status: "success",
            result: result.rows.length,
            data: {
                restaurant: result.rows[0]
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});


app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const result = await db.query(`DELETE FROM restaurants WHERE id = $1`, [req.params.id]);

        res.status(200).json({
            status: "Deleted succesfully",
        });
    }
    catch (err) {
        console.log(err);
    }
});



app.listen(port, () => {
    console.log(`server is up and listening on port: ${port}`);
});
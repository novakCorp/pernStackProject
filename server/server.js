require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// importing the file to work with postgres
const db = require("./db/index");

// Defining the body property in the response
app.use(express.json());

// To avoid cors problem
app.use(cors());

// Building a restful API
// DEFINING THE ROUTES

app.get("/api/v1/restaurants", async (req, res) => {

    try {
        //const results = await db.query("select * from restaurants");

        const restaurantRatingsData = await db.query(
            `select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews 
            group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;`
        );
        console.log(restaurantRatingsData);

        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});


app.get("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const restaurant = await db.query(`select * from restaurants left join (select restaurant_id, COUNT(*), 
        TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id 
        where id = $1;`, [req.params.id]);

        const reviews = await db.query(`select * from reviews where restaurant_id= $1`, [req.params.id]);


        res.status(200).json({
            status: "success",
            data: {
                restaurants: restaurant.rows[0],
                reviews: reviews.rows
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
                restaurants: result.rows[0]
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
                restaurants: result.rows[0]
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


app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4);",
            [req.params.id, req.body.name, req.body.review, req.body.rating]);

        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})


app.listen(port, () => {
    console.log(`server is up and listening on port: ${port}`);
});
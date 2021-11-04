import React, { useEffect, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

const RestaurantList = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // query the database and get the data
                const response = await RestaurantFinder.get("/");
                console.log(response);
                setRestaurants(response.data.data.restaurants);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchData();
        // we pass an empty array to call this just one time when it 
        // loads and not for every time there is a change
    }, []);


    const handleDelete = async (id) => {

        try {
            // we're passing the id to delete the specific route in the api
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(
                // remove the item deleted from the array and update the data in the list
                restaurants.filter((restaurant) => {
                    return restaurant.id !== id;
                })
            );
        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th className="bg-primary" scope="col">Restaurant</th>
                        <th className="bg-primary" scope="col">Location</th>
                        <th className="bg-primary" scope="col">Price Range</th>
                        <th className="bg-primary" scope="col">Ratings</th>
                        <th className="bg-primary" scope="col">Edit</th>
                        <th className="bg-primary" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants &&
                        restaurants.map((restaurant) => {
                            return (
                                <tr key={restaurant.id}>
                                    <td> {restaurant.name} </td>
                                    <td> {restaurant.location} </td>
                                    <td> {"$".repeat(restaurant.price_range)} </td>
                                    <td> reviews </td>
                                    <td> <button className="btn btn-warning">Update</button> </td>
                                    <td> <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button> </td>
                                </tr>
                            );
                        })}

                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
import React, { useEffect, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

const RestaurantList = () => {

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

            }
        }

        fetchData();
        // we pass an empty array to call this just one time when it 
        // loads and not for every time there is a change
    }, []);

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
                    <tr>
                        <td>MCDonals</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td> <button className="btn btn-warning">Update</button> </td>
                        <td> <button className="btn btn-danger">Delete</button> </td>
                    </tr>
                    <tr>
                        <td>MCDonals</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td> <button className="btn btn-warning">Update</button> </td>
                        <td> <button className="btn btn-danger">Delete</button> </td>
                    </tr>
                    <tr>
                        <td>MCDonals</td>
                        <td>New York</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td> <button className="btn btn-warning">Update</button> </td>
                        <td> <button className="btn btn-danger">Delete</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
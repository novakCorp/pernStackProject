import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';


const RestaurantDetailPage = (props) => {

    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response);
                setSelectedRestaurant(response.data.data.restaurants);
            }
            fetchData();
        }


        catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div>
            {selectedRestaurant && selectedRestaurant.name}
        </div>
    )
}

export default RestaurantDetailPage;
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StartRating';
import Reviews from '../components/Reviews';

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
            {selectedRestaurant && (
                <>
                    <div>
                        <Reviews />
                    </div>
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage;
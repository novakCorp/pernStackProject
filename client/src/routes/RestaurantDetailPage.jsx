import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = (props) => {

    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await RestaurantFinder.get(`/${id}`);
                console.log(response);
                setSelectedRestaurant(response.data.data);
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
                    <h1>{selectedRestaurant.restaurants.name}</h1>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReview />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage;
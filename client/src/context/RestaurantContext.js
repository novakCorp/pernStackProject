import React, { useState, createContext } from 'react';
export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const addRestaurants = (restaurant) => {
        // adding the new restaurant to the array of restaurants
        setRestaurants([...restaurants, restaurant]);
    }

    return (
        <RestaurantsContext.Provider
            value={{
                restaurants,
                setRestaurants,
                addRestaurants,
                selectedRestaurant,
                setSelectedRestaurant
            }}>
            {props.children}
        </RestaurantsContext.Provider>
    );

};


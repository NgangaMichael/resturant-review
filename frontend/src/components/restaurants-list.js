import React, { useEffect, useState } from 'react'
import RestaurantDataService from '../services/restaurant'
import { Link } from 'react-router-dom'

export default function RestaurantsList() {

    const [restaurants, setRestaurants] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchZip, setSearchZip] = useState('')
    const [searchCuisine, setSearchCuisine] = useState('')
    const [cuisines, setCuisines] = useState(['All Cuisines'])

    useEffect(() => {
        retriveRestaurants();
        retriveCuisines();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName)
    };

    const onChangeSearchZip = e => {
        const searchZip = e.target.value;
        setSearchZip(searchZip);
    }

    const onChangeSearchCuisines = e => {
        const searchCuisine = e.target.value;
        setSearchCuisine(searchCuisine);
    }

    const retriveRestaurants = () => {
        RestaurantDataService.getAll()
        .then(response => {
            console.log(response.data);
            setRestaurants(response.data.restaurants)
        })
        .catch(e => {
            console.log(e)
        });
    };

    const retriveCuisines = () => {
        RestaurantDataService.getCuisine()
        .then(response => {
            console.log(response.data)
            setCuisines(['All Cuisines'].concat(response.data));
        })
        .catch(e => {
            console.log(e)
        });
    };

    const refreshList = () => {
        retriveRestaurants();
    };

    const find = (query, by) => {
        RestaurantDataService.find(query, by)
        .then(response => {
            console.log(response.data)
            setRestaurants(response.data.restaurants);
        })
        .catch(e => {
            console.log(e)
        });
    };

    const findByName = () => {
        find(searchName, 'name')
    };

    const findByZip = () => {
        find(searchZip, 'zipcode')
    };

    const findByCuisine = () => {
        if(searchCuisine === 'All Cuisines') {
            refreshList();
        } else {
            find(searchCuisine, 'cuisine')
        }
    };

    return (
        <div>
            <div className='row pb-1'>
                <div className='input-group col'>
                    <input 
                    type='text'
                    className='form-control'
                    placeholder='search by name'
                    value={searchName}
                    onChange={onChangeSearchName}
                    />

                    <div className='input-group-append'>
                        <button
                        className='btn btn-outline-primary'
                        type='button'
                        onClick={findByName}
                        >
                        Search
                        </button>
                    </div>
                </div>

                <div className='input-group col'>
                    <input 
                    type='text'
                    className='form-control'
                    placeholder='search by zip'
                    value={searchZip}
                    onChange={onChangeSearchZip}
                    />
                    <div className='input-group-append'>
                        <button
                        className='btn btn-outline-secondary'
                        type='button'
                        onClick={findByZip}
                        >
                        Search
                        </button>
                    </div>
                </div>

                <div className='input-group col'>
                    <select onChange={onChangeSearchCuisines} className='form-control'>
                        {cuisines.map(cuisine => {
                            return (
                                <option value={cuisine}>{cuisine.substr(0, 20)}</option>
                            )
                        })}
                    </select>

                    <div className='input-group-append'>
                        <button
                        className='btn btn-outline-secondary'
                        type='button'
                        onClick={findByCuisine}
                        >
                        Search
                        </button>
                    </div>
                </div>
            </div>

            <div className='row'>
                {restaurants.map((restaurant) => {
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className='col-lg-4 pb-1'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{restaurant.name}</h5>
                                    <p className='card-text'>
                                        <strong>Cuisines: </strong> {restaurant.cuisine} <br />
                                        <strong>Address: </strong> {address}
                                    </p>
                                    <div className='row'>
                                        <Link to={'/restaurants/'+ restaurant._id} className='btn btn-primary col-lg-5 mx-1 mb-1'>
                                            View Reviews
                                        </Link>
                                        <a target='_blank' href={'https://www.google.com/maps/place/'+ address} className='btn btn-primary col-lg-5 mx-1 mb-1'>View maps </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

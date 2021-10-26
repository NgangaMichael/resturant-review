import React, { useState } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddReview from './components/add-review';
import Restaurant from './components/restaurants';
import RestaurantsList from './components/restaurants-list';
import Login from './components/login';

export default function App() {

  const [user, setUser] = useState(null)

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <div className='container'>
        <a href='/restaurants' className='navbar-brand'>Restaurant Reviews</a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/restaurants'} className='nav-link'>Restaurants</Link>
          </li>
          <li className='nav-item'>
            {user ? (
              <a onClick={logout} className='nav-link' style={{cursor: 'pointer'}}>LogOut {user.name}</a>
            ) : (
              <Link to={'/login'} className='nav-link'>LogIn</Link>
            )}
          </li>
        </div>
        </div>
      </nav>

      <div className='container mt-3'>
        <Switch>
          <Route exact path={['/', '/restaurants']} component={RestaurantsList} />
          <Route path='/restaurants/:id/review' render={(props => (
            <AddReview {...props} user={user} />
          ))} />
          <Route path='/restaurants/:id' render={(props) => (
            <Restaurant {...props} user={user} />
          )} />
          <Route path='/login' render={(props) => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </div>
  )
}

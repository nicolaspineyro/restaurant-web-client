import React from 'react';
import './css/main.css';

import { Route, Switch } from 'react-router';

import Orders from './components/pages/Orders';
import NewItem from './components/pages/NewItem';
import Menu from './components/pages/Menu';
import SideBar from './components/ui/SideBar';

import firebase, { FirebaseContext } from './firebase';


function App() {
  return (
    <FirebaseContext.Provider
      value={{ firebase }}
    >
      <div className='flex min-h-screen'>

        <SideBar />

        <div className='md:w-3/5 xl:w-4/5'>
          <Switch>
            <Route exact path='/orders'>
              <Orders />
            </Route>

            <Route path='/menu'>
              <Menu />
            </Route>

            <Route path='/newitem'>
              <NewItem />
            </Route>
          </Switch>
        </div>

      </div >
    </FirebaseContext.Provider>
  );
}

export default App;

import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='md:w-2/5 xl:w-1/5 bg-gray-900'>
            <div className='p-6'>
                <p className='text-2xl text-white text-center font-bold uppercase tracking-wide' >Restaurant App</p>
                <p className='text-lg text-gray-300 mt-5' >Get track and add new orders for your Restaurant!</p>
            </div>
            <nav>
                <NavLink
                    to='/menu' className='text-lg text-white block p-2 hover:text-gray-900 hover:bg-yellow-500'
                    activeClassName='bg-yellow-500'
                >
                    Menu
                </NavLink>
                <NavLink
                    to='/orders' className='text-lg text-white block p-2 hover:text-gray-900 hover:bg-yellow-500'
                    activeClassName='bg-yellow-500'
                >
                    Orders
                </NavLink>
            </nav>
        </div>
    )
}

export default SideBar;
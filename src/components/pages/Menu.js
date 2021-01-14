import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FirebaseContext } from '../../firebase';

import Item from '../ui/Item'

const Menu = () => {

    const [menu, setMenu] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    const getMenu = () => {
        try {
            firebase.db.collection('products').onSnapshot(handleSnapshot);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMenu();
    }, []);

    const handleSnapshot = (snapshot) => {
        const items = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setMenu(items);
    }
    console.log(menu);
    return (
        <div className='p-3 bg-gray-100 h-screen'>
            <h1 className='text-3xl font-light mb-2 pl-3' >Menu:</h1>
            <div className='my-7 pl-3'>
                <Link to='/newitem' className='bg-gray-800 p-3 text-lg text-white font-bold uppercase hover:bg-gray-600'>Add a new Menu Item</Link>
            </div>
            {menu.map((item) => <Item
                key={item.id}
                item={item}
            />)}
        </div>
    )
}

export default Menu;
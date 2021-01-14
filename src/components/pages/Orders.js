import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';

import Order from '../ui/Order';

const Orders = () => {

    const { firebase } = useContext(FirebaseContext);

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {

        try {
            await firebase.db.collection('orders').where('completed', '==', false).onSnapshot(handleSnapshot)
        } catch (error) {
            console.log(error);
        }

    }
    const handleSnapshot = (snapshot) => {
        const orders = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        setOrders(orders)
    }

    return (
        <>
            <h1 className='text-3xl mb-4 ml-4 font-light' >Orders</h1>
            {
                orders.map((item) => {
                    return (
                        <Order
                            key={item.id}
                            order={item}
                        />
                    )
                })
            }
        </>
    )
}

export default Orders;
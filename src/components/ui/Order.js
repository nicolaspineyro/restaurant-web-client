import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../firebase';

const Order = ({ order }) => {

    const { firebase } = useContext(FirebaseContext);

    const [deliveryTime, setDeliveryTime] = useState(4);

    const changeDeliveryTime = (id) => {
        try {
            firebase.db.collection('orders').doc(id).update({
                deliveryTime
            })
        } catch (error) {
            console.log(error);
        }

    }

    const completeOrder = (id) => {
        try {
            firebase.db.collection('orders').doc(id).update({
                completed: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
            <div className='p-3 shadow-md bg-white'>
                <h1 className='text-yellow-600 text-lg font-bold'>{order.id}</h1>
                {order.order.map(item => {
                    return (<p className='text-gray-600' >{item.quantity} {item.name}</p>)
                })}
                <p className='text-gray-700 font-bold'>Total: $ {order.total}</p>

                {order.deliveryTime === 0 && (
                    <div className='mb-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Delivery time:
                        </label>
                        <input
                            type='number'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            min='1'
                            max='4'
                            placeholder='20'
                            onChange={(e) => setDeliveryTime(parseInt(e.target.value))}
                            value={deliveryTime}
                        />
                        <button
                            onClick={() => changeDeliveryTime(order.id)}
                            type='submit'
                            className='bg-gray-800 hover:bg-gray-900 w-full text-white mt-4 uppercase font-bold'
                        >
                            Set delivery time
                        </button>
                    </div>
                )}

                {!order.completed && order.deliveryTime > 0 && (
                    <button
                        className='bg-gray-800 hover:bg-gray-900 w-full text-white mt-4 uppercase font-bold'
                        onClick={() => completeOrder(order.id)}
                    >
                        Order completed
                    </button>
                )
                }
            </div>
        </div>
    )

}

export default Order;
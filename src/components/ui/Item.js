import React, { useRef, useContext } from 'react';

import { FirebaseContext } from '../../firebase';

const Item = ({ item }) => {

    const { name, description, image, price, type, existence, id } = item;

    const refExistence = useRef(existence);

    const { firebase } = useContext(FirebaseContext);

    const setStock = () => {
        const existence = (refExistence.current.value === 'true');
        try {
            firebase.db.collection('products').doc(id).update({
                existence
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full px-3 mb-4'>
            <div className='p-5 shadow-md bg-white'>
                <div className='lg:flex'>
                    <div className='lg:w-5/12 xl:w-3/12 md:w-7/12'>
                        <img src={image} alt='Item image' />
                        <div className='sm:flex sm:-mx-2 pl-2' >
                            <label className='block mt-5 sm:w-2/4'>
                                <span className='block text-gray-800 mb-2 font-bold' >Stock:</span>
                                <select
                                    className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                                    value={existence}
                                    ref={refExistence}
                                    onChange={() => setStock()}
                                >
                                    <option value='true'>Avaliable</option>
                                    <option value='false'>Unavaliable</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className='lg:w-7/12 xl:w-9/12 md:w-5/12 pl-5'>
                        <p className='font-bold text-2xl text-yellow-600 mb-4'>{name}</p>
                        <p className='text-gray-600 mb-4' >Type: {''}
                            <span className='text-gray-700 font-bold'> {type.toUpperCase()} </span>
                        </p>
                        <p className='text-gray-600 mb-4'>Description: {''} {description}</p>
                        <p className='text-gray-600 mb-4' >Price: {''}
                            <span className='text-gray-700 font-bold'>$ {price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;
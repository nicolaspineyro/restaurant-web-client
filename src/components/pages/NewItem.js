import React, { useContext, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { FirebaseContext } from '../../firebase/';

import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewItem = () => {

    let history = useHistory();

    const { firebase } = useContext(FirebaseContext);

    const [imageURL, setImageURL] = useState('');

    const handleImage = async (e) => {

        const image = e.target.files[0];
        const id = uuid();


        await firebase.storage.ref('products').child(id).put(image);

        await getURL(id);

    }

    const getURL = async (id) => {

        const url = await firebase.storage.ref('products').child(id).getDownloadURL();
        setImageURL(url);

    }

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            type: '',
            image: '',
            description: ''
        },
        onSubmit: item => {
            try {
                item.existence = true;
                item.image = imageURL;

                firebase.db.collection('products').add(item);

                history.push('/menu');
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name is too short, 3 characters are the minimum.')
                .required('Name of the item is required.'),
            price: Yup.number()
                .min(1, 'Must have at least 1 number.')
                .required('Price of the item is required.'),
            type: Yup.string()
                .required('Name of the item is required.'),
            description: Yup.string()
                .min(10, 'Description too short, 10 characters are the minimum.')
                .required('The description is required.'),
        })
    })

    return (
        <div className='p-3'>
            <h1 className='text-3xl font-light mb-2' >Add a new Menu item</h1>
            <div className='flex justify-center mt-10'>
                <div className='w-full max-w-3xl'>
                    <form
                        onSubmit={formik.handleSubmit}
                    >

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Name
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='name'
                                type='text'
                                placeholder='Name of the item'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.name && formik.errors.name ? (
                            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-2'>
                                <p className='font-bold'>There's an error:</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Price
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='price'
                                type='number'
                                placeholder='$20'
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.price && formik.errors.price ? (
                            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-2'>
                                <p className='font-bold'>There's an error:</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Type
                            </label>
                            <select
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='type'
                                type='text'
                                placeholder='Name of the item'
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value=''>Select</option>
                                <option value='Breakfast'>Breakfast</option>
                                <option value='Food'>Food</option>
                                <option value='Drink'>Drink</option>
                                <option value='Dessert'>Dessert</option>
                                <option value='Salad'>Salad</option>
                            </select>
                        </div>

                        {formik.touched.type && formik.errors.type ? (
                            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-2'>
                                <p className='font-bold'>There's an error:</p>
                                <p>{formik.errors.type}</p>
                            </div>
                        ) : null}

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Image
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='image'
                                type='file'
                                accept='image/*'
                                value={formik.values.image}
                                onChange={handleImage}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                Description
                            </label>
                            <textarea
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
                                id='description'
                                type='file'
                                placeholder='Description of the item'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                            </textarea>
                        </div>

                        {formik.touched.description && formik.errors.description ? (
                            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-2'>
                                <p className='font-bold'>There's an error:</p>
                                <p>{formik.errors.description}</p>
                            </div>
                        ) : null}

                        <input
                            className='w-full bg-gray-900 text-white uppercase font-bold p-1'
                            type='submit'
                            value='Add new item'
                        />
                    </form>
                </div>
            </div>
        </div >
    )
}

export default NewItem;
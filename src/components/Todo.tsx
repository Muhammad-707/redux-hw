import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Todo() {
    const [data, setData] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    const handleAddItem = (submitedValue) => {
        setData((prev) => [...prev, submitedValue])
    }

    const handleEditItem = (submitedValue) => {
        const updatedData = [...data]
        updatedData[editIndex] = submitedValue
        setData(updatedData)
        setEditIndex(null)
    }

    const { handleSubmit, values, handleChange, setValues, resetForm, touched, errors } = useFormik({
        initialValues: {
            name: '',
            age: ''
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(3, 'Must be 3 characters or more')
                .required('Required'),
            age: Yup.number()
                .required('Required')
        }),

        onSubmit: (submitedValue) => {
            if (editIndex !== null) {
                handleEditItem(submitedValue)
            } else {
                handleAddItem(submitedValue)
            }
            resetForm()
        },
    })

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center pt-20 font-sans'>
            <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded-2xl p-6 w-80 flex flex-col gap-4 mb-8'>
                <h2 className='text-xl font-bold text-center text-gray-700'>
                    {editIndex !== null ? 'Edit' : 'Add'}
                </h2>

                <input value={values.name} onChange={handleChange} name='name' type="text" placeholder="Name" className='border-2 border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-colors' />
                {touched.name && errors.name ? (
                    <div className='text-red-500'>{errors.name}</div>
                ) : null}

                <input value={values.age} onChange={handleChange} name='age' type="number" placeholder="Age" className='border-2 border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-colors' />
                {touched.age && errors.age ? (
                    <div className='text-red-500'>{errors.age}</div>
                ) : null}

                <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md active:scale-95'>
                    {editIndex !== null ? 'Save' : 'Submit'}
                </button>
            </form>

            <div className='w-80 flex flex-col gap-4'>
                {
                    data.map((e, index) => {
                        return (
                            <div key={index} className='bg-white shadow-md rounded-2xl p-4 flex justify-between items-center border border-gray-100'>
                                <div className='flex flex-col'>
                                    <h1 className='text-lg font-bold text-gray-800'>{e.name}</h1>
                                    <h3 className='text-sm text-gray-500'>Age: {e.age}</h3>
                                </div>

                                <button type="button" onClick={() => {
                     
                     
                     setEditIndex(index);
                                    setValues(data[index])
                                }} className='text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors'>
                                    Edit
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
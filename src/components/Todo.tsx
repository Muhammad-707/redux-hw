import React, { useEffect } from 'react'
import { deleteData, getData } from '../reducer/TodoSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'

export default function Todo() {
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((store: RootState) => store.todo)

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-800 py-10 px-4 flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
                <div className='flex justify-between'>
                    <input type="text" placeholder='Search...' className='border-2 outline-none px-2 py-1 rounded-2xl focus:shadow-[0_0_5px_0_blue] focus:border-blue-500'/>
                    <button className='bg-blue-500 text-white font-bold px-8 py-1 rounded-2xl'>ADD</button>
                </div>
                <div className="flex flex-col gap-4">
                    {data.map((e) => (
                        <div key={e.id} className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold text-gray-800">{e.name}</h2>
                                <span className="text-sm text-gray-500 mt-1">{e.job}</span>
                            </div>
                            <button onClick={() => dispatch(deleteData(e.id))} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-red-300">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
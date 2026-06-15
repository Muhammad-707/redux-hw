import { useFormik } from 'formik';
import { useState } from 'react';

export default function Todo2() {
    const [data, setData] = useState<{name: string; age: string}[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const {handleSubmit, values: {name, age}, handleChange, setValues, resetForm} = useFormik({
        initialValues: {
            name: '',
            age: ''
        },
        onSubmit: (submittedValue) => {
            if (editIndex !== null) {
                setData(prev => {
                    const newData = [...prev];
                    newData[editIndex] = submittedValue;
                    return newData;
                });
                setEditIndex(null);
            } else {
                setData(prev => [...prev, submittedValue]);
            }
            resetForm();
        },
    });

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setValues(data[index]);
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h1 className="text-xl font-semibold text-gray-800">
                    {editIndex !== null ? 'Edit User' : 'Add New User'}
                </h1>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                        <input 
                            value={name} 
                            onChange={handleChange} 
                            name="name" 
                            type="text" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-gray-800"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    
                    <div className="w-full sm:w-28">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                        <input 
                            value={age} 
                            onChange={handleChange} 
                            name="age" 
                            type="number" 
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-gray-800"
                            placeholder="Age"
                            required
                        />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <button 
                            type="submit" 
                            className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl transition-colors h-[46px] shadow-sm shadow-blue-600/20"
                        >
                            {editIndex !== null ? 'Save' : 'Add'}
                        </button>
                        {editIndex !== null && (
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditIndex(null);
                                    resetForm();
                                }}
                                className="flex-1 sm:flex-none px-5 py-2.5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors h-[46px]"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {data.length > 0 && (
                <div className="border-t border-gray-100 bg-gray-50/30">
                    <ul className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                        {data.map((item, index) => (
                            <li key={index} className="flex items-center justify-between px-6 py-4 hover:bg-white transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        {item.name.charAt(0).toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Age: {item.age}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleEdit(index)}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 active:bg-blue-100"
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

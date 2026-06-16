import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../reducer/TodoSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import AddModal from './AddModal'
import EditModal from './EditModal'

export default function Todo() {
    const dispatch = useDispatch<AppDispatch>()
    const { data } = useSelector((store: RootState) => store.todo)

    const [isAddOpen, setIsAddOpen] = useState(false)
    const [editTodo, setEditTodo] = useState<{ id: number; name: string; description: string } | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    const filteredData = data?.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex h-10 w-full max-w-md rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"/>
                    <button onClick={() => setIsAddOpen(true)} className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                        + Add New Task
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map((e) => (
                        <div key={e.id} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                            {e.images && e.images.length > 0 ? (
                                <div className="h-48 w-full overflow-hidden rounded-t-xl border-b border-slate-200">
                                    <img
                                        src={`https://to-dos-api.softclub.tj/images/${e.images[0].imageName}`}
                                        alt={e.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        onError={(img) => {
                                            img.currentTarget.src = "https://placehold.co/600x400?text=No+Image"
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="flex h-48 w-full items-center justify-center rounded-t-xl border-b border-slate-200 bg-slate-100">
                                    <span className="text-slate-400">No Image</span>
                                </div>
                            )}

                            <div className="flex flex-col flex-1 p-5">
                                <h3 className="text-lg font-semibold tracking-tight text-slate-900">{e.name}</h3>
                                <p className="mt-2 text-sm text-slate-500 line-clamp-3">{e.description}</p>

                                <div className="mt-auto pt-6 flex items-center gap-3">
                                    <button onClick={() => setEditTodo({ id: e.id, name: e.name, description: e.description })} className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 hover:text-slate-900">
                                        Edit
                                    </button>
                                    <button onClick={() => dispatch(deleteData(e.id))} className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <EditModal isOpen={!!editTodo} onClose={() => setEditTodo(null)} todo={editTodo} />
        </div>
    )
}
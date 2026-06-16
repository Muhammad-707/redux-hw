import { deleteDataAtom, getLoadableAtom, addDataAtom, editDataAtom } from '@/reducer/TodoAtom'
import { useAtom, useSetAtom } from 'jotai'
import React, { useState } from 'react'

export default function Todo() {
    const [value] = useAtom(getLoadableAtom)
    const deleteData = useSetAtom(deleteDataAtom)
    const addData = useSetAtom(addDataAtom)
    const editData = useSetAtom(editDataAtom)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const [editId, setEditId] = useState<number | null>(null)
    const [editName, setEditName] = useState('')
    const [editDescription, setEditDescription] = useState('')

    const handleAdd = () => {
        if (!name.trim() || !description.trim()) return
        addData({ name, description, image })
        setName('')
        setDescription('')
        setImage(null)
    }

    const handleOpenEdit = (todo: any) => {
        setEditId(todo.id)
        setEditName(todo.name)
        setEditDescription(todo.description)
    }

    const handleSaveEdit = () => {
        if (!editName.trim() || !editDescription.trim() || editId === null) return
        editData({ id: editId, name: editName, description: editDescription })
        setEditId(null)
    }

    if (value.state === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <h1 className="text-lg font-medium text-slate-600 animate-pulse">Загрузка данных...</h1>
                </div>
            </div>
        )
    }

    if (value.state === "hasError") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
                <div className="bg-white border border-red-100 rounded-2xl p-6 max-w-md w-full text-center shadow-xl shadow-red-50">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">!</div>
                    <h1 className="text-lg font-bold text-slate-800 mb-2">Ошибка загрузки</h1>
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono break-all text-left">
                        {String(value.error)}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">

                <div className="w-full md:w-2/5 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:sticky md:top-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-5 tracking-tight">Новая задача</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 p-3 rounded-xl text-slate-800 outline-none transition-all placeholder:text-slate-400 text-sm"
                            type="text"
                            placeholder="Название задачи"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 p-3 rounded-xl text-slate-800 outline-none transition-all placeholder:text-slate-400 text-sm"
                            type="text"
                            placeholder="Описание деталей"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-500 px-1">Изображение</label>
                            <input
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                        </div>
                        <button 
                            onClick={handleAdd}
                            className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm shadow-blue-200 hover:shadow-none transition-all active:scale-[0.98]"
                        >
                            Добавить задачу
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-3/5 flex flex-col gap-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Список задач</h2>
                        <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            {value.data?.length || 0}
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        {value.data?.map((e: any) => (
                            <div className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all gap-6" key={e.id}>
                                <div className="flex flex-col gap-1 min-w-0">
                                    <h1 className="text-base font-semibold text-slate-800 truncate">{e.name}</h1>
                                    <p className="text-sm text-slate-500 line-clamp-2 break-words leading-relaxed">{e.description}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => deleteData(e.id)}
                                        className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                    >
                                        Удалить
                                    </button>
                                    <button 
                                        onClick={() => handleOpenEdit(e)}
                                        className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                                    >
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {editId !== null && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Редактировать задачу</h3>
                        <div className="flex flex-col gap-4">
                            <input
                                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 p-3 rounded-xl text-slate-800 outline-none transition-all text-sm"
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                            <input
                                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 p-3 rounded-xl text-slate-800 outline-none transition-all text-sm"
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => setEditId(null)}
                                    className="flex-1 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-sm transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="flex-1 p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
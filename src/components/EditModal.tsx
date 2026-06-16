import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { editData } from '../reducer/TodoSlice'
import type { AppDispatch } from '../store/store'

interface EditModalProps {
    isOpen: boolean
    onClose: () => void
    todo: { id: number; name: string; description: string } | null
}

export default function EditModal({ isOpen, onClose, todo }: EditModalProps) {
    const dispatch = useDispatch<AppDispatch>()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values, { resetForm }) => {
            if (todo) {
                dispatch(editData({ id: todo.id, name: values.name, description: values.description }))
                resetForm()
                onClose()
            }
        }
    })

    useEffect(() => {
        if (todo) {
            formik.setValues({
                name: todo.name,
                description: todo.description
            })
        }
    }, [todo])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Edit ToDo</h2>
                    <button onClick={onClose} className="rounded-md p-1 hover:bg-slate-100 text-slate-500">
                        ✕
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-slate-700">Name</label>
                        <input name="name" value={formik.values.name} onChange={formik.handleChange} className="flex h-10 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-xs text-red-500">{formik.errors.name as string}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <input name="description" value={formik.values.description} onChange={formik.handleChange} className="flex h-10 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
                        {formik.touched.description && formik.errors.description && (
                            <span className="text-xs text-red-500">{formik.errors.description as string}</span>
                        )}
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="h-10 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-100">
                            Cancel
                        </button>
                        <button type="submit" className="h-10 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900/90">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
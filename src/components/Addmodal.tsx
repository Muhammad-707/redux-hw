import React, { useState } from 'react'
import { useAtom } from 'jotai'
import { addItemDataAtom } from '../store/todoAtoms'

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddModal({ isOpen, onClose }: AddModalProps) {
  const [, addItem] = useAtom(addItemDataAtom) 
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addItem({ name, job }) 
    setName('')
    setJob('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required
            className="w-full border border-gray-200 p-2.5 rounded-xl outline-none"
          />
          <input 
            type="text" 
            placeholder="Job" 
            value={job} 
            onChange={e => setJob(e.target.value)} 
            required
            className="w-full border border-gray-200 p-2.5 rounded-xl outline-none"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-xl">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
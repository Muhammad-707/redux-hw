import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { updateItemDataAtom } from '../store/todoAtoms'

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  user: { id: number; name: string; job: string } | null
}

export default function EditModal({ isOpen, onClose, user }: EditModalProps) {
  const [, updateItem] = useAtom(updateItemDataAtom) 
  const [name, setName] = useState('')
  const [job, setJob] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name)
      setJob(user.job)
    }
  }, [user])

  if (!isOpen || !user) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateItem({ id: user.id, name, job }) 
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit User</h3>
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
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-xl">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}
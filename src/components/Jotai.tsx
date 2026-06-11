import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { dataAtom, deleteItemDataAtom } from '../store/todoAtoms'
import AddModal from './Addmodal'
import EditModal from './Editmodal'

export default function Jotai() {
  const [data] = useAtom(dataAtom)
  const [, deleteItemData] = useAtom(deleteItemDataAtom)
  
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const [selectedUser, setSelectedUser] = useState<any>(null)
    
  const handleDelete = (id: number) => {
    deleteItemData(id)
  }

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsAddOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium shadow-sm hover:bg-blue-600 transition-colors">
        Add New User
      </button>
      <div className="space-y-4 mt-4">
        {data.map((e) => {
          return (
            <div key={e.id} className="border w-[250px] py-4 px-6 rounded-2xl shadow-sm bg-white">
              <h2 className="text-lg font-semibold text-gray-800">{e.name}</h2>
              <p className="text-gray-500 text-sm mb-3">{e.job}</p>
              <div className='flex items-center'>
                <button 
                  onClick={() => handleDelete(e.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 text-sm hover:bg-red-600 transition-colors">
                  Delete
                </button>
                <button 
                  onClick={() => {
                    setSelectedUser(e) 
                    setIsEditOpen(true) 
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} user={selectedUser} />
    </div>
  )
}
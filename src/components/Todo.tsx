import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { setInput, addUser, deleteUser, updateUser, clearForm } from '../reducers/todoSlice';

const Modal = ({ isOpen, title, onClose, children }: { isOpen: boolean, title: string, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-3xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Todo = () => {
  const dispatch = useDispatch();
  const { data, name, age, email, img, currentId } = useSelector((state: RootState) => state.todos);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    dispatch(clearForm());
    setIsAddModalOpen(true);
  };

  const openEditModal = (user: any) => {
    dispatch(setInput({ key: 'currentId', value: user.id }));
    dispatch(setInput({ key: 'name', value: user.name }));
    dispatch(setInput({ key: 'age', value: String(user.age) }));
    dispatch(setInput({ key: 'email', value: user.email }));
    dispatch(setInput({ key: 'img', value: user.img }));
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id: number) => {
    dispatch(setInput({ key: 'currentId', value: id }));
    setIsDeleteModalOpen(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addUser()); 
    setIsAddModalOpen(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser()); 
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    if (currentId) {
      dispatch(deleteUser(currentId));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2ab1e3] to-[#9b51e0] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 shadow-lg">
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 text-gray-800 placeholder-gray-500 px-5 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all shadow-inner"
            />
          </div>
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-[#6f56e5] hover:bg-[#5b45c2] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            + Add New User
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((user) => (
            <div key={user.id} className="bg-white rounded-3xl p-4 shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col">
              <div className="h-48 w-full mb-4 overflow-hidden rounded-2xl bg-gray-100">
                <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{user.name}</h2>
                <p className="text-gray-500 text-sm mb-1">Age: <span className="font-medium text-gray-700">{user.age}</span></p>
                <p className="text-gray-500 text-sm mb-5 flex-grow truncate">Email: {user.email}</p>
                
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => openEditModal(user)}
                    className="flex-1 bg-[#fff4de] text-[#d4972c] hover:bg-[#fce6bd] py-2 rounded-xl font-medium transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(user.id)}
                    className="flex-1 bg-[#ffe5e5] text-[#d34545] hover:bg-[#fcd6d6] py-2 rounded-xl font-medium transition-colors"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isAddModalOpen} title="Create User" onClose={() => setIsAddModalOpen(false)}>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => dispatch(setInput({ key: 'name', value: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => dispatch(setInput({ key: 'age', value: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setInput({ key: 'email', value: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Image URL (ссылка на картинку)"
            value={img}
            onChange={(e) => dispatch(setInput({ key: 'img', value: e.target.value }))}
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#6f56e5] text-white hover:bg-[#5b45c2]">Create</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} title="Edit User" onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => dispatch(setInput({ key: 'name', value: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => dispatch(setInput({ key: 'age', value: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setInput({ key: 'email', value: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => dispatch(setInput({ key: 'img', value: e.target.value }))}
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none transition-all"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#eab308] text-white hover:bg-[#ca9a04]">Update</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} title="Delete User" onClose={() => setIsDeleteModalOpen(false)}>
        <p className="text-gray-600 mb-8 text-lg">Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={handleDelete} className="px-6 py-2.5 rounded-xl bg-[#ef4444] text-white hover:bg-[#dc2626]">Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
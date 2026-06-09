import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../reducers/todoSlice';

const IMAGE_BASE_URL = 'https://to-dos-api.softclub.tj/images/';

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
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.todos);

  const [searchQuery, setSearchQuery] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentId, setCurrentId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const filteredData = data.filter((todo: any) =>
    todo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setName('');
    setDescription('');
    setFile(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (todo: any) => {
    setCurrentId(todo.id);
    setName(todo.name);
    setDescription(todo.description);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (id: number) => {
    setCurrentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    if (file) formData.append('Images', file);

    await dispatch(addTodo(formData));
    setIsAddModalOpen(false);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentId) {
      await dispatch(updateTodo({ id: currentId, name, description }));
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = async () => {
    if (currentId) {
      await dispatch(deleteTodo(currentId));
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
            + Add New Task
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((todo: any) => {
              const imageSrc = todo.images && todo.images.length > 0
                ? `${IMAGE_BASE_URL}${todo.images[0].imageName}`
                : 'https://images.unsplash.com/photo-1506784951206-3337f4f61f71?q=80&w=400&auto=format&fit=crop';

              return (
                <div key={todo.id} className="bg-white rounded-3xl p-4 shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                  <div className="h-48 w-full mb-4 overflow-hidden rounded-2xl bg-gray-100">
                    <img src={imageSrc} alt={todo.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">{todo.name}</h2>
                    <p className="text-gray-500 text-sm mb-5 flex-grow line-clamp-3">{todo.description}</p>
                    <div className="flex gap-3 mt-auto">
                      <button
                        onClick={() => openEditModal(todo)}
                        className="flex-1 bg-[#fff4de] text-[#d4972c] hover:bg-[#fce6bd] py-2 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(todo.id)}
                        className="flex-1 bg-[#ffe5e5] text-[#d34545] hover:bg-[#fcd6d6] py-2 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} title="Create Task" onClose={() => setIsAddModalOpen(false)}>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#9b51e0] focus:outline-none transition-all"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#9b51e0] focus:outline-none h-32 resize-none transition-all"
          />
          <div className="relative">
             <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              required
              className="w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#f0ebf8] file:text-[#7d3fbc] hover:file:bg-[#e4d9f4] cursor-pointer"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl font-medium bg-[#6f56e5] text-white hover:bg-[#5b45c2] transition-colors shadow-md">Create</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} title="Edit Task" onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#eab308] focus:outline-none transition-all"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#eab308] focus:outline-none h-32 resize-none transition-all"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2.5 rounded-xl font-medium bg-[#eab308] text-white hover:bg-[#ca9a04] transition-colors shadow-md">Update</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} title="Delete Task" onClose={() => setIsDeleteModalOpen(false)}>
        <p className="text-gray-600 mb-8 text-lg">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={handleDelete} className="px-6 py-2.5 rounded-xl font-medium bg-[#ef4444] text-white hover:bg-[#dc2626] transition-colors shadow-md">Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
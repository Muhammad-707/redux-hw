import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { getTodos, addTodo, deleteTodo } from '../reducers/todoSlice';

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.todos);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    if (file) {
      formData.append('Images', file);
    }

    dispatch(addTodo(formData));
        setName('');
    setDescription('');
    setFile(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>My ToDos</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          required 
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Добавить ToDo</button>
      </form>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.map((todo: any) => (
            <li key={todo.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <strong>{todo.name}</strong>
              <p style={{ margin: '5px 0' }}>{todo.description}</p>
              <button 
                onClick={() => dispatch(deleteTodo(todo.id))} 
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
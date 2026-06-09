import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppDispatch } from '../store/store';

const API = 'https://to-dos-api.softclub.tj/api/to-dos';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTodos: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setTodos } = todoSlice.actions;
export default todoSlice.reducer;

export const getTodos = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(API);
    dispatch(setTodos(data.data || []));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addTodo = (formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    await axios.post(API, formData);
    dispatch(getTodos());
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = (id: number) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API}?id=${id}`);
    dispatch(getTodos());
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = (user: { id: number; name: string; description: string }) => async (dispatch: AppDispatch) => {
  try {
    await axios.put(API, user);
    dispatch(getTodos());
  } catch (error) {
    console.error(error);
  }
};
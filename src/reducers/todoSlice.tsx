import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://to-dos-api.softclub.tj/api/to-dos';

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  try {
    const response = await axios.get(API);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const addTodo = createAsyncThunk('todos/addTodo', async (formData: FormData, { dispatch }) => {
  try {
    await axios.post(API, formData);
    dispatch(getTodos()); 
  } catch (error) {
    console.error(error);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number, { dispatch }) => {
  try {
    await axios.delete(`${API}?id=${id}`);
    dispatch(getTodos()); 
  } catch (error) {
    console.error(error);
  }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (data: { id: number, name: string, description: string }, { dispatch }) => {
  try {
    await axios.put(API, data);
    dispatch(getTodos());
  } catch (error) {
    console.error(error);
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;
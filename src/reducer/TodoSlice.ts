import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const api = "https://to-dos-api.softclub.tj/api/to-dos"

export interface IImage {
  id: number
  imageName: string
}

export interface IData {
  id: number
  name: string
  description: string
  images: IImage[]
}

export interface TodoState {
  data: IData[]
  isLoading: boolean
  isError: boolean
}

const initialState: TodoState = {
  data: [],
  isLoading: false,
  isError: false
}

export const getData = createAsyncThunk("todos/getData", async () => {
    try {
        const { data } = await axios.get(api)
        return data.data
    } catch (error) {
        throw error
    }
})

export const deleteData = createAsyncThunk("todos/deleteData", async (id: number, { dispatch }) => {
    try {
        const { data } = await axios.delete(`${api}?id=${id}`)
        dispatch(getData())
        return data.errors
    } catch (error) {
        throw error
    }
})

export const addData = createAsyncThunk("todos/addData", async (formData: FormData, { dispatch }) => {
    try {
        await axios.post(api, formData)
        dispatch(getData())
    } catch (error) {
        throw error
    }
})

export const editData = createAsyncThunk("todos/editData", async (data: { id: number, name: string, description: string }, { dispatch }) => {
    try {
        await axios.put(api, data)
        dispatch(getData())
    } catch (error) {
        throw error
    }
})

export const TodoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    builder.addCase(getData.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isError = false
        state.data = payload
    })
    builder.addCase(getData.rejected, (state) => {
        state.isLoading = false
        state.isError = true
    })
    builder.addCase(deleteData.fulfilled, (state) => {
        state.isError = false
    })
  }
})

export default TodoSlice.reducer
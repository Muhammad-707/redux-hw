import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
  age: number;
  email: string;
  img: string;
}

interface UserState {
  data: IUser[];
  name: string;
  age: string;
  email: string;
  img: string;
  currentId: number | null;
}

const initialState: UserState = {
  data: [
    { id: 1, name: "Sadi", age: 20, email: "sadi@bot.com", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150" },
    { id: 2, name: "Alice", age: 25, email: "alice@mail.com", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
    { id: 3, name: "Bob", age: 30, email: "bob@mail.com", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150" },
    { id: 4, name: "Charlie", age: 22, email: "charlie@mail.com", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
    { id: 5, name: "Emma", age: 28, email: "emma@mail.com", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" }
  ],
  name: '',
  age: '',
  email: '',
  img: '',
  currentId: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setInput: (state: any, { payload }) => {
      state[payload.key] = payload.value;
    },

    addUser: (state) => {
      const newUser: IUser = {
        id: Date.now(), 
        name: state.name,
        age: Number(state.age) || 0,
        email: state.email,
        img: state.img || 'https://images.unsplash.com/photo-1506784951206-3337f4f61f71?q=80&w=150',
      };
      state.data.push(newUser);
      
      state.name = '';
      state.age = '';
      state.email = '';
      state.img = '';
    },

    deleteUser: (state, { payload }) => {
      state.data = state.data.filter((user) => user.id !== payload);
    },

    updateUser: (state) => {
      const user = state.data.find((u) => u.id === state.currentId);
      if (user) {
        user.name = state.name;
        user.age = Number(state.age) || 0;
        user.email = state.email;
        if (state.img) user.img = state.img;
      }
      
      state.name = '';
      state.age = '';
      state.email = '';
      state.img = '';
      state.currentId = null;
    },

    clearForm: (state) => {
      state.name = '';
      state.age = '';
      state.email = '';
      state.img = '';
      state.currentId = null;
    }
  },
});

export const { setInput, addUser, deleteUser, updateUser, clearForm } = userSlice.actions;
export default userSlice.reducer;
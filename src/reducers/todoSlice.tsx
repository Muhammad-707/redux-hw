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
    { id: 1, name: "Sadi", age: 20, email: "sadi@bot.com", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" },
    { id: 2, name: "Alice", age: 25, email: "alice@mail.com", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
    { id: 3, name: "Bob", age: 30, email: "bob@mail.com", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" },
    { id: 4, name: "Charlie", age: 22, email: "charlie@mail.com", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { id: 5, name: "Emma", age: 28, email: "emma@mail.com", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" }
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
    state.data.push({
    id: Date.now(),
    name: state.name,
    age: Number(state.age) || 0, 
    email: state.email,
    img: state.img.trim() !== '' ? state.img : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    });
    state.name = '';
    state.age = '';
    state.email = '';
    state.img = '';
  },

  deleteUser: (state, { payload }) => {
    state.data = state.data.filter((user) => user.id !== payload);
    },

   updateUser: (state) => {
   state.data = state.data.map((user) => {
    if (user.id === state.currentId) {
      return {
        id: user.id,
        name: state.name,
        age: Number(state.age) || 0,
        email: state.email,
        img: state.img.trim() !== '' ? state.img : user.img,
      };
    }
    return user; 
   });
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
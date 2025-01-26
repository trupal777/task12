import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    bookmarked: [],
    page: 1
  },
  reducers: {
    setUsers: (state, action) => {
      const newUserMap = new Map(state.users.map(user => [user.id, user])); 
      action.payload.forEach(user => {
        newUserMap.set(user.id, user); 
      });
      state.users = Array.from(newUserMap.values()); 
    },

    nextPage: (state) => {
      state.page += 1; 
    },
    bookmarkUser: (state, action) => {
      if (!state.bookmarked.some(u => u.id === action.payload.id)) {
        state.bookmarked.push(action.payload);
      }
    },
    unbookmarkUser: (state, action) => {
      state.bookmarked = state.bookmarked.filter(u => u.id !== action.payload.id);
    }
  },
});

export const { setUsers, nextPage, bookmarkUser, unbookmarkUser } = userSlice.actions;
export default userSlice.reducer;

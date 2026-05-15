// src/features/taskSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [
    {
      title: "FINALS PROJECT",
      desc: "Mobile App",
      time: "10:00am",
      completed: true,
    },
    {
      title: "FINALS ACTIVITY",
      desc: "API App",
      time: "11:59 pm",
      completed: false,
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter(
        (_, index) => index !== action.payload
      );
    },

    toggleComplete: (state, action) => {
      state.taskList[action.payload].completed =
        !state.taskList[action.payload].completed;
    },

    editTask: (state, action) => {
      const { index, title } = action.payload;

      state.taskList[index].title = title;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
} = taskSlice.actions;

export default taskSlice.reducer;
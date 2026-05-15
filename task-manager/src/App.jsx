// src/App.jsx

import { useState } from "react";

import { Pencil, Trash2, Check } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
} from "./features/taskSlice";

export default function App() {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const dispatch = useDispatch();

  const tasks = useSelector(
    (state) => state.tasks.taskList
  );

  const handleAddTask = () => {
    if (!taskName.trim() || !taskDesc.trim()) return;

    const newTask = {
      title: taskName,
      desc: taskDesc,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      completed: false,
    };

    dispatch(addTask(newTask));

    setTaskName("");
    setTaskDesc("");
  };

  return (
    <div className="min-h-screen bg-[#7A4327] flex justify-center p-5 overflow-hidden">
      <div className="w-full max-w-6xl relative">
        {/* TITLE */}
        <h1 className="text-center text-6xl font-black text-white mt-2">
          Task <span className="text-[#C89470]">Manager</span>
        </h1>

        {/* FORM */}
        <div className="bg-[#C89470] rounded-3xl p-5 mt-6 shadow-lg">
          {/* TASK NAME */}
          <div className="mb-3">
            <h2 className="text-3xl font-bold text-[#2F170C] mb-2">
              Task Name
            </h2>

            <input
              type="text"
              placeholder="Enter task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full h-12 rounded-full px-5 outline-none bg-white text-lg"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-[#2F170C] mb-2">
              Description
            </h2>

            <input
              type="text"
              placeholder="Enter task description..."
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              className="w-full h-12 rounded-full px-5 outline-none bg-white text-lg"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddTask}
            className="w-full h-11 rounded-full bg-[#C8640C] text-white text-2xl font-bold hover:scale-[1.01] transition"
          >
            Add Task
          </button>
        </div>

        {/* TASK BOARD */}
        <div className="relative mt-8 flex">
          <div className="bg-[#C89470] rounded-3xl p-5 w-[700px] z-10">
            <h2 className="text-4xl font-black text-black mb-5">
              Task Board
            </h2>

            <div className="flex flex-col gap-5">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`rounded-full px-5 py-4 flex items-center justify-between ${
                    task.completed
                      ? "bg-[#8A3F00] text-black"
                      : "bg-[#D9BEA1] text-black"
                  }`}
                >
                  {/* LEFT */}
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() =>
                        dispatch(toggleComplete(index))
                      }
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        task.completed
                          ? "bg-[#D9BEA1]"
                          : "bg-white"
                      }`}
                    >
                      {task.completed && (
                        <Check
                          size={18}
                          className="text-white"
                        />
                      )}
                    </button>

                    <div>
                      <h3 className="text-2xl font-bold">
                        {task.title}
                      </h3>

                      <p className="text-lg">
                        {task.desc}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-8">
                    <div className="text-xl font-medium">
                      <p>Draft by</p>
                      <p>{task.time}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          const newTitle = prompt(
                            "Edit task title:",
                            task.title
                          );

                          if (!newTitle) return;

                          dispatch(
                            editTask({
                              index,
                              title: newTitle,
                            })
                          );
                        }}
                        className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
                      >
                        <Pencil size={20} />
                      </button>

                      <button
                        onClick={() =>
                          dispatch(deleteTask(index))
                        }
                        className="w-11 h-11 rounded-full bg-white flex items-center justify-center"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <img
            src="/capi.png"
            alt="capi"
            className="absolute right-0 bottom-[-70px] w-[350px]"
          />
        </div>
      </div>
    </div>
  );
}
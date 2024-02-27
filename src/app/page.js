"use client";
import React, { useState } from "react";
import Image from "next/image";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import FilterDropDown from "@/components/FilterDropDown";

export default function Home() {

  const [showTaskForm, setShowTaskForm] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", description: "Description 1", status: "To Do" },
    { id: 2, title: "Task 2", description: "Description 2", status: "To Do" },
    { id: 3, title: "Task 3", description: "Description 3", status: "To Do" },
    { id: 4, title: "Task 4", description: "Description 4", status: "To Do" },
    { id: 5, title: "Task 5", description: "Description 5", status: "To Do" },
    { id: 6, title: "Task 6", description: "Description 6", status: "To Do" },
    { id: 7, title: "Task 7", description: "Description 7", status: "To Do" },
    { id: 8, title: "Task 8", description: "Description 8", status: "To Do" },
    { id: 9, title: "Task 9", description: "Description 9", status: "To Do" },
    { id: 10, title: "Task 10", description: "Description 10", status: "To Do" },
    { id: 11, title: "Task 11", description: "Description 11", status: "To Do" },
    { id: 12, title: "Task 12", description: "Description 12", status: "To Do" },
    { id: 13, title: "Task 13", description: "Description 13", status: "To Do" },
    { id: 14, title: "Task 14", description: "Description 14", status: "To Do" },
    { id: 15, title: "Task 15", description: "Description 15", status: "To Do" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');

  const addTask = (newTask) => {
    newTask.id = Date.now();
    newTask.status = 'To Do';
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const updateStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: 'In Progress' } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filterTasks = (status) => {
    setFilter(status);
    if (!status) {
      setFilteredTasks([]);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Task Manager - &nbsp;
          <code className="font-mono font-bold">Version 1.0</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://my-portfolio-3fbn.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* By {" "} */}
            <Image
              src="/logo.png"
              alt="My Logo"
              className="dark:invert"
              width={75}
              height={25}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center">

          <div className="flex flex-col left-10 space-y-4">

          {showTaskForm ? (
            <TaskForm addTask={addTask} />
          ) : (
            <>
              <FilterDropDown
                statuses={['To Do', 'In Progress', 'Done']}
                filterTasks={filterTasks}
              />
              <TaskList
                tasks={filter ? filteredTasks : tasks}
                updateStatus={updateStatus}
                deleteTask={deleteTask}
              />
            </>
          )}

          <button
            onClick={toggleTaskForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {showTaskForm ? 'Show task list' : 'Add a new task'}
          </button>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://github.com/mailsg"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            GitHub{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find my projects on GitHub.
          </p>
        </a>

        <a
          href="https://my-portfolio-3fbn.onrender.com/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Portfolio{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Checkout my portfolio!
          </p>
        </a>

        <a
          href="https://www.linkedin.com/in/sandeep0912/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            LinkedIn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Connect with me on LinkedIn.
          </p>
        </a>

        <a
          href="https://wellfound.com/u/sandeep0912"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Wellfound{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            My Wellfound profile.
          </p>
        </a>
      </div>
    </main>
  );
};

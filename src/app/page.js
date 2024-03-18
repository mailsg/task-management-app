"use client";
import React, { useState } from "react";
import StoreProvider from "./StoreProvider";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {

  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <StoreProvider>
      <main className="min-h-screen flex flex-col justify-between p-4 lg:p-24">
        <div className="max-w-5xl mx-auto w-full">
          <p className="mb-8 text-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:text-left lg:pt-0 lg:border-none lg:bg-none">
            Task Manager - <code className="font-bold">Version 1.0</code>
          </p>
          <div className="flex flex-col items-center">
            {showTaskForm ? <TaskForm /> : <TaskList />}
            <button
              onClick={toggleTaskForm}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {showTaskForm ? 'Show task list' : 'Add a new task'}
            </button>
          </div>
        </div> 
        
        <div className="mt-8 lg:max-w-5xl ml-1 lg:ml-20 relative">
          <footer className="" style= {{position: "absolute", bottom: "0", width: "100%", top: "6rem"}}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <a
                href="https://github.com/mailsg"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl font-semibold text-center">GitHub</h2>
                <p className="text-sm text-center opacity-50">Find my projects on GitHub.</p>
              </a>
              <a
                href="https://my-portfolio-3fbn.onrender.com/"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl font-semibold text-center">Portfolio</h2>
                <p className="text-sm text-center opacity-50">Checkout my portfolio!</p>
              </a>
              <a
                href="https://www.linkedin.com/in/sandeep0912/"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl font-semibold text-center">LinkedIn</h2>
                <p className="text-sm text-center opacity-50">Connect on LinkedIn.</p>
              </a>
              <a
                href="https://wellfound.com/u/sandeep0912"
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-2xl font-semibold text-center">Wellfound</h2>
                <p className="text-sm text-center opacity-50">My Wellfound profile.</p>
              </a>
            </div>
            </footer>
        </div>
      </main>
  </StoreProvider>
  );
};

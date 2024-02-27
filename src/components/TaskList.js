"use client";
import React, { useState } from "react";

const TaskList = ({ tasks, updateStatus, deleteTask }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
            </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {currentTasks.map((task) => (
            <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => updateStatus(task.id)} className="mr-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Update
                </button>
                <button onClick={() => deleteTask(task.id)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        <nav className="flex justify-center mt-4">
            <ul className="flex">
            {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className="page-item">
                <button
                    onClick={() => paginate(i + 1)}
                    className={`${
                    currentPage === i + 1 ? "bg-blue-500" : ""
                    } text-black hover:bg-blue-400 px-4 py-2 border rounded-full mr-2`}
                >
                    {i + 1}
                </button>
                </li>
            ))}
            </ul>
      </nav>
    </div>
  );
};

export default TaskList;

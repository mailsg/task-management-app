"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '@/redux/tasks/slice/tasksSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch  = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        dispatch(addTask({ title, description, status: 'To Do', Date: new Date() }));
        toast.success('Task added successfully');
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-transparent rounded-lg shadow-md p-6 -mt-15">
            <ToastContainer position="top-center" />
            <div className="mb-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    maxLength={18}
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    maxLength={128}
                    required
                ></textarea>
            </div>

            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;

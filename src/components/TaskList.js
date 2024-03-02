"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTask, deleteTask } from "@/redux/tasks/slice/tasksSlice";
import FilterDropDown from "./FilterDropDown";

const TaskList = () => {

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading);

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [forceRender, setForceRender] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [ dispatch, forceRender]);

  useEffect(() => {
    // if (selectedStatus) {
    //     const filtered = tasks.filter(task => task.status === selectedStatus);
    //     setFilteredTasks(filtered);
    // } else {
        setFilteredTasks(tasks);
    // }
}, [tasks]);

  const handleStatusChange = (event, taskId) => {
    setSelectedStatus({ ...selectedStatus, [taskId]: event.target.value });
    setSelectedTaskId(taskId);
  };

  const handleSaveStatus = () => {
    if (selectedTaskId && selectedStatus[selectedTaskId]) {
      dispatch(updateTask({ taskId: selectedTaskId, updatedTask: { status: selectedStatus[selectedTaskId] } }))
      .then(() => {
        setSelectedStatus({ ...selectedStatus, [selectedTaskId]: null });
        setSelectedTaskId(null);        
      })
      .then(() => setForceRender(prev => !prev));      
    }
  };  

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ taskId }));
  };

  const handleFilterChange = (status) => {
    // setSelectedStatus(status);
    setSelectedStatus(status);
        if (status) {
            const filtered = tasks.filter(task => task.status === status);
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks(tasks);
        }
  }

  return (
    <div>
        <FilterDropDown onFilterChange={handleFilterChange} statuses={['To Do', 'In Progress', 'Done']}/>
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
            {filteredTasks.slice(indexOfFirstTask, indexOfLastTask).map((task) => (
              
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">

                {/* <div className="flex items-center space-x-2"> */}
                  <select
                    value={selectedStatus[task._id] || task.status}
                    onChange={(e) => handleStatusChange(e, task._id)}
                    className="p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={handleSaveStatus}
                    disabled={!selectedStatus[task._id]}
                    className={`${
                      !selectedStatus[task._id] ? 'opacity-50 cursor-not-allowed' : ''
                    } inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Save
                  </button>

                <button 
                  onClick={() => handleDeleteTask(task._id)} 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete
                </button>
                {/* </div> */}
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

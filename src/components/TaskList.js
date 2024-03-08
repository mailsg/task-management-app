"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask } from "@/redux/tasks/slice/tasksSlice";
import Modal from "./Modal";
import FilterDropDown from "./FilterDropDown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskDesc, setSelectedTaskDesc] = useState("");

  const openModal = (description) => {
    setSelectedTaskDesc(description);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const tasksPerPage = 4;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
    setCurrentPage(1);
  }, [tasks]);

  const handleStatusChange = (event, taskId) => {
    const status = event.target.value;
    setSelectedStatus({ ...selectedStatus, [taskId]: status });
  };

  const handleSaveStatus = (taskId) => {
    const taskToUpdate = filteredTasks.find((task) => task._id === taskId);
    if (!taskToUpdate || !selectedStatus[taskId]) return;
    dispatch(updateTask({ taskId, updatedTask: { status: selectedStatus[taskId] } })).then(() => {
      setSelectedStatus((prevStatus) => ({ ...prevStatus, [taskId]: null }));
      toast.success('Task updated successfully');
      dispatch(fetchTasks());
    });
  };

//   const handleSaveStatus = (taskId) => {
//     const taskToUpdate = filteredTasks.find((task) => task._id === taskId);
//     if (!taskToUpdate || !selectedStatus[taskId]) return;

//     // Dispatch updateTask action
//     dispatch(updateTask({ taskId, updatedTask: { status: selectedStatus[taskId] } }))
//         .then(() => {
//             // Reset selected status
//             setSelectedStatus((prevStatus) => {
//                 const updatedStatus = { ...prevStatus };
//                 delete updatedStatus[taskId]; // Remove taskId key
//                 return updatedStatus;
//             });

//             // Dispatch fetchTasks action if needed
//             dispatch(fetchTasks());
//         })
//         .catch((error) => {
//             console.error("Error updating task:", error);
//             // Handle error if necessary
//         });
// };


  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ taskId }));
    toast.success('Task deleted successfully');
  };

  const handleFilterChange = (status) => {

    setSelectedStatus(status);

    if (status === 'All'){

      setFilteredTasks(tasks);

    } else {
    
      const filtered = status ? tasks.filter((task) => task.status === status) : tasks;    
      setFilteredTasks(filtered);

    }
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <ToastContainer position="top-center" />
      <FilterDropDown onFilterChange={handleFilterChange} statuses={["All", "To Do", "In Progress", "Done"]} />
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.slice(indexOfFirstTask, indexOfLastTask).map((task) => (
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => openModal(task.description)}>
                  {task.description && task.description.length > 15 ? 
                    `${task.description.substring(0, 15)} >>>` : task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={selectedStatus[task._id] || task.status}
                    onChange={(e) => handleStatusChange(e, task._id)}
                    className="p-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleSaveStatus(task._id)}
                    disabled={!selectedStatus[task._id]}
                    className={`${
                      !selectedStatus[task._id] ? "opacity-50 cursor-not-allowed" : ""
                    } inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 0 && (
        <nav className="flex justify-center mt-4">
          <ul className="flex">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="page-item">
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className={`${currentPage === i + 1 ? "bg-blue-500" : ""} text-black hover:bg-blue-400 px-4 py-2 border rounded-full mr-2`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {isModalOpen && <Modal taskDesc={selectedTaskDesc} onClose={closeModal} />}
    </div>
  );  
};

export default TaskList;

import React from "react";

const TaskList = ({ tasks, updateStatus, deleteTask }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <span>{task.title}</span>
                    <span>{task.description}</span>
                    <span>Status: {task.status}</span>
                    <button onClick={() => updateStatus(task.id)}>Update status</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
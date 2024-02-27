import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()) return;
        addTask({ title, description });
        setTitle('');
        setDescription('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea 
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button type='submit'>Add task</button>

        </form>
    );
};

export default TaskForm;
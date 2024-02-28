const { ObjectId } = require('mongodb');
const { GetTaskCollection } = require('../config/DatabaseConnect');

const GetAllTasks = async () => {
    const collection = GetTaskCollection();
    return collection.find({}).toArray(); 
}

const GetTasksById = async (taskId) => {
    try {
        const collection = GetTaskCollection();
        const task = await collection.findOne({ _id: new ObjectId(taskId) });
        return task;
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        throw error;
    }
}

const AddTask = async (task) => {
    const collection = GetTaskCollection();
    return collection.insertOne(task);
}

const UpdateTask = async (taskId, updatedTask) => {
    const collection = GetTaskCollection();
    return collection.updateOne({ _id: new ObjectId(taskId) }, { $set: updatedTask });
}

const DeleteTask = async (taskId) => {
    const collection = GetTaskCollection();
    return collection.deleteOne({ _id: new ObjectId(taskId) });
}

module.exports = {
    GetAllTasks,
    GetTasksById,
    AddTask,
    UpdateTask,
    DeleteTask
};

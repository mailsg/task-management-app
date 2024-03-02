import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://task-management-app-vs1x.onrender.com';

// Function to GET the tasks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, thunkAPI) => {        
        try {
            const response = await axios.get(`${URL}/api/tasks/`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong..!!');
        }
    }
);

// Function to GET a task WRT to Id (payload)
export const fetchTask = createAsyncThunk(
    'task/fetchTask',
    async ({ taskId }, thunkAPI) => {
        try {
            const response = await axios.get(`${URL}/api/tasks/${taskId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong, could not get the task');
        }
    }
)

// Function to POST a task
export const addTask = createAsyncThunk(
    'tasks/addTasks',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(
                `${URL}/api/tasks/`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Adding task failed, something went wrong..!!');
        }
    }
);

// Function to UPDATE the status of a task 
export const updateTask = createAsyncThunk(
    'task/updateTask',
    async ({ taskId, updatedTask }, thunkAPI) => {
        try {
            const response = await axios.put(`${URL}/api/tasks/${taskId}`, updatedTask);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Updating the task failed, something went wrong..!!');
        }
    }
);


// Function to DELETE a task WRT to Id (payload)
export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async ({ taskId }, thunkAPI) => {
        try {
        const response = await axios.delete(`${URL}/api/tasks/${taskId}`);
        return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Deleting the task failed, something went wrong..!!');
        }
    }
);

const initialState = {
    tasks : [],
    task : '',
    isLoading: false,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(fetchTask.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.task = action.payload;
        })
        .addCase(fetchTask.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(addTask.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks.push(action.payload);
        })
        .addCase(addTask.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(updateTask.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }
                return task;
            });
        })
        .addCase(updateTask.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteTask.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
        })
        .addCase(deleteTask.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default tasksSlice.reducer;

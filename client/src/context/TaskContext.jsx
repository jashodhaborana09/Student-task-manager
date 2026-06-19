import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '../services/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    status: 'all',
    sort: 'newest'
  });

  const fetchTasks = async (appliedFilters = filters) => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks(appliedFilters);
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetchTasks();
  }
}, [filters]);

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      setTasks([response.data.task, ...tasks]);
      toast.success('Task created successfully');
      return response.data.task;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.updateTask(id, taskData);
      setTasks(tasks.map(t => t._id === id ? response.data.task : t));
      toast.success('Task updated successfully');
      return response.data.task;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const response = await taskService.toggleTaskCompletion(id);
      setTasks(tasks.map(t => t._id === id ? response.data.task : t));
      toast.success(response.data.message);
      return response.data.task;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  const applyFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const value = {
    tasks,
    loading,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    applyFilters
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

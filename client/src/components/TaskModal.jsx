import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useTask } from '../context/TaskContext';
import toast from 'react-hot-toast';

const TaskModal = ({ isOpen, onClose, editingTask }) => {
  const { createTask, updateTask } = useTask();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    category: 'Personal'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || '',
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
        priority: editingTask.priority,
        category: editingTask.category
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        category: 'Personal'
      });
    }
  }, [editingTask, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    try {
      setLoading(true);
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="card w-full max-w-md animate-fadeInUp">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-xl font-bold">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Task Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-24"
              placeholder="Enter task description"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold mb-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Assignment">Assignment</option>
              <option value="Exam">Exam</option>
              <option value="Project">Project</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

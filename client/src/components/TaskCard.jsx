import React from 'react';
import { FiTrash2, FiEdit, FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi';
import { useTask } from '../context/TaskContext';

const TaskCard = ({ task, onEdit }) => {
  const { toggleTaskCompletion, deleteTask } = useTask();
  
  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300',
      'Medium': 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
      'Low': 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300'
    };
    return colors[priority] || colors['Medium'];
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Assignment': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      'Exam': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      'Project': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      'Personal': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
    };
    return colors[category] || colors['Personal'];
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleToggle = async () => {
    await toggleTaskCompletion(task._id);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  return (
    <div className={`card p-4 ${task.completed ? 'opacity-75' : ''} animate-fadeInUp`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className="mt-1 text-2xl transition hover:scale-110"
        >
          {task.completed ? (
            <FiCheckCircle className="text-green-500" />
          ) : (
            <FiCircle className="text-gray-400 dark:text-dark-500" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-lg ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`badge ${getPriorityColor(task.priority)} text-xs`}>
              {task.priority} Priority
            </span>
            <span className={`badge ${getCategoryColor(task.category)} text-xs`}>
              {task.category}
            </span>
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-sm mt-2 ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
              <FiClock size={14} />
              <span>{formatDate(task.dueDate)}</span>
              {isOverdue && <span className="text-xs font-semibold ml-1">OVERDUE</span>}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 rounded-lg transition"
            title="Edit task"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg transition"
            title="Delete task"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

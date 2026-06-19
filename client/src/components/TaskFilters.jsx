import React from 'react';
import { FiFilter, FiDownload, FiUpload } from 'react-icons/fi';
import { useTask } from '../context/TaskContext';
import Papa from 'papaparse';

const TaskFilters = ({ onAddTask }) => {
  const { filters, applyFilters, tasks } = useTask();

  const handleFilterChange = (filterName, value) => {
    applyFilters({ [filterName]: value });
  };

  const exportToCSV = () => {
    if (tasks.length === 0) {
      alert('No tasks to export');
      return;
    }

    const csv = Papa.unparse(tasks.map(task => ({
      Title: task.title,
      Description: task.description,
      'Due Date': task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
      Priority: task.priority,
      Category: task.category,
      Status: task.completed ? 'Completed' : 'Pending'
    })));

    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('Import preview:', results.data);
        alert('CSV import preview logged to console. Implement full import logic as needed.');
      },
      error: (error) => {
        alert('Error parsing CSV: ' + error.message);
      }
    });

    e.target.value = '';
  };

  return (
    <div className="card p-4 mb-6 animate-slideInRight">
      <div className="flex flex-col md:flex-row gap-4 items-center flex-wrap">
        {/* Filter Icon and Label */}
        <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
          <FiFilter size={20} />
          <span>Filters:</span>
        </div>

        {/* Priority Filter */}
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Categories</option>
          <option value="Assignment">Assignment</option>
          <option value="Exam">Exam</option>
          <option value="Project">Project</option>
          <option value="Personal">Personal</option>
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-dark-600 dark:bg-dark-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="newest">Newest</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Export Button */}
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition text-sm font-medium"
        >
          <FiDownload size={18} />
          Export
        </button>

        {/* Import Button */}
        <label className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition text-sm font-medium cursor-pointer">
          <FiUpload size={18} />
          <input
            type="file"
            accept=".csv"
            onChange={handleImportCSV}
            className="hidden"
          />
          Import
        </label>

        {/* Add Task Button */}
        <button
          onClick={onAddTask}
          className="btn-primary text-sm"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;

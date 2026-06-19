import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiClipboard, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import DashboardCard from '../components/DashboardCard';
import ProgressCircle from '../components/ProgressCircle';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { useTask } from '../context/TaskContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { tasks, loading } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const overdueCount = tasks.filter(t => {
    if (t.completed) return false;
    return t.dueDate && new Date(t.dueDate) < new Date();
  }).length;

  const recentTasks = tasks.slice(0, 5);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card p-8 bg-gradient-to-r from-primary-500 to-primary-700 text-white animate-fadeInUp">
        <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-primary-100">Here's a summary of your tasks and productivity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          icon={FiClipboard}
          title="Total Tasks"
          value={tasks.length}
          color="primary"
        />
        <DashboardCard
          icon={FiCheckCircle}
          
          title="Completed"
          value={completedCount}
          color="success"
        />
        <DashboardCard
          icon={FiClipboard}
          title="Pending"
          value={pendingCount}
          color="warning"
        />
        <DashboardCard
          icon={FiAlertCircle}
          title="Overdue"
          value={overdueCount}
          color="danger"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress and Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Progress Circle */}
          <div className="card p-6 animate-slideInRight">
            <h2 className="text-lg font-bold mb-6 text-center">Completion Progress</h2>
            <ProgressCircle completed={completedCount} total={tasks.length} />
          </div>

          {/* Quick Stats */}
          <div className="card p-6 animate-slideInRight">
            <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                <span className="font-semibold">{tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">High Priority</span>
                <span className="font-semibold">{tasks.filter(t => t.priority === 'High').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">This Week</span>
                <span className="font-semibold">{tasks.filter(t => {
                  if (!t.dueDate) return false;
                  const today = new Date();
                  const dueDate = new Date(t.dueDate);
                  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                  return dueDate >= today && dueDate <= weekFromNow;
                }).length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent Tasks</h2>
            <button
              onClick={handleAddTask}
              className="btn-primary text-sm"
            >
              + Add Task
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : recentTasks.length > 0 ? (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No tasks yet"
              description="Create your first task to get started"
            />
          )}
        </div>
      </div>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;

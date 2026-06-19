import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import TaskModal from '../components/TaskModal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useTask } from '../context/TaskContext';

const Tasks = () => {
  const { tasks, loading } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white animate-fadeInUp">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-primary-100 mt-1">Manage and organize all your tasks</p>
      </div>

      {/* Filters */}
      <TaskFilters onAddTask={handleAddTask} />

      {/* Tasks List */}
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No tasks found"
            description="Try adjusting your filters or create a new task"
          />
        )}
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

export default Tasks;

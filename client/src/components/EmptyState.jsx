import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ title = 'No tasks yet', description = 'Create your first task to get started' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="p-4 rounded-full bg-gray-100 dark:bg-dark-700 mb-4">
        <FiInbox size={48} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default EmptyState;

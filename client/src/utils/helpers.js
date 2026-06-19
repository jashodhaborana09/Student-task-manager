/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format time to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted time
 */
export const formatTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Check if date is overdue
 * @param {Date|string} date - Date to check
 * @returns {boolean} - Is date in past
 */
export const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Get days until date
 * @param {Date|string} date - Target date
 * @returns {number} - Days remaining
 */
export const daysUntil = (date) => {
  if (!date) return 0;
  const today = new Date();
  const target = new Date(date);
  const time = target - today;
  return Math.ceil(time / (1000 * 60 * 60 * 24));
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Max length
 * @returns {string} - Truncated string
 */
export const truncateString = (str, length = 50) => {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
};

/**
 * Get priority color class
 * @param {string} priority - Priority level
 * @returns {string} - Tailwind class
 */
export const getPriorityClass = (priority) => {
  const classes = {
    'High': 'text-red-600 dark:text-red-400',
    'Medium': 'text-yellow-600 dark:text-yellow-400',
    'Low': 'text-green-600 dark:text-green-400'
  };
  return classes[priority] || 'text-gray-600';
};

/**
 * Get category color class
 * @param {string} category - Category name
 * @returns {string} - Tailwind class
 */
export const getCategoryClass = (category) => {
  const classes = {
    'Assignment': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    'Exam': 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    'Project': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    'Personal': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
  };
  return classes[category] || 'bg-gray-100 text-gray-700';
};

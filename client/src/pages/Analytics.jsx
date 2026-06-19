import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTask } from '../context/TaskContext';
import DashboardCard from '../components/DashboardCard';
import { FiTrendingUp, FiPercent, FiPieChart } from 'react-icons/fi';

const Analytics = () => {
  const { tasks } = useTask();

  // Calculate metrics
  const completedCount = tasks.filter(t => t.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Priority distribution
  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length }
  ];

  // Category distribution
  const categoryData = [
    { name: 'Assignment', value: tasks.filter(t => t.category === 'Assignment').length },
    { name: 'Exam', value: tasks.filter(t => t.category === 'Exam').length },
    { name: 'Project', value: tasks.filter(t => t.category === 'Project').length },
    { name: 'Personal', value: tasks.filter(t => t.category === 'Personal').length }
  ];

  // Weekly productivity (mock data based on creation dates)
  const weeklyData = [
    { day: 'Mon', tasks: 4, completed: 2 },
    { day: 'Tue', tasks: 6, completed: 4 },
    { day: 'Wed', tasks: 5, completed: 3 },
    { day: 'Thu', tasks: 7, completed: 5 },
    { day: 'Fri', tasks: 8, completed: 6 },
    { day: 'Sat', tasks: 3, completed: 2 },
    { day: 'Sun', tasks: 2, completed: 1 }
  ];

  const COLORS_PRIORITY = ['#ef4444', '#f59e0b', '#10b981'];
  const COLORS_CATEGORY = ['#3b82f6', '#ef4444', '#8b5cf6', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white animate-fadeInUp">
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <p className="text-primary-100 mt-1">Track your productivity and task metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          icon={FiPercent}
          title="Completion Rate"
          value={`${completionRate}%`}
          color="success"
        />
        <DashboardCard
          icon={FiTrendingUp}
          title="Total Tasks"
          value={tasks.length}
          color="primary"
        />
        <DashboardCard
          icon={FiPieChart}
          title="Completed"
          value={completedCount}
          color="success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Productivity Chart */}
        <div className="card p-6 animate-fadeInUp">
          <h2 className="text-lg font-bold mb-4">Weekly Productivity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#5865f2"
                strokeWidth={2}
                name="Completed"
              />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#9ca3af"
                strokeWidth={2}
                name="Total Tasks"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="card p-6 animate-fadeInUp">
          <h2 className="text-lg font-bold mb-4">Priority Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_PRIORITY[index % COLORS_PRIORITY.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="card p-6 animate-fadeInUp">
          <h2 className="text-lg font-bold mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#5865f2" name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Overview */}
        <div className="card p-6 animate-fadeInUp">
          <h2 className="text-lg font-bold mb-4">Task Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Completed', value: completedCount },
                  { name: 'Pending', value: tasks.length - completedCount }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#10b981" />
                <Cell fill="#f59e0b" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {priorityData.map((item) => (
          <div key={item.name} className="card p-4 animate-fadeInUp">
            <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.name} Priority</h3>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-gray-500 mt-1">{Math.round((item.value / tasks.length || 0) * 100)}% of tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

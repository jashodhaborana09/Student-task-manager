import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  try {
    const { priority, category, status, sort } = req.query;
    
    let filter = { userId: req.userId };
    
    // Apply filters
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (status === 'completed') {
      filter.completed = true;
    } else if (status === 'pending') {
      filter.completed = false;
    }

    let query = Task.find(filter);

    // Apply sorting
    if (sort === 'dueDate') {
      query = query.sort({ dueDate: 1 });
    } else if (sort === 'priority') {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      query = query.sort({ priority: 1 });
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    }

    const tasks = await query.exec();
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Task title is required' });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority: priority || 'Medium',
      category: category || 'Personal',
      userId: req.userId
    });

    res.status(201).json({ success: true, message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category, completed } = req.body;

    let task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;
    if (category) task.category = category;
    if (typeof completed !== 'undefined') task.completed = completed;

    task = await task.save();
    res.status(200).json({ success: true, message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.completed = !task.completed;
    task = await task.save();

    res.status(200).json({ success: true, message: 'Task status updated', task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

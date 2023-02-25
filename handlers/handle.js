const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const taskPath = path.resolve(__dirname, '..', 'db', 'tasks.json');

const getAll = async () => {
  try {
    const rawData = await fs.readFile(taskPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error.message);
  }
};
const getById = async (id) => {
  try {
    const tasksList = await getAll();
    return tasksList.find(task=>String(task.id)===String(id))
  } catch (error) {
    console.log(error.message);
  }
};

const createTask = async (title, completed) => {
  try {
    const id = crypto.randomUUID();
    const tasksList = await getAll();
    const newTask = { id, title, completed };
    tasksList.push(newTask);
    await fs.writeFile(taskPath, JSON.stringify(tasksList, null, 4))
    return newTask;
  } catch (error) {
    console.log(error.message);
  }
};

const removeTask = async (id) => {
  try {
    const tasksList = await getAll();
   const newTaskList= tasksList.filter(task=> String(task.id) !== String(id))
    await fs.writeFile(taskPath, JSON.stringify(newTaskList, null, 4))

  } catch (error) {
    console.log(error.message);
  }
};



module.exports = { getAll, getById, createTask, removeTask};

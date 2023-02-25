const { program } = require('commander');
const { getAll,getById, createTask, removeTask } = require('./handlers/handle.js');

program
  .name('MyCLI')
  .description('A simple CLI to manage your tasks')
  .version('1.0.0');
program
  .option('--method <method>', 'Action to perform')
  .option('--title <title>', 'Task title')
  .option('--completed <completed>', 'Task completion status')
  .option('--id <id>', 'Task id')
program.parse(process.argv);
const { method, title, completed,id } = program.opts();
console.log(method, title, completed);

(async () => {
  if (method === 'list') {
    const result = await getAll();
    console.log(result);
  }

  if (method === 'get') {
    const result = await getById(id);
    console.log(result);
  }
  if (method === 'create') {
    const result = await createTask(title, completed);
    console.log(result);
  }
  if (method === 'update') {
  }

  if (method === 'remove') {
    await removeTask(id);
  }
})();

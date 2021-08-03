const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function that load events
const loadEventListeners = () => {
  // load tasks from LS
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task
  form.addEventListener('submit', addTask);
  //remove task
  taskList.addEventListener('click', removeTask);
  // clear task
  clearBtn.addEventListener('click', clearTasks);
  // filter Task
  filter.addEventListener('keyup', filterTasks);
};
//get tasks from local storage
const getTasks = () => {
  let tasks;
  localStorage.getItem('tasks') === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')));
  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
};
//add task
const addTask = e => {
  if (taskInput.value === '') {
    alert('Please add a value');
    return;
  }
  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create a link element
  const link = document.createElement('a');
  //add class
  link.className = 'delete-item secondary-content red-text darken-2';
  // add icon (HTML)
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  //store to LS
  storeInLS(taskInput.value);
  // clear input
  taskInput.value = '';
  e.preventDefault();
};
// store in local storage  function
const storeInLS = task => {
  let tasks;
  localStorage.getItem('tasks') === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')));
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// remove Task
const removeTask = e => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('You Sure ?')) {
      // remove from UI
      e.target.parentElement.parentElement.remove();
      // remove from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
};
// remove from LS  function
const removeTaskFromLS = taskitem => {
  let tasks;
  localStorage.getItem('tasks') === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem('tasks')));
  tasks.forEach((task, index) => {
    if (taskitem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// clear tasks
const clearTasks = () => {
  // clear from UI
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // CLear from LS
  clearFromLS();
};
// clear from local storage function
const clearFromLS = () => {
  localStorage.clear();
};
// filter tasks
const filterTasks = e => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    item.toLowerCase().indexOf(text) !== -1
      ? (task.style.display = 'block')
      : (task.style.display = 'none');
  });
};
loadEventListeners();

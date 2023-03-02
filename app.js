// define variables
const form     = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter   = document.querySelector('#filter');
const taskInput   = document.querySelector('#task');

loadEventListener();

function loadEventListener(){
  // DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);
  // add new task event
  form.addEventListener('submit', addTask);

  // Remove task  event
  taskList.addEventListener('click', removeTask);

  // Clear all task  event 
  clearBtn.addEventListener('click', clearTask);

  // filter tasks event 
  filter.addEventListener('keyup', filterTasks);
}

// getTasks from localStorage
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
     // create li Element
     const li = document.createElement('li');
     // add class 
     li.className = 'collection-item';
     // create text node 
     li.appendChild(document.createTextNode(task))
 
     // create new link Element
     const link = document.createElement('a');
     // add class 
     link.className = 'delete-item secondary-content';
     // add innerHTML
     link.innerHTML = '<i class="fa fa-remove"></i>';
     // Append the link to the li 
     li.appendChild(link);
     // Append li to the ul 
     taskList.appendChild(li);
  });
}

// add new task 
function addTask(e){
  if (taskInput.value === '') {
    alert('Add a task');
  }else {

    // create li Element
    const li = document.createElement('li');
    // add class 
    li.className = 'collection-item';
    // create text node 
    li.appendChild(document.createTextNode(taskInput.value))

    // create new link Element
    const link = document.createElement('a');
    // add class 
    link.className = 'delete-item secondary-content';
    // add innerHTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li 
    li.appendChild(link);
    // Append li to the ul 
    taskList.appendChild(li);

    // store in localStorage 
    storeTaskInLocalStorage(taskInput.value);

    // clear text input 
    taskInput.value = '';
    e.preventDefault();
  }
}

// store task 
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove single task 
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove()

      // remove form localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all task 
function clearTask(e) {
  // taskList.innerHTML = '';
  if (confirm('Are you sure')) {
    // faster 
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // clear task from localStorage
  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
  localStorage.clear();
}

// filter task event 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}




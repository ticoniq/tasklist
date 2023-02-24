// define variables
const form     = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter   = document.querySelector('#filter');
const taskInput   = document.querySelector('#task');

loadEventListener();

function loadEventListener(){
  // add new task event
  form.addEventListener('submit', addTask);

  // Remove task  event
  taskList.addEventListener('click', removeTask);

  // Clear all task  event 
  clearBtn.addEventListener('click', clearTask);

  // filter tasks event 
  filter.addEventListener('keyup', filterTasks);
}

// add new task 
function addTask(e){
  if (taskInput.value === '') {
    alert('Add a task');
  }else {

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value))

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);

    taskInput.value = '';
    e.preventDefault();
  }
}

// remove single task 
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove()
    }
  }
}

// Clear all task 
function clearTask(e) {
  // taskList.innerHTML = '';
  if (confirm('Are you sure')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
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

function solveMeFirst(a, b){
  return a + b;
}

let a = 30;
let b = 10;

let sum = solveMeFirst(a,b);

console.log(sum);

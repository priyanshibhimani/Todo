
let selectedColor = '#f5f5dc'; 
let t=document.querySelector('.task');
// Color picker selection
document.querySelectorAll('.color').forEach(colorPicker => {
    colorPicker.addEventListener('click', function() {
        selectedColor = this.getAttribute('data-color');
        document.querySelectorAll('.color').forEach(c => c.style.border = '2px solid transparent');
        this.style.border = '2px solid black';
    });
});

document.getElementById('add-list-btn').addEventListener('click', () => {
    const newList = createList('New List', selectedColor);
    document.querySelector('.lists-container').appendChild(newList);
});

function createList(title, color) {
    const listElement = document.createElement('div');
    listElement.classList.add('list');
    listElement.style.backgroundColor = color;
    
    const listTitle = document.createElement('h3');
    listTitle.contentEditable = true;
    listTitle.textContent = title;
    listElement.appendChild(listTitle);

    const taskList = document.createElement('ul');
    listElement.appendChild(taskList);

    const addTaskButton = document.createElement('div');
    addTaskButton.textContent = '+ Add Task';
    addTaskButton.classList.add('add-task-btn');
    listElement.appendChild(addTaskButton);

    const taskInput = document.createElement('input');
    taskInput.classList.add('add-task-input');
    taskInput.placeholder = 'Enter task';
    listElement.appendChild(taskInput);

    addTaskButton.addEventListener('click', function () {
        taskInput.classList.toggle('active');
        taskInput.focus();
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            const taskItem = createTask(taskInput.value.trim());
            taskList.appendChild(taskItem);
            taskInput.value = '';
            taskInput.classList.remove('active');
        }
    });

    const deleteListBtn = document.createElement('button');
    deleteListBtn.classList.add('delete-list');
    deleteListBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
    deleteListBtn.addEventListener('click', () => {
        listElement.remove();
    });
    listElement.appendChild(deleteListBtn);

    return listElement;
}

function createTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    taskItem.appendChild(checkbox);

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.contentEditable = true;
    taskItem.appendChild(taskContent);

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            taskContent.style.textDecoration = 'line-through';
            taskContent.style.color = '#888'; 
        } else {
            taskContent.style.textDecoration = 'none';
            taskContent.style.color = '#000'; 
        }
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.classList.add('delete-task');

    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
    });
    taskItem.appendChild(deleteBtn);
    
    return taskItem;
}

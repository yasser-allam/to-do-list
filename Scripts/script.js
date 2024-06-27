document.getElementById('taskForm').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskAssignee = document.getElementById('taskAssignee').value;

    const task = {
        name: taskName,
        date: new Date(taskDate),
        assignee: taskAssignee,
        status: 'pending'
    };

    addTaskToDOM(task);
    document.getElementById('taskForm').reset();
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.classList.add(task.status);

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    taskInfo.innerHTML = `
        <strong>${task.name}</strong>
        <span>Due: ${task.date.toLocaleString()}</span>
        <span>Assigned to: ${task.assignee}</span>
    `;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = 'Complete';
    completeBtn.addEventListener('click', () => {
        taskItem.classList.remove('pending');
        taskItem.classList.add('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    taskItem.appendChild(taskInfo);
    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);

    checkPastDue(taskItem, task.date);
}

function checkPastDue(taskItem, taskDate) {
    const now = new Date();
    if (taskDate < now) {
        taskItem.classList.remove('pending');
        taskItem.classList.add('past-due');
    }
}
// checks the tasks list every 1 min to see if a task is now past due
setInterval(() => {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        const taskDateString = task.querySelector('.task-info span:nth-child(2)').textContent.split(': ')[1];
        // console.log(taskDateString);
        const taskDate = new Date(taskDateString);
        checkPastDue(task, taskDate);
    });
}, 60000);

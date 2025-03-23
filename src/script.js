const taskInput = document.getElementById("taskInput");
const taskContainer = document.getElementById("tasks-section");

// Add task list
function addTask() {
    if (taskInput.value === '') {
        alert('Type a little something here.');
    } else {
        let task = document.createElement('li');
        task.classList.add("task-container", "relative", "select-none", "cursor-pointer");

        let taskText = document.createElement("h2");
        taskText.classList.add("w-full", "text-2xl", "font-light", "ml-6", "overflow-x-auto");

        taskText.innerHTML = taskInput.value;
        task.appendChild(taskText);
        taskContainer.appendChild(task);

        taskInput.value = "";
        saveData();
    }
}

// Toggles checked class
taskContainer.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (li) {
        li.classList.toggle("checked");
        saveData();
    }
});

// Deletes list when swiped to right
taskContainer.addEventListener('mousedown', handleSwipeStart);
taskContainer.addEventListener('touchstart', handleSwipeStart);

let startX = 0;
let currentItem = null;

function handleSwipeStart(e) {
    currentItem = e.target.closest('li');
    if (!currentItem) return;

    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;

    document.addEventListener('mousemove', handleSwipeMove);
    document.addEventListener('touchmove', handleSwipeMove);
    document.addEventListener('mouseup', handleSwipeEnd);
    document.addEventListener('touchend', handleSwipeEnd);
}

function handleSwipeMove(e) {
    if (!currentItem) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const deltaX = x - startX;

    if (deltaX > 0) {
        currentItem.style.transform = `translateX(${deltaX}px)`;
        currentItem.style.backgroundColor = '#ff6b5c';
        currentItem.style.color = '#fff';
        currentItem.classList.add('swiping');
    }
}

function handleSwipeEnd(e) {
    if (!currentItem) return;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = endX - startX;

    if (deltaX > 180) {
        currentItem.remove();
        saveData();
    } else {
        currentItem.style.backgroundColor = '';
        currentItem.style.color = '';
        currentItem.classList.remove('swiping');
        currentItem.style.transform = `translateX(0)`;
    }

    document.removeEventListener('mousemove', handleSwipeMove);
    document.removeEventListener('touchmove', handleSwipeMove);
    document.removeEventListener('mouseup', handleSwipeEnd);
    document.removeEventListener('touchend', handleSwipeEnd);

    currentItem = null;
}

//Save Data to Local Storage
function saveData() {
    localStorage.setItem('data', taskContainer.innerHTML);
}

function showTask() {
    taskContainer.innerHTML = localStorage.getItem('data') || '';
}

showTask();
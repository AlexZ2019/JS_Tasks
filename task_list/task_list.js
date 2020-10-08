function createTaskList(selector) {
    const CLASS_TASK_LIST = "task-list";
    const CLASS_ADD_TASK_BUTTON = "add-task-button";
    const CLASS_ENTER_TASK = "enter-task";
    const CLASS_DELETE_TASK_BUTTON = "delete-task-button";
    const CLASS_CLEAR_LIST_BUTTON = "clear-list-button";
    const CLASS_EMPTY_LIST = "empty-list";
    const DELETE_TASK = 0;
    const ADD_TASK = 1;
    const TIMEOUT_FOR_NOTIFICATION = 2000;

    let tasks = [];
    const messagesForNotification = [
        "The task has been deleted",
        "The task has been added"
    ];
    let containerForTaskList = document.querySelector(selector);
    let uniqId = createIdForTask();

    function addListElement(tagName, className = null, innerText = null) {
        let newElement = document.createElement(tagName);
        const BUTTON_TEG_NAME = "BUTTON";
        newElement.className = className;
        if (newElement.tagName === BUTTON_TEG_NAME) {
            newElement.innerText = innerText;
        }
        containerForTaskList.appendChild(newElement);
    }

    function init() {
        addListElement("div", CLASS_TASK_LIST);
        addListElement("input", CLASS_ENTER_TASK);
        addListElement("button", CLASS_ADD_TASK_BUTTON, "Add task");
        addListElement("button", CLASS_CLEAR_LIST_BUTTON, "Clear list");
    }
    function initItemList(id, task) {
        let taskItem = document.createElement("div");
        taskItem.textContent = task;
        taskItem.classList.add("list-item");
        taskItem.setAttribute("data-id", id);
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add(CLASS_DELETE_TASK_BUTTON);
        taskItem.appendChild(deleteBtn);

        return taskItem;
    }
    function renderTasks() {
        taskList.innerText = "";
        if (!tasks.length) {
            containerForTaskList.insertAdjacentHTML("afterbegin", "<div class='empty-list'>list is empty</div>");
        } else {
            if (containerForTaskList.children[0].className === CLASS_EMPTY_LIST) {
                containerForTaskList.children[0].remove();
            }
            for (let i = 0; i < tasks.length; i++) {
                taskList.appendChild(initItemList(tasks[i].id, tasks[i].task));
            }
        }
    }
    function createIdForTask() {
        let id = 1;
        return function () {
            return id++;
        }
    }
    function ShowPopUpNotification(status) {
        let notification = document.createElement("div");
        notification.innerText = status ? messagesForNotification[ADD_TASK] : messagesForNotification[DELETE_TASK];
        containerForTaskList.prepend(notification);
        setTimeout(() => {
            containerForTaskList.removeChild(notification);
        }, TIMEOUT_FOR_NOTIFICATION);
    }
    function addTask() {
        if (input.value.length) {
            tasks.push({id: uniqId(), task: input.value});
            input.value = "";
            renderTasks();
            ShowPopUpNotification(ADD_TASK);
        }
    }
    function deleteTask(e) {
        if (e.target.className === CLASS_DELETE_TASK_BUTTON) {
            let parent = e.target.parentElement;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === Number(parent.getAttribute("data-id"))) {
                    tasks.splice(i, 1);
                }
            }
            ShowPopUpNotification(DELETE_TASK);
            renderTasks();
        }
    }
    function clearList() {
        if (tasks.length) {
            tasks = [];
            renderTasks();
        }
    }
    init();
    let clearListBtn = containerForTaskList.querySelector("." + CLASS_CLEAR_LIST_BUTTON);
    let taskList = containerForTaskList.querySelector("." + CLASS_TASK_LIST);
    let input = containerForTaskList.querySelector("." + CLASS_ENTER_TASK);
    let addTaskBtn = containerForTaskList.querySelector("." + CLASS_ADD_TASK_BUTTON);

    renderTasks();
    addTaskBtn.addEventListener("click", addTask);
    clearListBtn.addEventListener("click", clearList);
    taskList.addEventListener("click", deleteTask);
}

createTaskList(".task-list-wrapper");
createTaskList(".task-list-wrapper1");
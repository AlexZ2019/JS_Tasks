function createTaskList(selector) {
    const CLASS_TASK_LIST = "task-list";
    const CLASS_ADD_TASK_BUTTON = "add-task-button";
    const CLASS_ENTER_TASK = "enter-task";
    const CLASS_DELETE_TASK_BUTTON = "delete-task-button";
    const CLASS_CLEAR_LIST_BUTTON = "clear-list-button";
    const CLASS_EMPTY_LIST = "empty-list";
    const TIMEOUT_FOR_NOTIFICATION = 2000;

    let tasks = [];
    let containerForTaskList = document.querySelector(selector);

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

    init();
    let clearListBtn = containerForTaskList.querySelector(".clear-list-button");
    let taskList = containerForTaskList.querySelector(".task-list");
    let input = containerForTaskList.querySelector(".enter-task");
    let addTaskBtn = containerForTaskList.querySelector(".add-task-button");

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

    renderTasks();
    function createIdForTask() {
        let id = 1;
        return function () {
            return id++;
        }
    }
    let uniqId = createIdForTask();

    addTaskBtn.addEventListener("click", () => {
        if (input.value.length) {
            tasks.push({id: uniqId(), task: input.value});
            input.value = "";
            renderTasks();
            ShowPopUpNotification(true);
        }
    })

    clearListBtn.addEventListener("click", () => {
        if (tasks.length) {
            tasks = [];
            renderTasks();
        }
    })

    function deleteTask(e) {
        if (e.target.className === CLASS_DELETE_TASK_BUTTON) {
            let parent = e.target.parentElement;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === Number(parent.getAttribute("data-id"))) {
                    tasks.splice(i, 1);
                }
            }
            ShowPopUpNotification(false);
            renderTasks();
        }
    }

    taskList.addEventListener("click", (e) => deleteTask(e));

    function ShowPopUpNotification(status) {
        let notification = document.createElement("div");
        notification.innerText = status ? "task was added" : "task was deleted";
        containerForTaskList.prepend(notification);
        setTimeout(() => {
            containerForTaskList.removeChild(notification);
        }, TIMEOUT_FOR_NOTIFICATION);
    }
}

createTaskList(".task-list-wrapper");
createTaskList(".task-list-wrapper1");
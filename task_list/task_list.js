function createTaskList(selector) {
    const CLASS_TASK_LIST = "task-list";
    const CLASS_ADD_TASK_BUTTON = "add-task-button";
    const CLASS_ENTER_TASK = "enter-task";
    const CLASS_DELETE_TASK_BUTTON = "delete-task-button";
    const CLASS_CLEAR_LIST_BUTTON = "clear-list-button";
    const CLASS_EMPTY_LIST = "empty-list";
    const CLASS_TASK_COMPLETE = "task-complete";
    const DELETE_TASK = 0;
    const ADD_TASK = 1;
    const TIMEOUT_FOR_NOTIFICATION = 2000;

    let tasks = [];
    let messagesForNotification = [
        "The task has been deleted",
        "The task has been added"
    ];
    let id = 0;
    let containerForTaskList = document.querySelector(selector);

    function init() {
        function addListElement(tagName, className = null, innerText = null) {
            let newElement = document.createElement(tagName);
            const BUTTON_TEG_NAME = "BUTTON";
            newElement.className = className;
            if (newElement.tagName === BUTTON_TEG_NAME) {
                newElement.innerText = innerText;
            }
            containerForTaskList.appendChild(newElement);
        }

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
        let taskCompleteCheckbox = document.createElement("input");
        taskCompleteCheckbox.type = "checkbox";
        taskCompleteCheckbox.className = CLASS_TASK_COMPLETE;
        taskItem.prepend(taskCompleteCheckbox);
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

    function displayPopUpNotification(status) {
        let notification = document.createElement("div");
        notification.innerText = status ? messagesForNotification[ADD_TASK] : messagesForNotification[DELETE_TASK];
        containerForTaskList.prepend(notification);
        setTimeout(() => {
            containerForTaskList.removeChild(notification);
        }, TIMEOUT_FOR_NOTIFICATION);
    }

    function addTask() {
        if (input.value.length) {
            id++;
            tasks.push({id, task: input.value});
            input.value = "";
            renderTasks();
            displayPopUpNotification(ADD_TASK);
        }
    }

    function deleteTask(e) {
        if (e.target.className === CLASS_DELETE_TASK_BUTTON) {
            let parent = e.target.parentElement;
            let taskId = Number(parent.getAttribute("data-id"))
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].id === taskId) {
                    tasks.splice(i, 1);
                    break;
                }
            }
            displayPopUpNotification(DELETE_TASK);
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
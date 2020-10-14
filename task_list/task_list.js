function createTaskList(selector) {
    const CLASS_TASK_LIST = "task-list";
    const CLASS_ADD_TASK_BUTTON = "add-task-button";
    const CLASS_ENTER_TASK = "enter-task";
    const CLASS_DELETE_TASK_BUTTON = "delete-task-button";
    const CLASS_CLEAR_LIST_BUTTON = "clear-list-button";
    const CLASS_EMPTY_LIST = "empty-list";
    const CLASS_TASK_COMPLETE = "task-complete";
    const CLASS_NOTIFICATION = "task-complete";
    const TIMEOUT_FOR_HIDING_NOTIFICATION = 2000;

    let tasks = [];
    let messagesForNotification = {
       DELETE_TASK: "The task has been deleted",
       ADD_TASK: "The task has been added"
    };
    let taskId = 0;
    let containerForTaskList = document.querySelector(selector);

    function init() {
        function _addListElement(tagName, className = null, innerText = null) {
            let newElement = document.createElement(tagName);
            const BUTTON_TEG_NAME = "BUTTON";
            newElement.className = className;
            if (newElement.tagName === BUTTON_TEG_NAME) {
                newElement.innerText = innerText;
            }
            containerForTaskList.appendChild(newElement);
        }

        _addListElement("div", CLASS_NOTIFICATION);
        _addListElement("div", CLASS_TASK_LIST);
        _addListElement("input", CLASS_ENTER_TASK);
        _addListElement("button", CLASS_ADD_TASK_BUTTON, "Add task");
        _addListElement("button", CLASS_CLEAR_LIST_BUTTON, "Clear list");

        containerForTaskList.querySelector("." + CLASS_NOTIFICATION).style = "height: 20px"; // temporary
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
        deleteBtn.addEventListener("click", deleteTask);
        taskItem.appendChild(deleteBtn);

        return taskItem;
    }

    function renderTasks() {
        taskList.innerText = "";
        if (tasks.length) {
            if (containerForTaskList.querySelector("." + CLASS_EMPTY_LIST)) {
                containerForTaskList.querySelector("." + CLASS_EMPTY_LIST).remove();
            }
            for (let i = 0; i < tasks.length; i++) {
                taskList.appendChild(initItemList(tasks[i].id, tasks[i].task));
            }
        } else {
            containerForTaskList.insertAdjacentHTML("afterbegin", "<div class='empty-list'>list is empty</div>");
        }
    }

    function _hideNotificationAfterTimeout() {
        setTimeout(() => {
            containerForTaskList.querySelector("." + CLASS_NOTIFICATION).innerText = "";
        }, TIMEOUT_FOR_HIDING_NOTIFICATION);
    }

    function displayPopUpNotification(messageForNotification) {
        containerForTaskList.querySelector("." + CLASS_NOTIFICATION).innerText = messageForNotification;
        _hideNotificationAfterTimeout();
    }

    function deleteTask(e) {
        let parent = e.target.parentElement;
        let taskId = Number(parent.getAttribute("data-id"))
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === taskId) {
                tasks.splice(i, 1);
                break;
            }
        }
        displayPopUpNotification(messagesForNotification.DELETE_TASK);
        renderTasks();
    }

    function addTask() {
        if (input.value.length) {
            taskId++;
            tasks.push({id: taskId, task: input.value});
            input.value = "";
            displayPopUpNotification(messagesForNotification.ADD_TASK);
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
}

createTaskList(".task-list-wrapper");
createTaskList(".task-list-wrapper1");
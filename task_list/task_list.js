function createTaskList(selector) {
    const CLASS_TASK_LIST = "task-list";
    const CLASS_ADD_TASK_BUTTON = "add-task-button";
    const CLASS_ENTER_TASK = "enter-task";
    const CLASS_DELETE_TASK_BUTTON = "delete-task-button";
    const CLASS_CLEAR_LIST_BUTTON = "clear-list-button";
    const CLASS_EMPTY_LIST = "empty-list";
    const TIMEOUT = 2000;

    let tasks = [];
    let div = document.querySelector(selector);

    function addListElement(tagName, className = null, innerText = null) {
        let newElement = document.createElement(tagName);
        const BUTTON_TEG_NAME = "BUTTON";
        newElement.className = className;
        if (newElement.tagName === BUTTON_TEG_NAME) {
            newElement.innerText = innerText;
        }
        div.appendChild(newElement);
    }

    function init() {
        addListElement("ul", CLASS_TASK_LIST);
        addListElement("input", CLASS_ENTER_TASK);
        addListElement("button", CLASS_ADD_TASK_BUTTON, "Add task");
        addListElement("button", CLASS_CLEAR_LIST_BUTTON, "Clear list");
    }

    init();
    let clearListBtn = div.querySelector(".clear-list-button");
    let ul = div.querySelector(".task-list");
    let input = div.querySelector(".enter-task");
    let addTaskBtn = div.querySelector(".add-task-button");

    function initItemList(task) {
        let li = document.createElement("li");
        li.textContent = task;
        li.classList.add("list-item");
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add(CLASS_DELETE_TASK_BUTTON);
        li.appendChild(deleteBtn);

        return li;
    }

    function renderTasks() {
        if (!tasks.length) {
            div.insertAdjacentHTML("beforebegin", "<div class='empty-list'>list is empty</div>");
        } else {
            if (document.getElementsByClassName(CLASS_EMPTY_LIST)[0]) {
                document.getElementsByClassName(CLASS_EMPTY_LIST)[0].remove();
            }
            for (let i = 0; i < tasks.length; i++) {
                ul.appendChild(initItemList(tasks[i].task));
            }
        }
    }

    renderTasks();

    function clearList() {
        ul.innerText = "";
    }
    addTaskBtn.addEventListener("click", () => {
        if (input.value.length) {
            tasks.push({id: tasks.length, task: input.value});
            clearList();
            input.value = "";
            renderTasks();
            popUpNotification(true);
        }
    })

    clearListBtn.addEventListener("click", () => {
        if (tasks.length) {
            tasks = [];
            clearList();
            renderTasks();
        }
    })

    ul.addEventListener("click", function deleteTask (e) {
        if (e.target.classList.contains(CLASS_DELETE_TASK_BUTTON)) {
            let parent = e.target.closest("li");
            let text = parent.textContent;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].task === text) {
                    tasks.splice(i, 1);
                }
            }
            popUpNotification(false)
            clearList();
            renderTasks();
        }
    })

    function popUpNotification(status) {
        let notification = document.createElement("div");
        notification.innerText = status ? "task was added" : "task was deleted";

        div.prepend(notification);
        setTimeout(() => {
            div.removeChild(notification);
        }, TIMEOUT);
    }
}

createTaskList(".task-list-wrapper");
createTaskList(".task-list-wrapper1");
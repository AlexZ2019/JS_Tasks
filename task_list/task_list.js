function createTaskList(divClassName) {
    let tasks = [];
    let div = document.querySelector("." + divClassName);

    function addElementList(tagName, className = null, innerText = null) {
        let newElement = document.createElement(tagName);
        const BUTTON = "BUTTON";
        newElement.className = className;
        if (newElement.tagName === BUTTON) {
            newElement.innerText = innerText;
        }
        div.appendChild(newElement);
    }

    addElementList("ul", "task-list");
    let ul = div.querySelector(".task-list");
    addElementList("input", "enter-task");
    let input = div.querySelector(".enter-task");
    addElementList("button", "add-task-button", "Add task");
    let addTaskBtn = div.querySelector(".add-task-button");
    addElementList("button", "delete-task-button", "Delete task");
    let deleteTaskBtn = div.querySelector(".delete-task-button");
    addElementList("button", "clear-list-button", "Clear list");
    let clearListBtn = div.querySelector(".clear-list-button");

    function renderTasks() {
        if (!tasks.length) {
            div.insertAdjacentHTML("beforebegin", "<div class='empty-list'>list is empty</div>");
        }
        else {
            if (document.getElementsByClassName("empty-list")[0]) {
                document.getElementsByClassName("empty-list")[0].remove();
            }

            for (let i = 0; i < tasks.length; i++) {
                ul.appendChild(document.createElement("li")).innerText = tasks[i].task;
            }
        }
    }

    renderTasks();

    addTaskBtn.addEventListener("click" ,() => {
        if (input.value.length) {
            tasks.push({id: tasks.length, task: input.value});
            ul.innerText = "";
            input.value = "";
            renderTasks();
            popUpNotification(true);
        }
    })

    deleteTaskBtn.addEventListener("click", () => {
        ul.innerText = "";
        tasks.pop();
        popUpNotification(false);
        renderTasks();
    })

    clearListBtn.addEventListener("click", () => {
        tasks = [];
        ul.innerHTML = "";
        renderTasks();
    })

    function popUpNotification(status) {
        let notification = document.createElement("div");
        notification.innerText = status ? "task was added" : "task was deleted";

        div.prepend(notification);
        setTimeout(() => {
            div.removeChild(div.firstChild);
        }, 2000);
    }
}

createTaskList("task-list-wrapper");
createTaskList("task-list-wrapper1");
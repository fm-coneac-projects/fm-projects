import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-a412d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const todoListInDB = ref(database, "todoList")

const btnTheme = document.getElementById('btn-theme');
const chkDark = document.getElementById('dark');
const chkLight = document.getElementById('light');

const newTodoCheck = document.getElementById('new-todo-check');
const newTodoInput = document.getElementById('new-todo');

const todoList = document.getElementById('todoList');
const btnItemsLeft = document.getElementById('btn-items-left');
const btnClearCompleted = document.getElementById('btn-clear-completed');
const btnDeleteTodos = document.getElementsByClassName('todo-delete');

btnTheme.addEventListener('click', () => {
    if (chkDark.checked) {
        chkLight.checked = true;
    } else {
        chkDark.checked = true;
    }
});

newTodoInput.addEventListener('keydown', (key) => {
    if (key['key'] === 'Enter') {
        let inputValue = newTodoInput.value;

        if (inputValue) {
            push(todoListInDB, {"todo-text": inputValue, "active": !newTodoCheck.checked})
            clearInputField();
        }
    }
});

onValue(todoListInDB, function (snapshot) {
    clearTodoList()
    if (!snapshot.exists()) {
        todoList.innerHTML = 'No items here .. yet!'
        return;
    }

    let itemsArray = Object.entries(snapshot.val())

    let listHtml = ``;
    for (let item of itemsArray) {
        let itemId = item[0];
        let itemValue = item[1];
        let todoText = itemValue["todo-text"];
        let checked = !itemValue["active"] ? "checked" : "";

        listHtml += `
         <li class="top-rounded-border">
            <div class="todo-item top-rounded-border">
                <div class="parent">
                    <input type="checkbox" ${checked}>
                        <img src="images/icon-check.svg" class="child hidden" style="width: 11px; height: 9px;" alt="complete todo" />
                </div>
                <input class="todo-input top-rounded-border" id="${itemId}" type="text" value="${todoText}">
                <img class="todo-delete" src="images/icon-cross.svg" style="width: 11px; height: 9px;" id="${itemId}" alt="delete todo"/>
            </div>
         </li>
        `;
    }
    listHtml = `<ul>` + listHtml + `</ul>`;
    todoList.innerHTML = listHtml;

    btnItemsLeft.innerHTML = `0 items left`;
    for (let deletBtn of btnDeleteTodos) {
        deletBtn.addEventListener("click", () => {
            let exactLocationFromDB = ref(database, `todoList/${deletBtn.id}`);
            remove(exactLocationFromDB);
        });
    }
})

function clearTodoList() {
    todoList.innerHTML = ""
}

function clearInputField() {
    newTodoInput.value = ""
}

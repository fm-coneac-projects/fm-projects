import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove,
    update
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
const btnUpdateTodos = document.getElementsByClassName('todo-checked');

const btnFilterAll = document.getElementById('btnFilterAll');
const btnFilterActive = document.getElementById('btnFilterActive');
const btnFilterCompleted = document.getElementById('btnFilterCompleted');

let itemsArray = [];
let currentFilter = 'All';

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

btnFilterAll.addEventListener('click', (event) => changeFilter(event));
btnFilterActive.addEventListener('click', (event) => changeFilter(event));
btnFilterCompleted.addEventListener('click', (event) => changeFilter(event));

function changeFilter(event) {
    let currentFilter = getCurrentFilter();

    if (currentFilter == "All") {
        btnFilterAll.classList.toggle('active');
        event.target.classList.toggle('active');
    }

    if (currentFilter == "Active") {
        btnFilterActive.classList.toggle('active');
        event.target.classList.toggle('active');
    }

    if (currentFilter == "Completed") {
        btnFilterCompleted.classList.toggle('active');
        event.target.classList.toggle('active');
    }

    populateTodoList(itemsArray, event.target.id.replace('btnFilter', ''));
}


onValue(todoListInDB, function (snapshot) {
    clearTodoList();
    if (!snapshot.exists()) {
        todoList.innerHTML = 'No items here .. yet!'
        return;
    }
    itemsArray = Object.entries(snapshot.val())
    currentFilter = getCurrentFilter();

    populateTodoList(itemsArray, currentFilter);
})

function getCurrentFilter() {
    if (btnFilterAll.classList.contains('active')) return "All";
    if (btnFilterActive.classList.contains('active')) return "Active";
    if (btnFilterCompleted.classList.contains('active')) return "Completed";
    return "All";
}

function addTodoItem(itemId, checked, todoText) {
    return `
         <li class="top-rounded-border">
            <div class="todo-item top-rounded-border">
                <div class="parent">
                    <input class="todo-checked" type="checkbox" id="${itemId}" ${checked}>
                        <img src="images/icon-check.svg" class="child hidden" style="width: 11px; height: 9px;" alt="complete todo" />
                </div>
                <input class="todo-input top-rounded-border" id="${itemId}" type="text" value="${todoText}">
                <img class="todo-delete" src="images/icon-cross.svg" style="width: 11px; height: 9px;" id="${itemId}" alt="delete todo"/>
            </div>
         </li>
        `;
}

function populateTodoList(itemsArray, currentFilter) {
    let itemsLeft = 0;
    let listHtml = ``;

    for (let item of itemsArray) {
        let itemId = item[0];
        let itemValue = item[1];
        let todoText = itemValue["todo-text"];
        let checked = !itemValue["active"] ? "checked" : "";
        if (!checked && (currentFilter == "All" || currentFilter == "Active")) itemsLeft++;

        if (currentFilter == "All")
            listHtml += addTodoItem(itemId, checked, todoText);

        if (currentFilter == "Active" && !checked)
            listHtml += addTodoItem(itemId, checked, todoText);

        if (currentFilter == "Completed" && checked)
            listHtml += addTodoItem(itemId, checked, todoText);
    }

    todoList.innerHTML = `<ul>` + listHtml + `</ul>`;

    btnItemsLeft.innerHTML = `${itemsLeft} items left`;

    addDeleteFunctionality();
    addUpdateFunctionality();
}

function addUpdateFunctionality() {
    for (let updateBtn of btnUpdateTodos) {
        updateBtn.addEventListener("click", () => {
            let exactLocationFromDB = ref(database, `todoList/${updateBtn.id}`);
            update(exactLocationFromDB, {active: !updateBtn.checked});
        });
    }
}

function addDeleteFunctionality() {
    for (let deleteBtn of btnDeleteTodos) {
        deleteBtn.addEventListener("click", () => {
            let exactLocationFromDB = ref(database, `todoList/${deleteBtn.id}`);
            remove(exactLocationFromDB);
        });
    }
}

function clearTodoList() {
    todoList.innerHTML = ""
}

function clearInputField() {
    newTodoInput.value = ""
}

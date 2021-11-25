
const form = document.querySelector("#form");
const todoInput = document.querySelector("#input");
const todosContainer = document.querySelector("#todos");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = todoInput.value;
    if (todo) {
        const li = document.createElement("li");
        li.innerHTML = `${todo} <i class="fas fa-times delete"></i>`;
        todosContainer.appendChild(li);
        saveTodoToLS(todo);
        todoInput.value = '';

        const deleteBtns = document.querySelectorAll(".delete");

        deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(li);
            });
        });
    }
});

function saveTodoToLS(todo) {
    // save todo to a local storage
    todos = getTodosFromLS();
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
}

function getTodosFromLS() {
    todos = JSON.parse(localStorage.getItem("todos"));
    return todos === null ? [] : todos;
}

function showTodos() {
    todosContainer.innerHTML = "";
    todos = getTodosFromLS();
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.innerHTML = `${todo}  <i class="fas fa-times delete"></i>`;
        todosContainer.appendChild(li);

        const deleteBtn = document.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            console.log(li);
        });
    });
}

showTodos();

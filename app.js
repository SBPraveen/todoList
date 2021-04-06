//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); // Unordered List
const allBtn = document.querySelector(".all");
const completedBtn = document.querySelector(".complete");
const uncompletedBtn = document.querySelector(".uncomplete");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
//DOMContentLoaded => once the page gets loaded seetTodos will get executed
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions
function addTodo(e) {
  e.preventDefault(); //to prevent default action of refresh when the form button is clicked
  if (todoInput.value != "") {
    //tododiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    if (newTodo.innerText.length > 10) {
      newTodo.style.fontSize = "6vw";
    }
    //Add todo to localStorage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    //InnerHtml is used to add an HtMl tag inside an element
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //append todoList to ul
    todoList.appendChild(todoDiv);

    //clear the input
    todoInput.value = "";
  }
}
//For delete and check button
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

allBtn.addEventListener("click", function () {
  const todo = document.querySelectorAll(".todo");
  for (let items of todo) {
    items.style.display = "flex";
  }
});

completedBtn.addEventListener("click", function () {
  const todo = document.querySelectorAll(".todo");
  console.log(todo);
  for (let items of todo) {
    if (items.classList.contains("completed")) {
      items.style.display = "flex";
    } else {
      items.style.display = "none";
    }
  }
});

uncompletedBtn.addEventListener("click", function () {
  const todo = document.querySelectorAll(".todo");
  console.log(todo);
  for (let items of todo) {
    if (!items.classList.contains("completed")) {
      items.style.display = "flex";
    } else {
      items.style.display = "none";
    }
  }
});

function saveLocalTodos(todo) {
  //check if there is a todo list already present
  // not preset => initialize a new array
  //present => use JSON.parse to transform the existing string into an array
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //tododiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //append todoList to ul
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// localStorage.clear();

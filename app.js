const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const inputSearchTodo = document.querySelector(".form-search");

const addTodo = (inputValue) => {
  if (inputValue.length) {
    todosContainer.innerHTML += ` 
      <li class="list-group-item d-flex justify-content-between align-items-center text-success" data-todo="${inputValue}">
        <span>${inputValue}</span>
        <i class="far fa-trash-alt" data-trash="${inputValue}"  ></i>
      </li>`;
  }
};

const removeTodo = (clickedElement) => {
  const isTrashElement = clickedElement.dataset.trash;
  const todo = document.querySelector(`[data-todo="${isTrashElement}"]`);

  if (isTrashElement) {
    todo.remove();
  }
};

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach((todo) => {
    todo.classList.remove(classToAdd);
    todo.classList.add(classToRemove);
  });
};

const filteredTodos = (todos, inputValue, matchedTodos) =>
  todos.filter((todo) => {
    const matchTodos = todo.textContent
      .toLocaleLowerCase()
      .includes(inputValue);
    return matchedTodos ? matchTodos : !matchTodos;
  });

const hideTodos = (todos, inputValue) => {
  const todosToHide = filteredTodos(todos, inputValue, false);
  manipulateClasses(todosToHide, "d-flex", "hidden");
};

const showTodos = (todos, inputValue) => {
  const todosToShow = filteredTodos(todos, inputValue, true);
  manipulateClasses(todosToShow, "hidden", "d-flex");
};

inputSearchTodo.addEventListener("input", (event) => {
  const inputValue = event.target.value.toLowerCase().trim();
  const todos = Array.from(todosContainer.children);
  hideTodos(todos, inputValue);
  showTodos(todos, inputValue);
});

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();
  addTodo(inputValue);
  formAddTodo.reset();
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  removeTodo(clickedElement);
});

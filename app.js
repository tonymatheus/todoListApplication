const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const searchInput = document.querySelector(".form-control");

const addTodo = (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();

  let htmlTemplate = `
        <li data-remove="delete" class="list-group-item d-flex justify-content-between align-items-center text-success">
          <span>${inputValue}</span>
          <i class="far fa-trash-alt delete"></i>
        </li>
  `;

  if (inputValue.length) {
    todosContainer.innerHTML += htmlTemplate;
    event.target.reset();
  }
};

const removeTodo = (event) => {
  const isDatasetRemove = event.target.dataset.remove === "remove";

  if (isDatasetRemove) {
    event.target.parentElement.remove();
  }
};

const searchTodosValues = (event) => {
  const inputValueSearch = event.target.value.trim().toLowerCase();

  Array.from(todosContainer.children)
    .filter(
      (todo) => !todo.textContent.toLocaleLowerCase().includes(inputValueSearch)
    )
    .forEach((todo) => {
      todo.classList.add("hidden");
      todo.classList.remove("d-flex");
    });

  Array.from(todosContainer.children)
    .filter((todo) =>
      todo.textContent.toLocaleLowerCase().includes(inputValueSearch)
    )
    .forEach((todo) => {
      todo.classList.remove("hidden");
      todo.classList.add("d-flex");
    });
};

formAddTodo.addEventListener("submit", addTodo);
todosContainer.addEventListener("click", removeTodo);
searchInput.addEventListener("input", searchTodosValues);

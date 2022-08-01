const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const searchInput = document.querySelector(".form-control");

const addTodo = (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();
  let htmlTemplate = `
          <li class="list-group-item d-flex justify-content-between align-items-center text-success">
              <span>${inputValue}</span>
              <i class="far fa-trash-alt delete"></i>
          </li>
    `;

  if (inputValue) {
    todosContainer.innerHTML += htmlTemplate;
    event.target.reset();
  }
};

const removeTodo = (event) => {
  const clickedElement = event.target;
  const deleteClassExistis = Array.from(clickedElement.classList).includes(
    "delete"
  );

  if (deleteClassExistis) {
    clickedElement.parentNode.remove();
  }
};

const searchTodo = (event) => {
  const inputValue = event.target.value.trim().toLowerCase();

  Array.from(todosContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.remove("d-flex");
      todo.classList.add("hidden");
    });

  Array.from(todosContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.add("d-flex");
      todo.classList.remove("hidden");
    });
};

formAddTodo.addEventListener("submit", addTodo);
todosContainer.addEventListener("click", removeTodo);
searchInput.addEventListener("input", searchTodo);

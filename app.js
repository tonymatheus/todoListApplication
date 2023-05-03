/*
1 - obter e  armazenar a referencia  do form 
2- Adicionar um listner de evento que  executa um fun;áo  quando  o  form  for enviado 
3- armazenar o  valor do input em uma const 
4- não permitir que  espaços em brancos sejam submetidos
5- armazenar o valor  da ul
6- quando  o  form  for  enviado, deve ser inserido na ul uma nova li que contenha o  valor  do input
7- imlementar uma condição que verifica se o  valor  do input foi preenchido no momento  do  envio do form
8- limpar o input após o envio 
9- remover o  elemento  clicado na lixeira
10- pegar referencia do elemento clicado
11- colocar uma condicional para verificar quando clicou na lixeira
12- Converter o elemento  clicado para um array 
13- criar uma const para para armazenar a referencia do input
14- filtrar os todos atraves do valor do input e adiconar uma classe nos todos que náo correspondem ao  valor do input 
15- Obter um array somente com as strings dos todos que correspondem ao valor do input com um filter
16 - Exibir as lis que contem o valor que foi inserido no input
17- 
*/

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

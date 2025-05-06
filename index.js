import { initialTodos, validationConfig } from "./utils/constants.js";
import Todo from "./components/Todo.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import TodoCounter from "./components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const id = uuidv4();
    section.addItem(section._renderer({ ...values, id }));
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
  },
});

const section = new Section({
  items: initialTodos,
  renderer: (todo) => {
    return generateTodo(todo);
  },
  containerSelector: ".todos__list",
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  todoCounter.updateCompleted(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoPopup.setEventListeners();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
section.renderItems();

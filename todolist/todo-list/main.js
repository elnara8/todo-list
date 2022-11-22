import { setDragDrop } from "./modules/helpers.js";
import List from "./modules/List.js";

const list = new List("todo-list");
const addBtn = document.querySelector(".add-todo");
const filterBtn = document.querySelector(".filter");
let direction = "";

addBtn.addEventListener("click", (e) => {
  list.new();
});

filterBtn.addEventListener("click", (e) => {
  toggleFilter();
  list.sort(direction);
});

// Handling drag and drop
document.addEventListener("DOMContentLoaded", () => {
  setDragDrop("todo-item");
});

list.element.addEventListener("change", (e) => {
  setDragDrop("todo-item");
});

function toggleFilter() {
  if (direction) filterBtn.classList.remove(direction);
  direction = direction === "asc" ? "desc" : "asc";
  filterBtn.classList.add(direction);
  filterBtn.classList.add("active");
}

if (list.todos.length === 0) {
  addBtn.click();
} else {
  list.set(list.todos);
}

import { createTodo, compareFn } from "./helpers.js";

class List {
  constructor(listClass) {
    this.listClass = listClass;
    this.element = document.querySelector("." + listClass);
    this.todos = JSON.parse(localStorage.getItem(listClass)) || [];
    this.lastId =
      this.todos.length === 0 ? 0 : this.todos[this.todos.length - 1].id + 1;
  }

  add({ id, content }) {
    const todo = createTodo({ id: id, content: content });
    this.element.appendChild(todo);

    todo.onUpdate((e) => {
      let index = this.todos.findIndex((todo) => todo.id === id);
      this.todos[index].content = e.target.value;
      todo.children[0].setAttribute("value", e.target.value);
      localStorage.setItem(this.listClass, JSON.stringify(this.todos));
    });

    todo.onRemove = () => {
      this.remove(id);
    };

    return todo;
  }

  set(todos) {
    todos.forEach((todo) => {
      this.add({ id: todo.id, content: todo.content });
    });
  }

  new() {
    const newTodo = { id: this.lastId++, content: "" };
    this.todos.push(newTodo);
    this.add(newTodo).focus();
  }

  remove(id) {
    let index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
    localStorage.setItem(this.listClass, JSON.stringify(this.todos));
    document.getElementById("todo" + id).remove();
  }

  sort(direction) {
    const todos = this.element.childNodes;
    const itemsArr = [];

    for (var i in todos) {
      if (todos[i].nodeType == 1) {
        itemsArr.push(todos[i]);
      }
    }

    itemsArr.sort((a, b) => compareFn(a, b, direction));
    for (i = 0; i < itemsArr.length; ++i) {
      this.element.appendChild(itemsArr[i]);
    }
  }
}

export default List;

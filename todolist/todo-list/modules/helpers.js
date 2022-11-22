function createTodo({ id, content }) {
  const todoLi = createNode("li", {
    id: "todo" + id,
    className: "todo-item",
    draggable: true,
  });

  const contentInput = createNode("input", {
    type: "text",
    className: "todo-content",
  });

  const deleteBtn = createNode("button", { className: "delete" });

  if (content) {
    contentInput.setAttribute("value", content);
  }

  deleteBtn.addEventListener("click", (e) => {
    todoLi.onRemove();
  });

  contentInput.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() === "enter") {
      document.querySelector(".add-todo").click();
    }
  });

  todoLi.appendChild(contentInput);
  todoLi.appendChild(deleteBtn);

  todoLi.focus = () => {
    todoLi.children[0].focus();
  };

  todoLi.onUpdate = (callback) => {
    contentInput.addEventListener("change", callback);
  };

  return todoLi;
}

function createNode(tagName, options) {
  const element = document.createElement(tagName);
  if (options) {
    Object.keys(options).forEach((key) => {
      element[key] = options[key];
    });
  }
  return element;
}

function compareFn(a, b, direction) {
  let aValue = a.children[0]?.value;
  let bValue = b.children[0]?.value;

  if (aValue > bValue) {
    return direction === "asc" ? 1 : -1;
  } else if (aValue < bValue) {
    return direction === "asc" ? -1 : 1;
  } else return 0;
}

function setDragDrop(itemClassName) {
  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = "0.4";

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add("over");
  }

  function handleDragLeave(e) {
    this.classList.remove("over");
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      const nextSibling = this.nextSibling;
      if (nextSibling === null) {
        this.parentNode.appendChild(dragSrcEl);
      }
      this.parentNode.insertBefore(dragSrcEl, nextSibling);
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = "1";

    items.forEach(function (item) {
      item.classList.remove("over");
    });
  }

  let items = document.querySelectorAll("." + itemClassName);
  items.forEach(function (item) {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("drop", handleDrop);
    item.addEventListener("dragend", handleDragEnd);
  });
}

export { createTodo, compareFn, setDragDrop };

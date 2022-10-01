// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
      // console.log('TypeError: can only add Todo objects');
      // return;
    }
    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos.at(0);
  }

  last() {
    return this.todos.at(-1);
  }

  // itemAt(index) {
  //   index = parseInt(index);
  //   // console.log(index);
  //   if ((index < 0) || (index > (this.size() - 1)) || isNaN(index)) {
  //     throw new ReferenceError(`invalid index: ${index}`);
  //   }
  //   return this.todos.at(index);
  // }
  
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) { // _ in name suggests a "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    // return this.todos.filter(obj => obj.isDone()).length === this.size();
    return this.todos.every(todo => todo.isDone());
  }

  pop() {
    return this.todos.pop();
  }

  shift() {
    return this.todos.shift();
  }

  removeAt(index) {
    this._validateIndex(index);
    // let result = this.itemAt(index);
    // this.todos = [].concat(this.todos.slice(0, index), this.todos.slice(index + 1)); 
    // return result;

    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(obj => obj.toString()).join('\n');
    return `${title}\n${list}`;
  }
  
  forEach(func, context) {
    // for(let i = 0; i < this.todos.length; i++) {
    //   func.call(context, this.todos[i], i, this.todos);
    // }
    this.todos.forEach(func, context);
  }

  filter(func) {
    let output = new TodoList(this.title);

    this.forEach(todo => {
      if (func(todo)) output.add(todo); 
    });

    return output;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return [...this.todos];
  }
}
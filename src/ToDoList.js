class ToDoList {
  constructor() {
    this.ToDo = [];
    if (localStorage.getItem('ToDoList') !== null) {
      this.ToDo = JSON.parse(localStorage.getItem('ToDoList'));
    }
  }

  AddToDO(title) {
    this.ToDo.push({
      index: this.ToDo.length + 1,
      done: false,
      title,
    });
  }

  saveList() {
    window.localStorage.setItem('ToDoList', JSON.stringify(this.ToDo));
  }

  RemoveToDo(index) {
    this.ToDo = this.ToDo.filter((e) => e.index !== Number(index));
    this.refreshIndex();
  }

  updateTitle(index, title) {
    this.ToDo[index - 1].title = title;
    this.saveList();
  }

  removeCompleted() {
    this.ToDo = this.ToDo.filter((e) => !e.done);
    this.refreshIndex();
  }

  changeIndex(index1, index2) {
    let first = 0;
    let second = 0;
    for (let i = 0; i < this.ToDo.length; i += 1) {
      if (this.ToDo[i].index === Number(index1)) first = i;
      if (this.ToDo[i].index === Number(index2)) second = i;
    }
    const x = this.ToDo[first];
    this.ToDo[first] = this.ToDo[second];
    this.ToDo[second] = x;
    this.refreshIndex();
  }

  changeDone(index, status) {
    this.ToDo[index - 1].done = status;
    this.saveList();
  }

  refreshIndex() {
    let index = 1;
    this.ToDo.forEach((e) => {
      e.index = index;
      index += 1;
    });
    this.saveList();
  }
}

export default ToDoList;

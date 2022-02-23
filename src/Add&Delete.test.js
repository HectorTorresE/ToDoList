import List from './ToDoList.js';
import Container from './Container.js';

describe('ToDoList localstorage', () => {
  test('Delete', () => {
    const ToDoList = new List();
    ToDoList.AddToDO('New Task 1');
    ToDoList.AddToDO('New Task 2');
    ToDoList.deleteTask(1);
    expect(ToDoList.ToDo.length).toBe(1);
  });
  test('Add', () => {
    const ToDoList = new List();
    ToDoList.AddToDO('New event');
    ToDoList.AddToDO('New event 2');
    expect(ToDoList.ToDo.length).toBe(2);
  });
});

describe('DOM manipulation', () => {
  test('Add item', () => {
    document.body.innerHTML = `
    <template id='ToDo' >
      <div class='row toDoR' draggable='true'>
        <div class='task'>
          <input type='checkbox' class='checkbox'>
          <input class='toDoName' type='text'>
        </div>
        <button class='btnMove' type='button'>&#8942;</button>
        <button class='btnRemove' type='button'>&#128465;</button>
      </div>
    </template>
    <div class='container'>
    </div>
    `;
    const List = new Container();
    List.ToDoList.AddToDO('event');
    List.ToDoList.AddToDO('event 1');
    List.ToDoList.AddToDO('event 2');
    List.ShowList();
    const tasks = document.body.querySelectorAll('.toDoR');
    expect(tasks.length).toBe(3);
  });
  test('Delete item', () => {
    document.body.innerHTML = `
    <template id='ToDo' >
      <div class='row toDoR' draggable='true'>
        <div class='task'>
          <input type='checkbox' class='checkbox'>
          <input class='toDoName' type='text'>
        </div>
        <button class='btnMove' type='button'>&#8942;</button>
        <button class='btnRemove' type='button'>&#128465;</button>
      </div>
    </template>
    <div class='container'>
    </div>
    `;
    window.localStorage.clear();
    const List = new Container();
    List.ToDoList.AddToDO('event');
    List.ToDoList.AddToDO('event 1');
    List.ToDoList.RemoveToDo(0);
    List.ShowList();
    const tasks = document.body.querySelectorAll('.toDoR');
    expect(tasks.length).toBe(1);
  });
});
/**
 * @jest-environment jsdom
 */
import List from './src/ToDoList.js';
import Container from './src/Container.js';

describe('ToDoList localstorage', () => {
  test('Delete', () => {
    window.localStorage.clear();
    const ToDoList = new List();
    ToDoList.AddToDO('New Task 1');
    ToDoList.AddToDO('New Task 2');
    ToDoList.RemoveToDo(1);
    expect(ToDoList.ToDo.length).toBe(1);
  });
  test('Add', () => {
    window.localStorage.clear();
    const ToDoList = new List();
    ToDoList.AddToDO('New event');
    ToDoList.AddToDO('New event 2');
    expect(ToDoList.ToDo.length).toBe(2);
  });
});

describe('DOM manipulation', () => {
  test('Add T\to-do', () => {
    window.localStorage.clear();
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
    const cont = new Container();
    cont.List.AddToDO('event');
    cont.List.AddToDO('event 1');
    cont.List.AddToDO('event 2');
    cont.ShowList();
    const tasks = document.body.querySelectorAll('.toDoR');
    expect(tasks.length).toBe(3);
  });
  test('Delete to-do', () => {
    window.localStorage.clear();
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
    const cont = new Container();
    cont.List.AddToDO('event');
    cont.List.AddToDO('event 1');
    cont.List.AddToDO('event 2');
    cont.List.RemoveToDo(1);
    cont.ShowList();
    const tasks = document.body.querySelectorAll('.toDoR');
    expect(tasks.length).toBe(2);
  });
});

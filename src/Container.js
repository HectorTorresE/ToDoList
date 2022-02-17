import ToDoList from './ToDoList.js';

class Container {
  constructor() {
    this.List = new ToDoList();
  }

  ShowList() {
    const toDoContainer = document.querySelector('.container');
    toDoContainer.innerHTML = '';
    const ToDo = document.getElementById('ToDo');
    this.List.ToDo.forEach((toDO) => {
      const Card = ToDo.content.cloneNode(true).children[0];
      const taskButton = Card.querySelector('.toDoR button');
      taskButton.setAttribute('data-id', toDO.index);
      const btnRemove = Card.querySelector('.btnRemove');
      btnRemove.setAttribute('data-id', toDO.index);
      btnRemove.addEventListener('click', (e) => {
        this.List.RemoveToDo(e.target.dataset.id);
        this.ShowList();
      });
      const toDoName = Card.querySelector('.toDoName');
      toDoName.value = toDO.title;
      if (toDO.done) {
        toDoName.style.textDecoration = 'line-through';
      } else {
        toDoName.style.textDecoration = 'none';
      }
      toDoName.addEventListener('input', (e) => {
        const first = e.target.parentNode.parentNode;
        first.style.backgroundColor = 'lightgoldenrodyellow';
        first.querySelector('.btnRemove').style.display = 'block';
        first.querySelector('.btnMove').style.display = 'none';
      });

      const checkBox = Card.querySelector('.checkbox');
      checkBox.checked = toDO.done ? 'checked' : '';
      checkBox.addEventListener('change', (e) => {
        const first = e.target.parentNode.parentNode;
        this.List.changeDone(
          first.querySelector('.btnRemove').dataset.id,
          e.target.checked,
        );
        if (!e.target.checked) {
          first.querySelector('.toDoName').style.textDecoration = 'none';
        } else {
          first.querySelector('.toDoName').style.textDecoration = 'line-through';
        }
      });

      toDoName.addEventListener('blur', (e) => {
        const first = e.target.parentNode.parentNode;
        const index = e.target.parentNode.parentNode.querySelector('.btnRemove').dataset.id;
        this.List.updateTitle(index, e.target.value);
        setTimeout(() => {
          first.querySelector('.btnRemove').style.display = 'none';
          first.querySelector('.move-btn').style.display = 'block';
        }, 200);
      });

      toDoContainer.appendChild(Card);
    });
  }

  Events() {
    document.querySelector('.removeCompleted').addEventListener('click', () => {
      this.List.removeCompleted();
      this.ShowList();
    });
    document.addEventListener('dragstart', (e) => {
      if (e.target.matches('.toDoR')) {
        this.dragSourceElement = e.target;
        this.dragSourceID = e.target.querySelector('.btnMove').dataset.id;
      }
    });
    document
      .querySelector('.inputs input')
      .addEventListener('keypress', (e) => {
        if (e.code === 'Enter') {
          if (e.target.value !== '') {
            this.List.AddToDO(e.target.value);
            this.ShowList();
            e.target.value = '';
            e.target.focus();
          }
        }
      });

    document.addEventListener('dragenter', (e) => {
      if (e.target.matches('.toDoR')) {
        e.target.classList.add('move');
      }
    });

    document.addEventListener('dragend', (e) => {
      if (e.target.matches('.toDoR')) {
        e.target.classList.remove('move');
      }
    });

    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    document.addEventListener('dragleave', (e) => {
      if (e.target.matches('.toDoR')) {
        e.target.classList.remove('move');
      }
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.target.matches('.toDoR')) {
        e.stopPropagation();
        if (this.dragSourceElement !== e.target) {
          this.dragTargetID = e.target.querySelector('.btnMove').dataset.id;
          this.List.changeIndex(this.dragTargetID, this.dragSourceID);
          e.target.classList.remove('move');
          this.ShowList();
        }
      }
    });
  }
}

export default Container;

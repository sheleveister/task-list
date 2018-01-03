(function() {
  'use strict';

  class TaskList {
    constructor() {
      this.model = [
        { text: 'Listen music' },
        { text: 'Read books of Altshuller' },
        { text: 'Learn React' },
        { text: 'Feed the fish' },
        { text: 'Read and reply to messages' },
      ];

      this.inputField = document.getElementsByClassName('task-form__text')[0];
      this.form = document.getElementsByClassName('task-form')[0];
      this.todoList = document.getElementsByClassName('table__body')[0];
      this.btnTextRemove = 'X';
    }

    getTaskNode(position, item) {
      return `<tr>
                <th>${position}</th>
                <td>${item}</td>
                <td><button type="button" class="btn btn-danger" id="${position}">${this.btnTextRemove}</button></td>
              </tr>`;
    }

    renderList(model) {
      let list = '';

      model.map((item, i) => {
        list += this.getTaskNode(i+1, item.text);
      });

      this.todoList.innerHTML = list;
    }

    onFormSubmit() {
      if (this.inputField.value.length !== 0) {
        this.addNewTask(this.inputField.value);
      }
      this.inputField.value = '';
    }

    addNewTask(value) {
      let newTask = { text: value };
      this.model.push(newTask);

      this.renderList(this.model);
    }

    removeTask(id) {
      this.model.splice(id - 1, 1);
      this.renderList(this.model);
    }

    init() {
      this.renderList(this.model);

      this.form.addEventListener('submit', (event) => {
        this.onFormSubmit(event);
      });

      this.todoList.addEventListener('click', (event) => {
        if (event.target.id) {
          this.removeTask(event.target.id);
        }
      });
    }

  }

  const taskList = new TaskList();
  taskList.init();

})();

(function() {
  'use strict';

  function TaskList() {
    this.model = [
      { text: 'Listen music' },
      { text: 'Read book' },
      { text: 'Go to walk' }
    ];

    this.inputField = document.getElementsByClassName('task-form__text')[0];
    this.form = document.getElementsByClassName('task-form')[0];
    this.todoList = document.getElementsByClassName('table__body')[0];
    this.btnTextRemove = 'X';

    this.init();
  }

  TaskList.prototype.getTaskNode = function(position, item) {

    return `<tr>
              <th>${position}</th>
              <td>${item}</td>
              <td><button type="button" class="btn btn-danger" id="${position}">${this.btnTextRemove}</button></td>
            </tr>`;

  };

  TaskList.prototype.renderList = function(model) {
    let list = '';

    model.map((item, i) => {
      list += this.getTaskNode(i+1, item.text);
    });

    this.todoList.innerHTML = list;
  };

  TaskList.prototype.onFormSubmit = function() {

    if (this.inputField.value.length !== 0) {
      this.addNewTask(this.inputField.value);
    }
    this.inputField.value = '';

  };

  TaskList.prototype.addNewTask = function(value) {

    let newTask = { text: value };
    this.model.push(newTask);

    this.renderList(this.model);

  };

  TaskList.prototype.removeTask = function(id) {
    this.model.splice(id - 1, 1);
    this.renderList(this.model);
  };

  TaskList.prototype.init = function() {

    this.renderList(this.model);

    this.form.addEventListener('submit', (event) => {
      this.onFormSubmit(event);
    });

    this.todoList.addEventListener('click', (event) => {
      if (event.target.id) {
        this.removeTask(event.target.id);
      }
    });

  };

  const taskList = new TaskList();

}());

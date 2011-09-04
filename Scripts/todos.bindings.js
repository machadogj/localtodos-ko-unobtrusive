todos.bindings = {
  apply: function(viewModel){
      ko.bindingConventions.conventions("#create-todo", {
          "#create-todo"         : { 'with': viewModel.newTask },
          "#create-todo-form"    : function(newTask) { return { submit: newTask.save }},
          "#new-todo"            : function(newTask) { return { value: newTask.name } }
      });

      ko.bindingConventions.conventions("#todo-list",{
          "#todo-list"       : { template:{name:'tmpl-todo',foreach:viewModel.tasks}, sortableList:viewModel.tasks },
          ".todo-content"    : function(task) { return {text:task.name}},
          ".todo-check"      : function(task) { return {checked:task.completed}},
          ".todo-item"       : function(task) { return {css:{done:task.completed,editing:task.editing}, event:{dblclick:task.edit}}},
          ".todo-destroy"    : function(task) { return {click:task.remove}},
          ".todo-input"      : function(task) { return {value:task.name,event:{blur:task.view}}}
      });

      ko.bindingConventions.conventions("#todo-stats",{
          "#todo-stats"      : {visible:viewModel.hasTasks},
          ".number"          : function() { return {text: viewModel.pending().length}},
          ".word"            : {text: viewModel.itemsLeft},
          ".todo-clear"      : {visible: viewModel.hasCompletedTasks},
          "#todo-clear-link" : {click:viewModel.clearCompleted},
          ".number-done"     : function() { return {text: viewModel.completed().length}}
      });

      ko.applyBindings(viewModel);
  }
};
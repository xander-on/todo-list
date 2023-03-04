import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './use-cases/';

const ElementIDs = {
  ClearCompletedButton : '.clear-completed',
  NewTodoInput      : '#new-todo-input',
  PendingCountLabel : '#pending-count',
  TodoFilters       : '.filtro',
  TodoList          : '.todo-list',
}


export const App = (elementId) => {

  const displayTodos = () => {

    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    // console.log( todos );
    renderTodos( ElementIDs.TodoList, todos );
    updatePendingCount();
  }


  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  }

  (()=>{
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();


  //Referencias HTML
  const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
  const todoListUL = document.querySelector( ElementIDs.TodoList );
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
  const filtersLI = document.querySelectorAll( ElementIDs.TodoFilters );

  //Listeners
  newDescriptionInput.addEventListener( 'keyup', (e)=>{
    if( e.keyCode != 13 ) return;
    if( e.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    displayTodos();
    e.target.value = '';
  });


  todoListUL.addEventListener('click', (e) => {
    const element = e.target.closest('[data-id]');
    todoStore.toggleTodo( element.getAttribute('data-id') );
    displayTodos();
  });


  todoListUL.addEventListener('click', (e) => {
    
    const element = e.target.closest('[data-id]');
    if( !element || !e.target.classList.contains('destroy') ) return;
    todoStore.deleteTodo( element.getAttribute('data-id') );
    displayTodos();
  });


  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });


  filtersLI.forEach( (element) => {
    element.addEventListener( 'click', (element) => {
      filtersLI.forEach( el => el.classList.remove('selected') );
      element.target.classList.add('selected');

      switch( element.target.text ){
        case 'Todos':
          todoStore.setFilter( Filters.all )
          break;
        
        case 'Pendientes':
          todoStore.setFilter( Filters.pending )
          break;
        
        case 'Completados':
          todoStore.setFilter( Filters.completed )
          break;
      }

      displayTodos();
    });
  });
}
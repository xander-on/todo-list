import { Todo } from '../todos/models/todo.model';

export const Filters = {
  all       : 'All',
  completed : 'Completed',
  pending   : 'Pending'
}

const state = {

  todos: [
    // new Todo('Piedra del alma'),
    // new Todo('Piedra del realidad'),
    // new Todo('Piedra del tiempo'),
    // new Todo('Piedra del poder'),
    // new Todo('Piedra del realidad'),

  ],

  filter: Filters.all,

}


const initStore = () => {
  loadStore();
  console.log('Store init 🥑');
  
}


const loadStore = () => {
  if( !localStorage.getItem('state') ) return;

  const { todos = [], filter = Filters.all } = JSON.parse( localStorage.getItem('state') );
  state.todos = todos;
  state.filter = filter;
}


const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
}


const getTodos = ( filter = Filters.all ) => {
  
  switch( filter ){
    case Filters.all:
      return [...state.todos];
    
    case Filters.completed:
      return state.todos.filter( todo => todo.done );

    case Filters.pending:
      return state.todos.filter( todo => !todo.done );
    
    default:
      throw new Error(`Option ${ filter } is not valid`);
  }
}


const addTodo = ( description ) => {
  if( !description ) throw new Error('Description is required');
  state.todos.push( new Todo(description) );
  saveStateToLocalStorage();
}


const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( (todo) => {
    if( todo.id === todoId ) todo.done = !todo.done;
    return todo;
  });

  saveStateToLocalStorage();

}


const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
  saveStateToLocalStorage();
}


const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
  saveStateToLocalStorage();
}


const setFilter = ( newFilter = Filters.all ) => {
  state.filter = newFilter;
  saveStateToLocalStorage();
}


const getCurrentFilter = () => {
  return state.filter;
}


export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
}
import { Component } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import styles from './TodoList.module.css';
import { v4 as uuidv4 } from 'uuid';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleToggleIsComplete = this.handleToggleIsComplete.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
  }
  componentDidMount() {
    const data = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    this.setState({ todos: data});
  }
  componentDidUpdate() {
    const json = JSON.stringify(this.state.todos);
    localStorage.setItem("todos", json);
  }
  handleAddTodo(todo) {
    const newTodo = {
      id: uuidv4(),
      todoText: todo,
      completed: false
    };
    this.setState(prevState => {
      return {
        todos: [...prevState.todos, newTodo]
      };
    });
  }
  handleDeleteTodo(id) {
    const filteredTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: filteredTodos });
  }
  handleToggleIsComplete(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if(todo.id === id)
        return { ...todo, completed: !todo.completed};

      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  handleEditTodo(id, newText) {
    const updatedTodos = this.state.todos.map(todo => {
      if(todo.id === id)
        return { ...todo, todoText: newText };

      return todo;
    });
    this.setState({ todos: updatedTodos });
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Todo List!</h3>
          <p className={styles.subtitle}>A Simple React Todo List App.</p>
        </div>
        <div className={styles["todo-list"]}>
          {this.state.todos.map(todo => 
            <Todo 
              todo={todo} 
              key={todo.id} 
              deleteTodo={this.handleDeleteTodo} 
              toggleIsComplete={this.handleToggleIsComplete}
              editTodo={this.handleEditTodo}
            />)}
        </div>
        <NewTodoForm addTodo={this.handleAddTodo} />
      </div>  
    )
  }
}

export default TodoList;
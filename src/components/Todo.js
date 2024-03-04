import { Component } from 'react';
import styles from './Todo.module.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, task: "", isDeleting: false };
    this.deleteClick = this.deleteClick.bind(this);
    this.toggleCompleteTodo = this.toggleCompleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.finishDeleting = this.finishDeleting.bind(this);
  }
  deleteClick() {
    this.setState(prevState => { return { ...prevState, isDeleting: true }} );
  }
  toggleCompleteTodo() {
    this.props.toggleIsComplete(this.props.todo.id);
  }
  editTodo() {
    this.setState({ isEditing: true, task: this.props.todo.todoText });
  }
  handleUpdate(e) {
    e.preventDefault();
    this.props.editTodo(this.props.todo.id, this.state.task);
    this.setState({ isEditing: false, task: "" });
  }
  handleChange(e) {
    this.setState(prevState => ({ ...prevState, task: e.target.value }));
  }
  handleCancel(e) {
    e.preventDefault();
    this.setState({ isEditing: false, task: "" });
  }
  finishDeleting() {
    this.props.deleteTodo(this.props.todo.id);
  }
  render() {
    let content;
    if(this.state.isEditing) {
      content = <form onSubmit={this.handleUpdate} className={styles.form}>
        <input 
          type="text" 
          value={this.state.task} 
          name="task" 
          onChange={this.handleChange}
          className={styles.input}
          required
        />
        <button  className={styles["form-btn"]}>Save</button>
        <button onClick={this.handleCancel} className={styles["form-btn"]}>Cancel</button>
      </form>
    } else {
      content = <>
        <div 
          className={`${styles.text} ${this.props.todo.completed ? styles.completed : ""}`} 
          onClick={this.toggleCompleteTodo}
        >
          {this.props.todo.todoText}
        </div>
        <div className={styles["btn-group"]}>
          <button onClick={this.editTodo} className={`${styles.btn} ${styles["btn-edit"]}`}></button>
          <button onClick={this.deleteClick} className={`${styles.btn} ${styles["btn-delete"]}`}></button>
        </div>
      </>
    }
    return (
      <div 
        id={this.props.id} 
        className={`${styles.todo} ${this.state.isDeleting ? styles["to-delete"] : ""}`} 
        onTransitionEnd={this.finishDeleting}
      >
        {content}
      </div>
    )
  }
}

export default Todo;
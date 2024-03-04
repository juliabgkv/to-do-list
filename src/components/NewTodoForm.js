import { Component } from 'react';
import styles from './NewTodoForm.module.css';

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: "" };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  submitHandler(e) {
    e.preventDefault();
    this.props.addTodo(this.state.todo);
    this.setState({ todo: "" });
  }
  changeHandler(e) {
    this.setState({ todo: e.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler} className={styles.form}>
          <input 
            name="todo"
            value={this.state.todo}
            onChange={this.changeHandler}
            className={styles.input}
            required
          />
          <button className={styles.btn}>Add Todo</button>
        </form>
      </div>
    )
  }
}

export default NewTodoForm;
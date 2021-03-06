import React, { Component } from 'react';
import TaskList from './TaskList';

//const  TASK_STATUSES =['Unstarted', 'In Progress', 'Completed'];

class TasksPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showNewCardForm: false,
            title: '',
            description: '',
        }
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    onDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    resetForm = () => {
        this.setState({
            showNewCardForm: false,
            title: '',
            description: '',
        });
    }

    onCreateTask = (e) => {
        e.preventDefault();
        this.props.onCreateTask({
            title: this.state.title,
            description: this.state.description,
        });
        this.resetForm();
    }

    toggleForm = ()=>{
        this.setState({showNewCardForm: !this.state.showNewCardForm});
    }
    onSearch = e => {
       this.props.onSearch(e.target.value);
    };


    renderTaskLists() {
        const { onStatusChange, tasks } = this.props;
        
        // const filteredTasks = tasks.filter( task => {
        //     return task.title.match(new RegExp(this.state.searchTerm, 'i'));
        // });
      //  return TASK_STATUSES.map( status => {
     //       const statusTasks = tasks.filter( task => task.status === status);
      
     return Object.keys(tasks).map(status => {
        const tasksByStatus = tasks[status];
  
     return (
                <TaskList 
                key={status}
                status={status}
                tasks={tasksByStatus}
                onStatusChange = {onStatusChange}
                 />
            );
        });
    }

     
    render() {
        if (this.props.isLoading) {
          return ( 
              <div className = 'tasks-loading' >
                  Loading...
              </div>
           );
        }

        return (
            <div className="tasks">
              <div className="tasks-header">
              <input onChange={this.onSearch}
              type='text'
              placeholder='Search' />
                <button className="button button-default" onClick={this.toggleForm}>
                  + New task
                </button>
              </div>
              {this.state.showNewCardForm &&
                <form className="new-task-form" onSubmit={this.onCreateTask}>
                  <input
                    className="full-width-input"
                    onChange={this.onTitleChange}
                    value={this.state.title}
                    type="text"
                    placeholder="title"
                  />
                  <input
                    className="full-width-input"
                    onChange={this.onDescriptionChange}
                    value={this.state.description}
                    type="text"
                    placeholder="description"
                  />
                  <button className="button" type="submit">
                    Save
                  </button>
                </form>}
              <div className="task-lists">
                    {this.renderTaskLists()}
              </div>
            </div>
          );
    }
}

export default TasksPage;
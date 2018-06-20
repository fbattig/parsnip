import React, { Component } from 'react';
import TaskList from './TaskList';

const  TASK_STATUSES =['Unstarted', 'In Progress', 'Completed'];

class TasksPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showNewCardForm: false,
            tite: '',
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



    renderTaskList(){
        const { tasks } = this.props;
        return TASK_STATUSES.map(status => {
            const statusTasks = tasks.filter(task => task.status === status);
            return <TaskList 
            key={status} 
            status={status}
            tasks ={statusTasks}   />
        })
    }
     
    render() {
        return (
            <div className='tasks'>
            <div className='tasks-header'>
                    <button 
                        className='button button-default'
                        onClick={this.toggleForm}>
                            + New TaskList
                    </button>
            </div>
            {this.state.showNewCardForm && (
                <form className='new-list-form'
                onSubmit={this.onCreateTask}>
                    <input
                    className='full-width-input'
                    type='text'
                    value= {this.state.title}
                    onChange={this.onTitleChange}
                    placeholder='title' />
                        <input
                        className='full-width-input'
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        placeholder='description' />
                    <button
                        className='button'
                        type='Submit'>
                        Save
                    </button>    
                </form>
            )}
                <div className='task-lists'>
                    {this.renderTaskList()}
                </div>
            </div>
        );
    }
}

export default TasksPage;
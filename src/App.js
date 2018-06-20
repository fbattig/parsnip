import React, { Component } from 'react';
import {connect } from 'react-redux';

import TaskPage from './components/TasksPage';



class App extends Component {

  onCreatetask = ({title, description}) => {
   this.props.dispatch({
     type: 'CREATE_TASK',
     title, 
     description
   });
  }

  render() {
    return (
      <div className='main-content'>
        <TaskPage 
        tasks ={this.props.tasks} 
        onCreateTask= {this.onCreatetask} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  };
}

export default connect(mapStateToProps)(App);
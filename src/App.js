import React, { Component } from 'react';
import {connect } from 'react-redux';

import TaskPage from './components/TasksPage';



class App extends Component {
  render() {
    return (
      <div className='main-content'>
        <TaskPage tasks ={this.props.tasks} />
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
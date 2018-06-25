import * as api from '../api';

import { CALL_API } from '../middleware/api';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export function fetchTasks() {
  return {
    [CALL_API]: {
      types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
      endpoint: '/tasks',
    },
  };
};


// function fetchTasksSucceeded(tasks) {
//   return {
//     type: 'FETCH_TASKS_SUCCEEDED',
//     payload: {
//       tasks,
//     },
//   };
// }

// function fetchTasksFailed(error) {
//   return {
//     type: 'FETCH_TASKS_FAILED',
//     payload: {
//       error,
//     },
//   };
// }

// function fetchTasksStarted() {
//   return {
//     type: 'FETCH_TASKS_STARTED',
//   };
// }

// export function fetchTasks() {
//   return dispatch => {
//     dispatch(fetchTasksStarted());

//     api
//       .fetchTasks()
//       .then(resp => {
//         setTimeout(() => {
//           dispatch(fetchTasksSucceeded(resp.data));
//         }, 2000)
//       // throw new Error('Unable to fecth tasks!');
//       })
//       .catch(err => {
//         dispatch(fetchTasksFailed(err.message));
//       });
//   };
// }

function createTaskSucceeded(task) {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task,
    },
    meta: {
      analytics: {
        event: 'create_task',
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
        }
      }
    }
  };
}

export function createTask({ title, description, status = 'Unstarted' }) {
  return dispatch => {
    api.createTask({ title, description, status }).then(resp => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

function editTaskSucceeded(task) {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);
    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
    });
  };
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [toDo, setToDo] = useState([
    { id: 1, 'title': 'task one', 'status': false },
    { id: 2, 'title': 'task two', 'status': false }
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [editing, setEditing] = useState(false);

  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  }

  const deleteTask = (id) => {
    let newTasks = toDo.filter(task => task.id !== id);
    setToDo(newTasks);
  }

  const markDone = (id) => {
    let newTasks = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status });
      }
      return task;
    });
    setToDo(newTasks);
  }

  const changeTask = (id, title) => {
    setUpdateData({ id, title });
    setEditing(true);
  }

  const updateTask = () => {
    if (updateData.title) {
      let newTasks = toDo.map(task => {
        if (task.id === updateData.id) {
          return ({ ...task, title: updateData.title });
        }
        return task;
      });
      setToDo(newTasks);
      setUpdateData('');
      setEditing(false); // Exit editing mode
    }
  }

  return (
    <div className="container App">
      <br /><br />
      <h2>To Do List App</h2>
      <br /><br />
      {editing ? (
        <div className='row'>
          <div className='col'>
            <input
              value={updateData.title}
              onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
              className='form-control form-control-lg'
            />
          </div>
          <div className='col-auto'>
            <button className='btn btn-lg btn-success mr-20' onClick={updateTask}>Update Task</button>
            <button className='btn btn-lg btn-warning' onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className='row'>
          <div className='col'>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className='form-control form-control-lg'
            />
          </div>
          <div className='col-auto'>
            <button className='btn btn-lg btn-success mr-20' onClick={addTask}>Add Task</button>
          </div>
        </div>
      )}
      <br />
      {toDo && toDo.length ? '' : 'No Task Yet. Add Some!!'}
      {toDo && toDo.map((task, index) => {
        return (
          <React.Fragment key={task.id}>
            <div className='col taskBg'>
              <div className={task.status ? 'done' : ''}>
                <span className='taskNumber'>{index + 1}</span>
                <span className='taskText'>{task.title}</span>
              </div>
              <div className='iconsWrap'>
                <span title='Completed / Not Completed' onClick={(e) => markDone(task.id)}>
                  <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                </span>
                <span title='Edit' onClick={() => changeTask(task.id, task.title)}>
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </span>
                <span title='Delete' onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </span>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default App;

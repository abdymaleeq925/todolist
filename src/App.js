import './App.css';
import deleteIcon from './icons/delete-svgrepo-com.svg'

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Col, Input, Button, Flex, Typography, Checkbox } from 'antd';

function App() {

  const {Title} = Typography;

  const [notes, setNotes] = useState(() => {
    const savedTask = localStorage.getItem('tasks');
    return savedTask ? JSON.parse(savedTask) : []
  });
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(notes))
  }, [notes])

  const addTodo = () => {
    if (!todo.trim()) return
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const newTodo = {
        id: uuidv4(),
        text: todo,
        check: false,
        isDeleting: false
      };
      
      setNotes([...notes, newTodo]);
      setTodo('');
    }, 1000)
  };

  const deleteTodo = (id) => {
    setNotes(notes.map(nt => {
      if (nt.id === id) {
        return {...nt, isDeleting: !nt.isDeleting}
      }
      return nt;
    }))
    setTimeout(() => {
      setNotes(notes.filter((el) => el.id !== id))
    }, 200)
    
    
  }

  const toggledChecked = (id) => {
    setNotes(notes.map(nt => {
      if (nt.id === id) {
        return {...nt, check: !nt.check}
      }
      return nt;
    }))
  }

  return (
    <div className="App">
      <Col className='to-do' gap={'middle'}>
        <Title> To Do List </Title>
        <Input className='input' onChange={(e) => { setTodo(e.target.value) }} value={todo} type='text' placeholder='Type what to do'/>
        <Button className='btn' onClick={addTodo} type='primary' loading={loading}>Add task</Button>

        <Flex className='list' vertical>
        {notes?.map((task) => (
          <div className={task.isDeleting ? 'task deleting' : 'task'} key={task.id} id={task.id}>
            <div className={!task.check ? '' : 'strikethrough'} key={task.id} >{task.text}</div>
            <div className='btns'>
              <Checkbox onChange={() => toggledChecked(task.id)}></Checkbox> 
              <Button className='delete-btn' onClick={() => deleteTodo(task.id)}><img src={deleteIcon}/></Button>
            </div>   
          </div>
        ))}
      </Flex>
      </Col>
      
    </div>
  );
}

export default App;

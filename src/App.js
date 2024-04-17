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
  const [checked, setChecked] = useState(false);

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
        text: todo
      };
      
      setNotes([...notes, newTodo]);
      setTodo('');
    }, 1000)
  };

  const deleteTodo = (id) => {
    setNotes(notes.filter((el) => el.id !== id))
  }


  return (
    <div className="App">
      <Col className='to-do' gap={'middle'}>
        <Title> To Do List </Title>
        <Input className='input' onChange={(e) => { setTodo(e.target.value) }} value={todo} type='text' placeholder='Type what to do'/>
        <Button className='btn' onClick={addTodo} type='primary' loading={loading}>Add task</Button>

        <Flex className='list' vertical>
        {notes?.map((task) => (
          <div className='task'>
            <div className={!checked ? '' : 'strikethrough'} key={task.id} >{task.text}</div>
            <div className='btns'>
              <Checkbox onChange={() => setChecked(!checked)}></Checkbox> 
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

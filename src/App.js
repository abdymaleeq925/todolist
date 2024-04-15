import './App.css';
import deleteIcon from './icons/delete-svgrepo-com.svg'

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Col, Input, Button, Flex, Typography } from 'antd';

function App() {

  const {Title, Text} = Typography;

  const [notes, setNotes] = useState([]);
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {saveTodo()}, [notes])

  const addTodo = () => {
    if (!todo.trim()) return
    setLoading(true);
    setTimeout(() => {
      saveTodo();
      setLoading(false);
      const newTodo = {
        id: uuidv4(),
        text: todo
      };
      
      setNotes([...notes, newTodo]);
      
      setTodo('');
      loadTodo();
    }, 1000)
  };

  console.log(notes)

  const deleteTodo = (id) => {
    setNotes(notes.filter((el) => el.id !== id))
    saveTodo();
    loadTodo();
  }

  function saveTodo() {

    localStorage.setItem('tasks', JSON.stringify(notes))
  };

  function loadTodo() {
    const tasks = JSON.parse(localStorage?.getItem('tasks'));
    console.log(tasks);
    tasks?.forEach(task => { return task })
    
  }
  return (
    <div className="App">
      <Col className='to-do' gap={'middle'} style={{ width: 400 }}>
        <Title> To Do List </Title>
        <Input onChange={(e) => { setTodo(e.target.value) }} value={todo} type='text' placeholder='Type what to do'/>
        <Button className='btn' onClick={addTodo} type='primary' loading={loading}>Add task</Button>

        <Flex vertical>
        {notes?.map((task) => (
          <div key={task.id}>{task.text} <Button className='delete-btn' onClick={() => deleteTodo(task.id)}><img src={deleteIcon}/></Button> </div>
        ))}
      </Flex>
      </Col>
      
    </div>
  );
}

export default App;

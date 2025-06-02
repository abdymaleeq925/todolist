import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, Checkbox, Typography, Col, Flex } from 'antd';
import './App.css';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (!input.trim()) return;
        const newTodo: Todo = { id: uuidv4(), text: input, completed: false };
        setTodos(prev => [...prev, newTodo]);
        setInput('');
    };

    const toggleCompleted = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const clearCompleted = () => {
        setTodos(prev => prev.filter(todo => !todo.completed));
    };

    return (
        <div className="App">
            <Col className='to-do'>
                <Typography.Title>To Do List</Typography.Title>
                    <Input
                        className={'input'}
                        placeholder="Type what to do"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Button className='btn' onClick={addTodo} type="primary" style={{ marginTop: '10px' }}>
                        Add task
                    </Button>
                <Flex className='list' vertical>
                    {filteredTodos.map(todo => (
                        <div className='task' key={todo.id}>
                            <Checkbox
                                checked={todo.completed}
                                onChange={() => toggleCompleted(todo.id)}
                                data-testid="checkbox"
                            >
                                <span className={todo.completed ? 'strikethrough' : ''}>{todo.text}</span>
                            </Checkbox>
                        </div>
                    ))}
                </Flex>

                <div className='task-buttons'>
                    <span>{todos.filter(t => !t.completed).length} items left</span>
                    <Button onClick={() => setFilter('all')}>All</Button>
                    <Button onClick={() => setFilter('active')}>Active</Button>
                    <Button onClick={() => setFilter('completed')}>Completed</Button>
                    {todos.some(t => t.completed) && (
                        <Button onClick={clearCompleted}>Clear completed</Button>
                    )}
                </div>
            </Col>
        </div>
    );
};

export default App;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('adds and displays a task', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Type what to do'), {
      target: { value: 'New Task' },
    });
    fireEvent.click(screen.getByText('Add task'));
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  test('filters completed tasks', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Type what to do');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Add task'));

    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(screen.getByText('Add task'));

    const checkboxes = screen.getAllByTestId('checkbox');
    fireEvent.click(checkboxes[1]); // Complete Task 2

    fireEvent.click(screen.getByText('Completed'));

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('clears completed tasks', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Type what to do');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Add task'));

    const checkbox = screen.getByTestId('checkbox');
    fireEvent.click(checkbox); // Mark Task 1 completed

    fireEvent.click(screen.getByText('Clear completed'));

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});

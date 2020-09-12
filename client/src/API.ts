import instance from './utils/instance';
import { AxiosResponse } from 'axios';

export const getAllTodos = async (): Promise<ITodo[]> => {
  const response: AxiosResponse = await instance.get('/getTodos');
  return response.data.todos;
};

export const getTodoById = async (id: string): Promise<ITodo> => {
  const response: AxiosResponse = await instance.get(`/getTodo/${id}`);
  return response.data;
};

export const addTodo = async (
  title: string,
  description: string
): Promise<ITodo[]> => {
  const response: AxiosResponse = await instance.post('/addTodo', {
    title,
    description,
  });
  return response.data.newTodo;
};

export const deleteTodo = async (id: string): Promise<ITodo[]> => {
  const response: AxiosResponse = await instance.delete(`/deleteTodo/${id}`);
  return response.data.todo;
};

export const updateTodo = async (
  id: string,
  value: boolean
): Promise<ITodo[]> => {
  const response: AxiosResponse = await instance.put(`/updateTodo/${id}`, {
    value,
  });
  return response.data.updatedTodo;
};

import React, { FC, useState, useEffect, FormEvent } from 'react';
import { getAllTodos, addTodo, deleteTodo, updateTodo } from './API';
import Form from './components/Form/Form';
import { createGlobalStyle } from 'styled-components';
import { StyledPageContainer } from './Styles';
import TodoItem from './components/TodoItem';
import Loader from './components/Loader';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box
  }
  html {
      box-sizing: inherit;
      --background-color: #0f151c;
      --text-color: #eee;
      --font-family: 'Roboto', sans-serif;
      font-size: 62.5%;
  }
  body {
      background: var(--background-color);
      color: var(--text-color);
      font-family: var(--font-family);
      font-size: 2rem;
  }
`;

const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formData: { title: string; description: string }
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newTodo = await addTodo(formData.title, formData.description);
      setTodos(newTodo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      const newTodos: ITodo[] = await deleteTodo(id);
      setTodos(newTodos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, value: boolean) => {
    setLoading(true);
    try {
      const newTodos: ITodo[] = await updateTodo(id, value);
      setTodos(newTodos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      try {
        const fetchedTodos = await getAllTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <GlobalStyle />
      <StyledPageContainer>
        <Form handleSubmit={handleSubmit} />
        {todos.length > 0 &&
          todos.map((todo) => (
            <TodoItem
              key={todo.ID}
              {...todo}
              updateItem={updateItem}
              deleteItem={deleteItem}
            />
          ))}
      </StyledPageContainer>
    </>
  );
};

export default App;

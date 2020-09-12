import React, { FC } from 'react';
import { formatStatus } from '../../utils/formatStatus';
import { StyledTodoItem, StyledActionsContainer } from './TodoStyles';
import { green, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

type TodoItemProps = ITodo & {
  deleteItem: (id: string) => void;
  updateItem: (id: string, value: boolean) => void;
};

const TodoItem: FC<TodoItemProps> = ({
  ID,
  title,
  description,
  todoStatus,
  deleteItem,
  updateItem,
}) => {
  return (
    <StyledTodoItem todoStatus={todoStatus}>
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <StyledActionsContainer>
        <p>Status: {formatStatus(todoStatus)}</p>
        <div>
          <DeleteIcon
            onClick={() => deleteItem(ID)}
            color="secondary"
            fontSize="large"
          />
          {!todoStatus ? (
            <CheckIcon
              onClick={() => updateItem(ID, true)}
              style={{ color: green[500] }}
              fontSize="large"
            />
          ) : (
            <CloseIcon
              onClick={() => updateItem(ID, false)}
              style={{ color: red[500] }}
              fontSize="large"
            />
          )}
        </div>
      </StyledActionsContainer>
    </StyledTodoItem>
  );
};

export default TodoItem;

import styled from 'styled-components';

export const StyledTodoItem = styled.div<{ todoStatus: boolean }>`
  width: 100%;
  display: flex;
  padding: 2rem;
  flex-direction: column;
  border: 1px solid var(--text-color);
  margin: 1rem 0;
  .title,
  .description {
    text-decoration: ${({ todoStatus }) =>
      todoStatus ? 'line-through' : 'unset'};
  }
`;

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  svg {
    margin: 0 2rem;
    cursor: pointer;
  }
`;

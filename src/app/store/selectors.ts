import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './reducers';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectSelectedUser = createSelector(
  selectTodoState,
  (state) => state.selectedUser
);

export const selectCompletedTodoList = createSelector(
  selectTodoState,
  (state) => state.completedTodo
);


export const selectPendigTodoList = createSelector(
  selectTodoState,
  (state) => state.pendingTodo
);
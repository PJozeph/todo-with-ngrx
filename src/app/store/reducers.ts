import { createReducer, on } from '@ngrx/store';
import { Todo } from '../modals/todo-modal';
import { User } from '../modals/user.modal';
import { setCompletedTodoList, setPendingTodoList, setSelectedUser } from './actions';

export type TodoState = {
  selectedUser: User | undefined;
  completedTodo: Todo[];
  pendingTodo: Todo[];
};

const initialState: TodoState = {
  selectedUser: undefined,
  completedTodo: [],
  pendingTodo: [],
};

export const todoReducer = createReducer(
  initialState,
  on(setCompletedTodoList, (state, { completedTodoList }) => ({
    ...state,
    completedTodo: completedTodoList,
  })),
  on(setPendingTodoList, (state, { pendingTodoList }) => ({
    ...state,
    pendingTodo: pendingTodoList,
  })),
  on(setSelectedUser, (state, { selectedUser }) => ({
    ...state,
    selectedUser: selectedUser,
  })),
);

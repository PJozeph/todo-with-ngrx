import { createAction, props } from '@ngrx/store';
import { Todo } from '../modals/todo-modal';
import { User } from '../modals/user.modal';

export const fetchPendingTodoList = createAction(
  '[Todo] Get Pending Todo',
  props<{ userId: number }>()
);
export const featchCompletedTodo = createAction(
  '[Todo] Get Completed Todo',
  props<{ userId: number }>()
);

export const featchAllTodo = createAction('[Todo] Get All Todos');

export const setCompletedTodoList = createAction(
  '[Todo] Set Completed Todo List',
  props<{ completedTodoList: Todo[] }>()
);

export const setPendingTodoList = createAction(
  '[Todo] Set Pending Todo List',
  props<{ pendingTodoList: Todo[] }>()
);

export const setSelectedUser = createAction(
  '[Todo] Set Selected User',
  props<{ selectedUser: User }>()
);

export const setTodoStatusCompleted = createAction(
  '[Todo] mark complete Todo',
  props<{ todo: Todo }>()
);

export const undoToDoStatus = createAction(
  '[Todo] undo Todo Status',
  props<{ todo: Todo }>()
);

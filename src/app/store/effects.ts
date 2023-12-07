import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, mergeMap, switchMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';
import {
  featchAllTodo,
  featchCompletedTodo,
  fetchPendingTodoList,
  setCompletedTodoList,
  setPendingTodoList,
  setTodoStatusCompleted,
  setTodoStatusPending,
} from './actions';
import { selectSelectedUser } from './selectors';

@Injectable()
export class TodoEffects {
  fetchPendingTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPendingTodoList),
      switchMap((action) => this.todoService.getPendingTodos(action.userId)),
      map((pendingTodoList) => setPendingTodoList({ pendingTodoList }))
    )
  );

  fetchCompletedTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featchCompletedTodo),
      switchMap((action) =>
        this.todoService.getCompletedTodoList(action.userId)
      ),
      map((completedTodoList) => setCompletedTodoList({ completedTodoList }))
    )
  );

  completeTodoAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTodoStatusCompleted),
      switchMap((action) => this.todoService.updateTodoStatus(action.todo)),
      map(() => featchAllTodo())
    )
  );

  undoTodoStatusAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTodoStatusPending),
      switchMap((action) => this.todoService.updateTodoStatus(action.todo)),
      map(() => featchAllTodo())
    )
  );

  fetchPendingAndCompletedTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featchAllTodo),
      combineLatestWith(this.store.select(selectSelectedUser)),
      mergeMap(([action, user]) => [
        fetchPendingTodoList({ userId: user.id }),
        featchCompletedTodo({ userId: user.id }),
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store
  ) {}
}

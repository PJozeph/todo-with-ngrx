import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  combineLatest,
  map,
  tap
} from 'rxjs';
import { Todo } from 'src/app/modals/todo-modal';
import { User } from 'src/app/modals/user.modal';
import { TodoActionService } from 'src/app/services/todo-action.service';
import { TodoService } from 'src/app/services/todo.service';
import { fetchPendingTodoList, setTodoStatusCompleted } from 'src/app/store/actions';
import {
  selectPendigTodoList,
  selectSelectedUser,
} from 'src/app/store/selectors';

@Component({
  selector: 'app-pending-todo-list',
  templateUrl: './pending-todo-list.component.html',
  styleUrls: ['./pending-todo-list.component.css'],
})
export class PendingTodoListComponent implements OnInit {
  todoService: TodoService = inject(TodoService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  todoAction: TodoActionService = inject(TodoActionService);
  store: Store = inject(Store);
  destoryRef: DestroyRef = inject(DestroyRef);

  private pendingTodos$: Observable<Todo[]> =
    this.store.select(selectPendigTodoList);
  private user$: Observable<User> = this.store.select(selectSelectedUser);

  data$ = combineLatest([this.pendingTodos$, this.user$]).pipe(
    map(([todos, user]) => ({ todos, user }))
  );

  ngOnInit(): void {
    this.user$
      .pipe(
        takeUntilDestroyed(this.destoryRef),
        tap((user) => {
          this.store.dispatch(fetchPendingTodoList({ userId: user.id }));
        })
      )
      .subscribe();
  }

  markAsCompleted(todo: Todo) {
    const updatedTodo: Todo = { ...todo, completed: true };
    this.store.dispatch(setTodoStatusCompleted({ todo: updatedTodo }));
  }
}

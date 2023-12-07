import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { Todo } from 'src/app/modals/todo-modal';
import { User } from 'src/app/modals/user.modal';
import { TodoService } from 'src/app/services/todo.service';
import { featchCompletedTodo, undoToDoStatus } from 'src/app/store/actions';
import {
  selectCompletedTodoList,
  selectSelectedUser,
} from 'src/app/store/selectors';

@Component({
  selector: 'app-completed-todo-list',
  templateUrl: './completed-todo-list.component.html',
  styleUrls: ['./completed-todo-list.component.css'],
})
export class CompletedTodoListComponent {
  todoService: TodoService = inject(TodoService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  store: Store = inject(Store);
  destoryRef: DestroyRef = inject(DestroyRef);

  completedodos$: Observable<Todo[]> = this.store.select(
    selectCompletedTodoList
  );
  user$: Observable<User> = this.store.select(selectSelectedUser);

  data$ = combineLatest([this.completedodos$, this.user$]).pipe(
    map(([todos, user]) => ({ todos, user }))
  );

  ngOnInit(): void {
    this.user$
      .pipe(
        takeUntilDestroyed(this.destoryRef),
        tap((user) => {
          this.store.dispatch(featchCompletedTodo({ userId: user.id }));
        })
      )
      .subscribe();
  }

  undoCompletedStatus(todo: Todo, user: User) {
    const updatedTodo: Todo = { ...todo, completed: false };
    this.store.dispatch(undoToDoStatus({ todo: updatedTodo }));
  }
}

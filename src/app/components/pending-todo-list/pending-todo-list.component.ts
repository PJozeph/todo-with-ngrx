import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, mergeMap, of, tap } from 'rxjs';
import { Todo } from 'src/app/modals/todo-modal';
import { TodoActionService } from 'src/app/services/todo-action.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-pending-todo-list',
  templateUrl: './pending-todo-list.component.html',
  styleUrls: ['./pending-todo-list.component.css'],
})
export class PendingTodoListComponent {
  todoService: TodoService = inject(TodoService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  todoAction: TodoActionService = inject(TodoActionService);

  pendingTodos$: Observable<Todo[]> = this.getTodoList();

  ngOnInit(): void {
    this.todoAction.todoAction$.pipe().subscribe(() => {
      this.pendingTodos$ = this.getTodoList();
    });
  }

  markAsCompleted(todoId: number) {
    this.pendingTodos$ = this.todoService.updateTodoStatus(todoId, true).pipe(
      mergeMap(() => this.getTodoList()),
      tap(() => this.todoAction.todoAction$.next())
    );
  }

  private getTodoList(): Observable<Todo[]> {
    return this.activatedRoute.params.pipe(
      mergeMap((params) => this.todoService.getPendingTodos(params['id']))
    );
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, mergeMap, of, take, tap } from 'rxjs';
import { Todo } from 'src/app/modals/todo-modal';
import { TodoActionService } from 'src/app/services/todo-action.service';

@Component({
  selector: 'app-completed-todo-list',
  templateUrl: './completed-todo-list.component.html',
  styleUrls: ['./completed-todo-list.component.css'],
})
export class CompletedTodoListComponent implements OnInit {
  todoService: TodoService = inject(TodoService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  todoAction: TodoActionService = inject(TodoActionService);

  completedodos$: Observable<Todo[]> = this.getTodoList();

  ngOnInit(): void {
    this.todoAction.todoAction$.pipe().subscribe(() => {
      this.completedodos$ = this.getTodoList();
    });
  }

  undoCompletedStatus(todoId: number) {
    this.completedodos$ = this.todoService.updateTodoStatus(todoId, false).pipe(
      mergeMap(() => this.getTodoList()),
      tap(() => this.todoAction.todoAction$.next())
    );
  }

  private getTodoList(): Observable<Todo[]> {
    return this.activatedRoute.params.pipe(
      mergeMap((params) => this.todoService.getCompletedTodoList(params['id']))
    );
  }
}

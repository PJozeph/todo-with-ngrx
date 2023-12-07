import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../modals/todo-modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpCLicnet: HttpClient = inject(HttpClient);

  public getUserTodoList(userId: number) {
    return this.httpCLicnet.get(`http://localhost:3000/todos?userId=${userId}`);
  }

  public getCompletedTodoList(userId: number): Observable<Todo[]> {
    return this.httpCLicnet.get<Todo[]>(
      `http://localhost:3000/todos?userId=${userId}&completed=true`
    );
  }

  public getPendingTodos(userId: number): Observable<Todo[]> {
    return this.httpCLicnet.get<Todo[]>(
      `http://localhost:3000/todos?userId=${userId}&completed=false`
    );
  }

  public updateTodoStatus(
    todo: Todo,
  ): Observable<Todo> {
    return this.httpCLicnet.patch<Todo>(
      `http://localhost:3000/todos/${todo.id}`,
      {
        completed : todo.completed,
      }
    );
  }
}

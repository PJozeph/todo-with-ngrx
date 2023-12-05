import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, mergeMap } from 'rxjs';
import { User } from 'src/app/modals/user.modal';
import { UserService } from 'src/app/services/user.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  userService: UserService = inject(UserService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  user$: Observable<User> = this.activatedRoute.params.pipe(
    mergeMap((params) => this.userService.getUserById(params['id']))
  );
}

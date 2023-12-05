import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modals/user.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  users$: Observable<User[]> = this.userService.getUsers();

  onUserSelected(userId: number) {
    this.router.navigate([`/todos/${userId}`]);
  }
}

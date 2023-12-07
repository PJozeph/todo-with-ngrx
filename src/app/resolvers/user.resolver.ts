import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { User } from '../modals/user.modal';
import { Observable, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSelectedUser } from '../store/actions';

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  userService: UserService = inject(UserService),
  store: Store = inject(Store)
): Observable<User> =>
  userService
    .getUserById(Number(route.paramMap.get('id')))
    .pipe(
      tap((user) => store.dispatch(setSelectedUser({ selectedUser: user })))
    );

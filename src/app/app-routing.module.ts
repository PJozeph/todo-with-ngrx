import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { userResolver } from './resolvers/user.resolver';

const routes: Routes = [
  { path: '', component: UserListComponent },
  {
    path: 'todos/:id',
    component: TodoPageComponent,
    resolve: { user: userResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

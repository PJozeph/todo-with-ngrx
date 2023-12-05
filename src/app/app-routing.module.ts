import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'todos/:id', component: TodoPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

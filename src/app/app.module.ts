import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserListComponent } from './components/user-list/user-list.component';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CompletedTodoListComponent } from './components/completed-todo-list/completed-todo-list.component';
import { RouterModule } from '@angular/router';
import { PendingTodoListComponent } from './components/pending-todo-list/pending-todo-list.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

import { StoreModule } from '@ngrx/store';
import { todoReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    CompletedTodoListComponent,
    PendingTodoListComponent,
    TodoPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    RouterModule,
    StoreModule.forRoot({ todo: todoReducer }),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

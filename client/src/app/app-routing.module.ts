import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path:'', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children : [
      { path:'members', component: MemberListComponent, canActivate : [AuthGuard] },
      { path:'members/:id', component: MemberDetailComponent }, //Passing Id as input parameter from URL
      { path:'lists', component: ListsComponent },
      { path:'messages', component: MessagesComponent }
    ]
  },
  { path:'errors', component: TestErrorsComponent },
  { path:'not-found', component: NotFoundComponent },
  { path:'server-error', component: ServerErrorComponent },
  //By default, the router checks URL elements from the left to see if the URL matches a given path, and stops when there is a match. For example, '/team/11/user' matches 'team/:id'.
  //The path-match strategy 'full' matches against the entire URL. 
  //It is important to do this when redirecting empty-path routes. Otherwise, because an empty path is a prefix of any URL, the router would apply the redirect even when navigating to the redirect destination, creating an endless loop.
  { path:'**', component: NotFoundComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

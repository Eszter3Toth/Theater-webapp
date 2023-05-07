import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
}, {
  path: 'signup',
  loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
}, {
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
}, {
  path: 'home',
  loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
}, {
  path: 'plays',
  loadChildren: () => import('./pages/plays/plays.module').then(m => m.PlaysModule),
  canActivate: [AuthGuard]
}, {
  path: 'tickets',
  loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule),
  canActivate: [AuthGuard]
}, {
  path: 'not-found',
  loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
}, {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: '/not-found'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

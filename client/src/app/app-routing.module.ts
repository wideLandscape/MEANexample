import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';

import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { ReviewComponent } from './review/review.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { LoginGuard } from './_guards/login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'assignment',
    component: AssignmentComponent,
    canActivate: [AdminGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
export const AppRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

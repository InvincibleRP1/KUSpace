import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../auth/admin/admin.component'
import { UserComponent }  from '../auth/user/user.component'
import { AuthGuard } from '../Services/auth.guard';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


const routes: Routes = [
{path: 'signup', component: UserComponent}, //CommonSignup
{path: 'admin', component: AdminLoginComponent},
{path: 'admin/home', component: AdminComponent}, //, canActivate: [AuthGuard]
{path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
{path: 'login', component: UserLoginComponent},
{path: 'user', component: UserHomeComponent, canActivate: [AuthGuard]},
{path: 'edit/:postId', component: UserHomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

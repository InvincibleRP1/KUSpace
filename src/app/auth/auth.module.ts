import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { PostsComponent } from './user/posts/posts.component';
import { CreatePostComponent } from './user/create-post/create-post.component';
import { ProfileComponent } from './user/profile/profile.component';






@NgModule({
  declarations: [AdminComponent, UserComponent, AdminLoginComponent, UserLoginComponent, UserHomeComponent, PostsComponent, CreatePostComponent, ProfileComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }

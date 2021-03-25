import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HomeComponent } from './Otherpages/home/home.component';
import { NotfoundComponent } from './Otherpages/notfound/notfound.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: '**' , component: NotfoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

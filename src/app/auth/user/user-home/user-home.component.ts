import { Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { UserData } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserHomeComponent implements OnInit, OnDestroy {
  users = [];
  User: UserData;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    document.querySelector('body').classList.add('user');
    this.authService.getUsers();
    this.authService.getUpdatedUsersListener().subscribe(Users => {
      this.users = Users;
    })

    // this.authService.getUser()
  }

  ngOnDestroy(){
    document.querySelector('body').classList.remove('user');
  }

  onLogOut(){
    this.authService.logout();
  }
  
}

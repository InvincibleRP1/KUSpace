import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userIsAuthenticated: boolean;
  private authListenerSubs: Subscription;

  constructor(public authService: AuthService) { 
    
  }

  ngOnInit() {
    
  }
  
  ngOnDestroy(){
  }

  onLogOut(){
    this.authService.logout();
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserLoginComponent implements OnInit {
  public userIsAuthenticated = false;
  AuthForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(10),
    Validators.maxLength(25)]),

    password: new FormControl('', [Validators.required, Validators.minLength(4),
    Validators.maxLength(20)])
  })


  constructor(private AuthService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.AuthService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      console.log(isAuthenticated);
      
      if (this.userIsAuthenticated == true) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 2000
        })
        if(this.userIsAuthenticated == true){
      this.router.navigateByUrl('/user')
    }
      }
      
    })
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
  }

  onSubmit() {
    if (this.AuthForm.invalid) {
      return;
    }
    this.AuthService.login(this.AuthForm.value.email, this.AuthForm.value.password);
  }


}



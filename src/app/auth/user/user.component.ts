import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../Validators/match-password';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  AuthForm = new FormGroup({

    FullName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(10),
    Validators.maxLength(25)]),

    role: new FormControl('', [Validators.required]),

    password: new FormControl('', [Validators.required, Validators.minLength(4), 
    Validators.maxLength(20)]),

    passwordConfirmation: new FormControl('', [Validators.required, 
      Validators.minLength(4), 
      Validators.maxLength(20),
      ]
      ) 
  }, {validators : [this.MatchPassword.validate]})
  AdminUser: boolean;

  
  constructor( private MatchPassword: MatchPassword, private AuthService: AuthService,
    private router: Router) { }

  ngOnInit():void {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('signup');
}

  ngOnDestroy() {
    document.querySelector('body').classList.remove('signup');
}


  onSubmit(){
    if (this.AuthForm.invalid){
      return;
    }
    else{

      this.AuthService.createUser(this.AuthForm.value.FullName, this.AuthForm.value.email, this.AuthForm.value.role, this.AuthForm.value.password)
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Account Created!',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigateByUrl('/login')
        }

        

      
    }
  }


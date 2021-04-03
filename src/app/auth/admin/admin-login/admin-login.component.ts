import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLoginComponent implements OnInit {
  AuthForm = new FormGroup({

    email: new FormControl('a', [Validators.required, Validators.email, Validators.minLength(10),
    Validators.maxLength(25)]),

    password: new FormControl('', [Validators.required, Validators.minLength(4), 
    Validators.maxLength(20)])})


  //   passwordConfirmation: new FormControl('', [Validators.required, 
  //     Validators.minLength(4), 
  //     Validators.maxLength(20),
  //     ]
  //     ) 
  // }, {validators : [this.MatchPassword.validate]})
  
  
  

  constructor(private AuthService: AuthService,
    private router: Router) { }

  ngOnInit():void {}
  
  ngAfterViewInit() {
    document.querySelector('body').classList.add('login');
}

ngOnDestroy() {
    document.querySelector('body').classList.remove('login');
}

  onSubmit(){
    if (this.AuthForm.invalid){
      return;
    }
    else{

      // this.AuthService.login(this.AuthForm.value).subscribe({
      //   next: response=>{
      //     this.router.navigateByUrl('/admin/home')
      //   },
      // })
      
    }
  }
}

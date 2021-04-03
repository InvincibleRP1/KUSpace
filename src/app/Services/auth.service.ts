import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from '../Models/auth.model'
import { Subject } from 'rxjs'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenTimer: any;
  private token: string;
  public isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private users: AuthData[] = [];
  private userId: string;
  private usersUpdated = new Subject<AuthData[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getUsers(){
    this.http.get<{message: string, users: any}>('http://localhost:3300/api/user').subscribe(userData => {
      this.users = userData.users;
      this.usersUpdated.next([...this.users])
    })
  }

  

  // fetchCurrentUser(){
  //   this.http.post<AuthData>
  // }

  getUpdatedUsersListener(){
    return this.usersUpdated.asObservable()
  }
  
  createUser(FullName: string, email: string, role: string, password: string) {
    const authData: AuthData = { FullName: FullName, email: email, role: role, password: password }
    this.http.post("http://localhost:3300/api/user/signup", authData)
      .subscribe(result => {
        console.log(result);
      })
  }

  getUserId(){
    return this.userId;
  }

  login(email: string, password: string){
    this.http.post<{token: string, expiresIn: number, userId: string}>("http://localhost:3300/api/user/login", {email: email, password: password})
    .subscribe(response=>{
      const token = response.token;
      this.token = token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.tokenTimer = setTimeout(()=> {
          this.logout();
        }, expiresInDuration * 1000)
        
        this.isAuthenticated = true;
        this.userId = response.userId
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        // Swal.fire({
        //         position: 'top',
        //         icon: 'success',
        //         title: 'Login Successful',
        //         showConfirmButton: false,
        //         timer: 2000
        //       })
        // this.router.navigate(['/user'])
      }
      
    })
  }
  
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/'])
    
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId)
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId")
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }

  }
}
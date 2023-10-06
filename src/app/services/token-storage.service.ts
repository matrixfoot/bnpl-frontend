import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';
const TOKEN_KEY = 'x-access-token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  saved=false
  constructor(private router: Router,private userservice: UserService,) { }
  signOut(): void {
    this.userservice.getUserById(this.getUser().userId).then(
      (user:User)=>
      {
        user.connected=false
        this.userservice.disconnectUser(this.getUser().userId,user)
        window.localStorage.clear();
        this.router.navigate(['login']);  
        this.saved=true
      }
    )
    
    
  }
  public saveToken(token: string): void {
    
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY,token);
  }
  public getToken(): string | null {
    
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
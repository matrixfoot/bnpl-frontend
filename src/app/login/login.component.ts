import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  errorMessage: string;
  isLoggedIn = false;
  isLoginFailed = false;
  role: string;
  email:string;
  firstname:string;
  civilite: string;
  lastname:string;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private userservice: UserService,
              private tokenStorage: TokenStorageService
              ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser();
      this.email=this.tokenStorage.getUser();
      this.firstname=this.tokenStorage.getUser().Firstname;
      this.lastname=this.tokenStorage.getUser().Lastname;
      this.civilite=this.tokenStorage.getUser().civilite;
      this.role=this.tokenStorage.getUser().role;
    }
    
   
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.auth.login(email, password).subscribe({
      next: data => {
        
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.firstname=this.tokenStorage.getUser().Firstname;
        this.lastname=this.tokenStorage.getUser().Lastname;
        this.civilite=this.tokenStorage.getUser().civilite;
        console.log(this.tokenStorage.getUser().userId)
        console.log(this.tokenStorage.getUser())

        this.userservice.connectUser(this.tokenStorage.getUser().userId,this.tokenStorage.getUser())
        this.router.navigate(['home'])
        this.reloadPage();
        
 
        
      },
      error: error => {
        this.loading = false;
        this.isLoginFailed = true;
      }
    });


    
  }
  reloadPage(): void {
    
    setTimeout(() => window.location.reload(), 1000);
    
  }
}
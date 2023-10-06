import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const authurllocal= 'http://localhost:3005/api/users/';
const authurlcloud ='https://macompta.com.tn:3002/api/users/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  

  
  public userrole$ = new BehaviorSubject<string>('');
  

  constructor(private router: Router,
              private http: HttpClient) {}


  register(email:string,password:string,confirmpassword:string,usertype:string, mobile:string,firstname:string,lastname:string,fonction:string,secteur:string,civilite:string,nature:string,raisonsociale:string,nomsociete:string,clientcode: string,role:string):Observable<any> {
    return this.http.post(authurlcloud + 'signup', {
      email, password, confirmpassword,firstname, lastname,fonction,secteur,civilite,nature,usertype,mobile,raisonsociale,nomsociete,clientcode, role
    }, httpOptions);

  }
  

  login(email: string, password: string) 
  : Observable<any> {
    return this.http.post(authurlcloud + 'login', {
      
      email,
      
      password
    }, httpOptions);
  
  }
   
  }

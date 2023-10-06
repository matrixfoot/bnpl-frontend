import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService } from '../_helpers/alert.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';

enum EmailStatus {
    Verifying,
    Failed,
    Success
}

@Component({ selector: 'app-verify-email',
templateUrl: 'verify-email.component.html' ,
styleUrls: ['./verify-email.component.scss']})
export class VerifyEmailComponent implements OnInit {
    EmailStatus = EmailStatus;
    emailStatus = EmailStatus.Verifying;
    errormsg:string;
    successmsg:string;
    token:string;
    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.emailStatus= EmailStatus.Verifying;
        this.route.params.subscribe(
            (params:Params)=>{
             this.accountService.getUserById(params.token).then(
                (user: User) => {
                  this.token = user.accessToken;
                  console.log(this.token)
                    // remove token from url to prevent http referer leakage
        this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

        this.accountService.verifyEmail(this.token).then(
                (success:any) => {
                    this.alertService.success(success.message);
      window.scrollTo(0, 0);
                    this.emailStatus = EmailStatus.Success;
                    
                },
                (error)=> {
                    this.emailStatus = EmailStatus.Failed;
                    this.alertService.error(error.error.error);
      window.scrollTo(0, 0);
                }
            );
                })
                .catch(() => {
                    this.emailStatus = EmailStatus.Failed;
                    Swal.fire('opération non aboutie!');
                  });;
            }
        )

      
    }
    onlogin(){
        this.router.navigate(['login']);
        this.reloadPage();
    }
    reloadPage (){
        setTimeout(() => window.location.reload(), 3000);
        
        
      }
    onforgot(){
        this.router.navigate(['forgot-password']);
    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../_helpers/alert.service';
import { UserService} from '../services/user.service';


enum TokenStatus {
    Validating,
    Valid,
    Invalid
}

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
  })
export class ResetPasswordComponent implements OnInit {
    TokenStatus = TokenStatus;
    tokenStatus = TokenStatus.Validating;
    token = null;
    resetpasswordform: FormGroup;
    loading = false;
    submitted = false;
    errormsg:string;
    successmsg:string;
    successmessage: string;
    errormessage:string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: UserService,
        private alertService: AlertService
        
    ) { }

    ngOnInit() {
        this.resetpasswordform = this.formBuilder.group({
            password: ['', Validators.required],
            confirmpassword: ['', Validators.required],
        }, {
            
        });

        this.route.params.subscribe(
          (params:Params)=>{
              this.token=params.token
              
          }
      )

        // remove token from url to prevent http referer leakage
        this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

        this.accountService.validateResetToken(this.token).then(
          (success:any) => {
            this.alertService.success(success.message);
            window.scrollTo(0, 0);
              this.tokenStatus = TokenStatus.Valid;
              
          },
          (error)=> {
              this.tokenStatus = TokenStatus.Invalid;
              this.alertService.error(error.error.error);
      window.scrollTo(0, 0); 
          }
      );

    // convenience getter for easy access to form fields
        }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
      

        

        this.loading = true;
        const password = this.resetpasswordform.get('password').value;
        const confirmpassword = this.resetpasswordform.get('confirmpassword').value;
        this.accountService.resetPassword(this.token, password, confirmpassword).then(
              (success:any) => {
                this.alertService.success(success.message);
                window.scrollTo(0, 0);
                  
                  
              },
              (error)=> {
                this.loading = false;
                  this.tokenStatus = TokenStatus.Invalid;
                  this.alertService.error(error.error.error);
                  window.scrollTo(0, 0);
              }
          );
    }
}
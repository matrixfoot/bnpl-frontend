import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { AlertService } from '../_helpers/alert.service';
import { UserService} from '../services/user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordform: FormGroup;
  loading = false;
  submitted = false;
  successmsg:string;
  errormsg:string;

  constructor(
      private formBuilder: FormBuilder,
      private accountService: UserService,
      private alertService: AlertService
  ) { }

  ngOnInit() {
      this.forgotpasswordform = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotpasswordform.controls; }

  onSubmit() {
      this.submitted = true;

      this.loading = true;
      
      this.accountService.forgotPassword(this.f.email.value).then(
        (success:any) => {
          this.alertService.success(success.message);
          window.scrollTo(0, 0);
            
            
            
        },
        (error)=> {
            
          this.alertService.error(error.error.error);
          window.scrollTo(0, 0);
        }
    );
  }
}

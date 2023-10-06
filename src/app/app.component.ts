import { Component, OnInit,ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  usertype:string;
  currentUser: any;
  isloggedin=false
  public countdown=0
  public modalRef: BsModalRef;
  public interval$ = interval(1000);

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  constructor(private token: TokenStorageService,private modalService: BsModalService,
    private bnIdle: BnNgIdleService,private router: Router,private userservice: UserService,
    ) {
    
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.isloggedin=!!this.token.getToken();
    this.usertype=this.currentUser.usertype;
    if (this.isloggedin)
    {
      setTimeout(() => this.childModal.show()
          
      , 13800000);
      setTimeout(() =>    (this.interval$.subscribe(value => this.countdown=value), this.countdown=0)

          
      , 13800000);  
    this.bnIdle.startWatching(14400).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.childModal.hide();
        this.token.signOut();
        this.router.navigate(['login']);
        this.reloadPage()
      }
    });
  }
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  stay() {
    this.childModal.hide();
    this.reset();
    this.countdown=0
    setTimeout(() => this.childModal.show()
          
      , 13800000)
      setTimeout(() =>    this.interval$.subscribe(value => this.countdown=value)

          
      , 13800000);  
  }
  reset() {
    this.bnIdle.resetTimer()
  }
  logout() {
    this.childModal.hide();
    this.userservice.disconnectUser(this.token.getUser().userId,this.token.getUser()) 
    this.token.signOut();
    this.router.navigate(['login']);
    this.reloadPage()
  }
  reloadPage (){
    setTimeout(() => window.location.reload(), 1000);
    
    
  }
}

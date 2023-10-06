import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { AlertService } from '../_helpers/alert.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  loading=false;
  user:User;
  civilite:any
  errormsg:string;
  currentUser: any;
  specialite: string;
  constructor(private token: TokenStorageService,private router: Router,private route: ActivatedRoute,private alertService: AlertService,private usersservice: UserService) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.usersservice.getUserById(this.currentUser.userId).then(
      (user: User) => {
        this.loading = false;
        this.user = user;
        this.civilite=this.user.civilite
      });
  }
  getNavigation(link, id){
      
    this.router.navigate([link + '/' + id]);
      
  }
  onDelete() {
  this.loading = true;
  
    
      this.usersservice.deleteUserById(this.currentUser.userId).then(
        (data:any) => {
          
          this.loading = false;
          this.alertService.success(data.message+'veuillez se déconnecter pour voir les changements');
          window.scrollTo(0, 0);
        },
        (error) => {
          this.loading = false;
          this.alertService.error(error.error.error);
          window.scrollTo(0, 0);
        }
      )
      

        
    
  
}
reloadPage(): void {
    
  window.location.reload();
  
}
}

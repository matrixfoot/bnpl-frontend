import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Params, Router } from '@angular/router';
import { Userdeleted } from '../models/user-deleted.model';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { AlertService } from '../_helpers/alert.service';

@Component({
  selector: 'app-view-user-deleted',
  templateUrl: './view-user-deleted.component.html',
  styleUrls: ['./view-user-deleted.component.scss']
})
export class ViewUserDeletedComponent implements OnInit {

 

  public userdeleted: Userdeleted;
  public errormsg:string;
  public loading: boolean;
  
  currentUser: any;

  

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private usersservice: UserService,
              private token: TokenStorageService,
              private alertService: AlertService) { }
  ngOnInit() {
    this.loading = true;
    this.currentUser = this.token.getUser();
  
    this.route.params.subscribe(
      (params: Params) => {
        this.usersservice.getUserdeletedById(params.id).then(
          (userdeleted: Userdeleted) => {
            this.loading = false;
            this.userdeleted = userdeleted;
            
            
            this.alertService.info('Données Utilisateur Chargées Avec Succès');
            window.scrollTo(0, 0);
            
            
          }
        );
      }
    );
    
  }
  getNavigation(link, id){
      
    this.router.navigate([link + '/' + id]);
      
  }
  onrestaure() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.usersservice.getUserdeletedById(params.id).then(
          (data:any) => {
            this.loading = false;
            Swal.fire({
              title: 'Veuillez confirmer la restauration!',
              
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.restaureUser(params.id);
                this.router.navigate(['admin-board']);
                this.reloadPage()

              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      }
    );
  }
  reloadPage(): void {
    
    setTimeout(() => window.location.reload(), 1000);
    
  }
  }

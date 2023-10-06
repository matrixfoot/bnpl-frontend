import { Component, OnInit } from '@angular/core';

import { Contact } from '../models/contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../models/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { AlertService } from '../_helpers/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public user: User;
  public errormsg:string;
  public loading: boolean;
  
  currentUser: any;
  contactform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cont: ContactService,
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
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user = user;
            this.contactform = this.formBuilder.group({
              email: ['macompta@macompta.com.tn'],
              emailenvoyea: [this.user.email,],
              description: ['',],
            });   
          }
        );
      }
    );
  
  }
  onSubmit() {
    this.loading = true;

    const contact = new Contact();
    contact.email = this.contactform.get('email').value;
    contact.emailenvoyea = this.contactform.get('emailenvoyea').value;
    contact.description = this.contactform.get('description').value;
    this.cont.comunicatewithuser(contact).then(
        (data:any) => {
          this.contactform.reset();
          this.loading = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'message envoyée avec succès!',
            showConfirmButton: false,
            timer: 6000 
          });
          this.reloadPage()
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  myFunction2() {
    var checkbox:any = document.getElementById("myCheck2");
    var text2 = document.getElementById("bodycontainer2");
    if (checkbox.checked == true){
      this.contactform.patchValue({
        emailenvoyea:this.user.email,
        email:'macompta@macompta.com.tn'
      })
      text2.style.display = "block";
    } else {
      Swal.fire({
        title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire de contact avec l\'utilisateur, voulez vous continuer?',
        
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Réinitialiser',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) {
          
          this.contactform.reset();
          text2.style.display = "none";
        }
        else{
          checkbox.checked = true
          text2.style.display = "block";
  
        }
      }).catch(() => {
        Swal.fire('opération non aboutie!');
      });
    }
  }
  getNavigation(link, id){
      
    this.router.navigate([link + '/' + id]);
      
  }
  onDelete() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.usersservice.getUserById(params.id).then(
          (data:any) => {
            this.loading = false;
            Swal.fire({
              title: 'Veuillez confirmer la suppression!',
              
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.deleteUserById(params.id);
                this.router.navigate(['admin-board']);
              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      }
    );
  }
  onDesactivate() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user=user;
            Swal.fire({
              title: 'Veuillez confirmer la désactivation!',
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.desactivateUser(params.id,user);
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
  onstandby() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user=user;
            Swal.fire({
              title: 'Veuillez confirmer la mise en standby!',
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.standbyUser(params.id,user);
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
  ondeletetemporar() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user=user;
            Swal.fire({
              title: 'Veuillez confirmer la suppression temporaire!',
              
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.deletetemporarUser(params.id);
                this.router.navigate(['admin-board']);
              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      }
    );
  }
  onverif() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user=user;
            Swal.fire({
              title: 'Veuillez confirmer le forcage de vérification de l\'utilisateur!',
              
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.verifyEmail(this.user.accessToken);
                this.router.navigate(['admin-board']);
              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      }
    );
  }
  onliberate() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user=user;
            Swal.fire({
              title: 'Veuillez confirmer la libération de l\'utilisateur!',
              
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.liberateUser(params.id,user);
                this.router.navigate(['admin-board']);
              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      }
    );
  }
  onactivate() {
    this.loading = true;
    this.route.params.subscribe(
      (params: Params) => {
        
        this.usersservice.getUserById(params.id).then(
          (user: User) => {
            this.loading = false;
            this.user=user;
            Swal.fire({
              title: 'Veuillez confirmer la restauration!',
              
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmer',
              
            }).then((result) => {
              if (result.value) {
                this.usersservice.activateUser(params.id,user);
                this.router.navigate(['admin-board']);
              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      }
    );
  }
  onReset() {
    this.contactform.reset();
}
  reloadPage(): void {
    
    setTimeout(() => window.location.reload(), 1000);
    
  }
  }

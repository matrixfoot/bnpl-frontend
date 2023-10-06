import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Reclamation } from '../models/reclamation';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../models/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import { ReclamationService } from '../services/reclamation.service';
@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.scss']
})
export class UserBoardComponent implements OnInit {
  public filtredusers: User[] = [];
  prenom:string;
  nom:string
  role: string;
  isLoggedIn = false;
  private reclamationsSub: Subscription;
  public reclamation: Reclamation;
  public errormsg:string;
  public loading: boolean;
  usertype: string;
  email: string;
  userId:string;
  converteddate: Date;
  converteddate2: Date;
  public reclamations: Reclamation[] = [];
  reclamationnumber=0;
  constructor(          
    private Auth: TokenStorageService,
    private recserv:ReclamationService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }
  ngOnInit() {
      const user = this.Auth.getUser();
      this.usertype = user.usertype;
      this.email = user.email;
      this.userId = user.userId;
      this.role=user.role;
      this.prenom=user.Firstname
      this.nom=user.Lastname
    this.loading = true;          
    this.reclamationsSub = this.recserv.reclamations$.subscribe(
      (reclamations) => {
        this.reclamations = reclamations;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errormsg=error.message;
      }
    );
    this.recserv.getReclamation(this.userId);
  }
  getNavigation(link, id){
    this.router.navigate([link + '/' + id]); 
  }
  
  addHours(date:Date) {
    date.setTime(date.getTime() * 60 * 60 * 1000);

    return date;
  }  

onTabClick(event) {
   
}
          click1()
          {
          }
  }
  

  
  
  
  

 



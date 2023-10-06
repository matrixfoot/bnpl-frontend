import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { concat, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Decfiscmens } from '../models/dec-fisc-mens';
import { Deccomptabilite } from '../models/dec-comptabilite';
import { Userdeleted } from '../models/user-deleted.model';
import { Router } from '@angular/router';
import { Condidate } from '../models/condidate.model';
import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ExcelService} from '../services/excel.service';
import { Sort } from '../_helpers/sort';
import { TokenStorageService } from '../services/token-storage.service';
import { CommunService } from '../services/commun';
@Component({
  selector: 'app-collab-board',
  templateUrl: './collab-board.component.html',
  styleUrls: ['./collab-board.component.scss']
})
export class CollabBoardComponent implements OnInit {

  public searchForm: FormGroup;
  public loading: boolean;
  public users: User[] = [];
  public users2: User[]= [];

  public filtredusers: User[] = [];
  public decfiscmenss: Decfiscmens[] = [];
  public deccomptabilites: Deccomptabilite[] = [];

  public usersdeleted: Userdeleted[] = [];
  public condidates: Condidate[] = [];
  public contacts: Contact[] = [];
  private condidatesSub: Subscription;
  private contactsSub: Subscription;
  private usersSub: Subscription;
  private usersdeletedSub: Subscription;
  private decfiscmenssSub: Subscription;
  private deccomptabilitesSub: Subscription;
  prenom:string;
  nom:string
  errormsg:string;
  firstname:string;
  lastname:string;
  statut:string;
  email:string;
  date:Date;
  firstnamedecomptabilite:string
  lastnamedeccomptabilite:string
  filtredusers2: User[] = [];
  prenomfisc: string
  nomfisc: string
  clientactif=false
  clientbloque=false
  clientsupptemporairement=false
  collaborateurs=false
  consultants=false
  candidat=false
  decfiscmensvalide=false
  decfiscmensnonvalide=false
  deccomptabilitevalide=false
  deccomptabilitenonvalide=false
  candidaturevalide=false
  candidaturenonvalide=false
  reclamationtraite=false
  reclamationnontraite=false
  ca=0;
  cb=0;
  coll=0;
  cons=0;
  decfiscvali=0;
  decfiscnonvali=0;
  deccomptvalid=0;
  deccompnonval=0;
  del=0;
  condval=0;
  condnonal=0;
  contval=0;
  contnonval=0;
  condida=0;
  dossdecfiscencours=0;
  dossdeccompencours=0;
  dosscandencours=0;
  dosscontactencours=0;
  dossencours: any[]=[];
  showdossencours: boolean;
  dossencours1: Decfiscmens[];
  dossencours2: Deccomptabilite[];
  dossencours3: Condidate[];
  dossencours4: Contact[];
  showdosspasencoreaffecte: boolean;
  dossdecfiscnonaffecte=0;
  dossdeccompnonaffecte=0;
  dosscandnonaffecte=0;
  dosscontactnonaffecte=0;
  dossnonaffecte1: Decfiscmens[];
  dossnonaffecte2: Deccomptabilite[];
  dossnonaffecte3: Condidate[];
  dossnonaffecte4: Contact[];
  dossnonaffecte: any[]=[];
  prenomaffecte: string;
  nomaffecte: string;
  sorteddossencours: any[]=[];
  sorteddossnonaffecte: any[]=[];
  currentuser: User;
  usertype: string;
  id: string;
  decfiscmens: Decfiscmens;
  deccomptabilite: Deccomptabilite;
  constructor(
              private UserService: UserService,
              private cont:ContactService,
              private commun: CommunService,
              private router: Router, private Auth: TokenStorageService,
              private excelService:ExcelService) { }
              ngOnInit() {
               /* const user = this.Auth.getUser();
                this.currentuser=user
                this.usertype=this.currentuser.usertype
                this.id=this.currentuser.userId
               console.log(this.currentuser)
                this.contactsSub = this.cont.contactreqs$.subscribe(
                  (contacts) => {
                    this.contacts = contacts;
                    
                    this.loading = false;
                  },
                  (error) => {
                    this.loading = false;
                    
                    this.errormsg = error.message;
                  }
                );

                this.condidatesSub = this.cond.condidates$.subscribe(
                  (condidates) => {
                    this.condidates = condidates;
                    
                    this.loading = false;
                  },
                  (error) => {
                    this.loading = false;
                    
                    this.errormsg=error.message;
                  }
                );
               
                

                this.usersSub = this.UserService.users$.subscribe(
                  (users) => {
                    this.users = users;
                    this.users2= users
                    this.loading = false;
                  },
                  (error) => {
                    this.loading = false;
                    this.errormsg=error.message;
                  }
                );
                this.decfiscmenssSub = this.dec.decfiscmenss$.subscribe(
                  (decfiscmenss) => {
                    this.decfiscmenss = decfiscmenss;
                    this.loading = false;
                  },
                  (error) => {
                    this.loading = false;
                    this.errormsg=error.message;
                  }
                );
                this.deccomptabilitesSub = this.deccompt.deccomptabilites$.subscribe(
                  (deccomptabilites) => {
                    this.deccomptabilites = deccomptabilites;
                    this.loading = false;
                  },
                  (error) => {
                    this.loading = false;
                    this.errormsg=error.message;
                  }
                );
                this.usersdeletedSub = this.UserService.usersdeleted$.subscribe(
                  (usersdeleted) => {
                    this.usersdeleted = usersdeleted;
                    this.loading = false;
                  },
                  (error) => {
                    this.loading = false;
                    this.errormsg=error.message;
                  }
                );
               this.getall()
               this.getalldeccomptabilites()
               this.getalldecfiscmenss()    
               this.getcondidatesall()
               this.getcontactsall()*/
              }
              /*debutcompteurdecfiscale(link,id)
              {

                this.dec.getDecfiscmensreqById(id).then(
                  (decfiscmens: Decfiscmens) => {
                    
                    this.decfiscmens = decfiscmens;
                    this.commun.getcurrenttime().then(
                      (data:any) => {
//@ts-ignore
if(this.decfiscmens.statutcollab.length>0)
{
  //@ts-ignore
  if(this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll!='en cours de traitement')
  { 
    this.decfiscmens.statutcollab.push
    //@ts-ignore
    ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
    })
    this.dec.modifydecfiscmensreqById(this.decfiscmens._id,this.decfiscmens).then(
      (data:any) => {
        this.router.navigate([link + '/' + id]); 
      },
      (error) => {
        this.loading = false;
        
        window.scrollTo(0, 0);     
  }
  );
  }
  else 
  {
    this.router.navigate([link + '/' + id]); 
  } 
}
 else
 {
  this.decfiscmens.statutcollab.push
    //@ts-ignore
    ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
    })
    this.dec.modifydecfiscmensreqById(this.decfiscmens._id,this.decfiscmens).then(
      (data:any) => {
        this.router.navigate([link + '/' + id]); 
      },
      (error) => {
        this.loading = false;
        
        window.scrollTo(0, 0);     
  }
  );
 } 
                      }
                    )
                    
}
)
}
debutcompteurcomptabilite(link,id)
{
  this.deccompt.getDeccomptabilitereqById(id).then(
    (deccomptabilite: Deccomptabilite) => {
      this.deccomptabilite = deccomptabilite;
      this.dec.geexistenttdecfiscmens(deccomptabilite.userId,deccomptabilite.annee,deccomptabilite.mois).then(
        async (decfiscmens: Decfiscmens[]) => {
          if(decfiscmens.length>0)
          {
            this.commun.getcurrenttime().then(
              (data:any) => {
      //@ts-ignore
      if(this.deccomptabilite.statutcollab.length>0)
      {
      //@ts-ignore
      if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll!='en cours de traitement')
      { 
      this.deccomptabilite.statutcollab.push
      //@ts-ignore
      ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
      })
      this.deccompt.completedeccomptabilitereqById(this.deccomptabilite._id,this.deccomptabilite).then(
      (data:any) => {
      this.router.navigate([link + '/' + id]); 
      },
      (error) => {
      this.loading = false;
      
      window.scrollTo(0, 0);     
      }
      );
      decfiscmens[0].statutcollab.push
      //@ts-ignore
      ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
      })
      this.dec.modifydecfiscmensreqById(decfiscmens[0]._id,decfiscmens[0]).then(
      (data:any) => {
      this.router.navigate([link + '/' + id]); 
      },
      (error) => {
      this.loading = false;
      
      window.scrollTo(0, 0);     
      }
      );
      }
      else 
      {
      this.router.navigate([link + '/' + id]); 
      } 
      }
      else
      {
      this.deccomptabilite.statutcollab.push
      //@ts-ignore
      ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
      })
      this.deccompt.completedeccomptabilitereqById(this.deccomptabilite._id,this.deccomptabilite).then(
      (data:any) => {
      this.router.navigate([link + '/' + id]); 
      },
      (error) => {
      this.loading = false;
      
      window.scrollTo(0, 0);     
      }
      );
      decfiscmens[0].statutcollab.push
      //@ts-ignore
      ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
      })
      this.dec.modifydecfiscmensreqById(decfiscmens[0]._id,decfiscmens[0]).then(
      (data:any) => {
      this.router.navigate([link + '/' + id]); 
      },
      (error) => {
      this.loading = false;
      
      window.scrollTo(0, 0);     
      }
      );
      } 
              }
            )
          }
          else 
          {
            this.commun.getcurrenttime().then(
              (data:any) => {
      //@ts-ignore
      if(this.deccomptabilite.statutcollab.length>0)
      {
      //@ts-ignore
      if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll!='en cours de traitement')
      { 
      this.deccomptabilite.statutcollab.push
      //@ts-ignore
      ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
      })
      this.deccompt.completedeccomptabilitereqById(this.deccomptabilite._id,this.deccomptabilite).then(
      (data:any) => {
      this.router.navigate([link + '/' + id]); 
      },
      (error) => {
      this.loading = false;
      
      window.scrollTo(0, 0);     
      }
      );
      }
      else 
      {
      this.router.navigate([link + '/' + id]); 
      } 
      }
      else
      {
      this.deccomptabilite.statutcollab.push
      //@ts-ignore
      ({
      statutcoll:'en cours de traitement',
      motifcoll:'',
      datefin:data,
      })
      this.deccompt.completedeccomptabilitereqById(this.deccomptabilite._id,this.deccomptabilite).then(
      (data:any) => {
      this.router.navigate([link + '/' + id]); 
      },
      (error) => {
      this.loading = false;
      
      window.scrollTo(0, 0);     
      }
      );
      } 
              }
            )
          }
        }
      )

      
}
)
}
getadmincollabview(link, id){
      
  this.UserService.getUserById(id);
  this.router.navigate([]).then((result) => {
    window.open(link + '/' + id, '_blank');
  });; 
}   
                
              
              getNavigationusers(link, id){
      
                this.UserService.getUserById(id);
                this.router.navigate([link + '/' + id]); 
              }
              getNavigationusersdeleted(link, id){
      
                this.UserService.getUserdeletedById(id);
                this.router.navigate([link + '/' + id]); 
              }
              getNavigationdecfiscmenss(link, id){
      
                this.dec.getDecfiscmensreqById(id);
                this.router.navigate([link + '/' + id]); 
              }
              getNavigationdeccomptabilites(link, id){
      
                this.deccompt.getDeccomptabilitereqById(id);
                this.router.navigate([link + '/' + id]); 
              }
              getNavigationcondidates(link, id){
      
                this.cond.getCondidateById(id);
                this.router.navigate([link + '/' + id]); 
              }
              getNavigationcontacts(link, id){
      
                this.cont.getContactreqById(id);
                this.router.navigate([link + '/' + id]); 
              }
              getuserdeccomptabilite(id:string) {
                 
                return this.filtredusers=this.users.filter((user) => (user._id === id));
              }
              getall() {
                                
                                                
                this.UserService.getAll();
                                                               
                                                                 
             }
             filterusers(id:string)
{
  this.filtredusers=this.deccompt.filterByValue(this.users,id)
  if(this.filtredusers.length>0)
  {
    this.prenom=this.filtredusers[0].firstname
    this.nom=this.filtredusers[0].lastname
  }
  else
  {
    this.prenom='utilisateur supprimé'
    this.nom='utilisateur supprimé'
  }
}
filterusers2(id:string)
{
  this.filtredusers2=this.deccompt.filterByValue(this.users2,id)
  if(this.filtredusers2.length>0)
  {
    this.prenomfisc=this.filtredusers2[0].firstname
    this.nomfisc=this.filtredusers2[0].lastname
    this.prenomaffecte=this.filtredusers2[0].firstname
    this.nomaffecte=this.filtredusers2[0].lastname
  }
  else
  {
    this.prenomfisc='utilisateur supprimé'
    this.nomfisc='utilisateur supprimé'
  }
  
}
             getdossiersencours()
             {
              this.dossencours1=new Array 
              this.dossencours2=new Array
              this.dossencours3=new Array
              this.dossencours4=new Array

              this.getall()
              this.getalldeccomptabilites()
              this.getalldecfiscmenss()
              this.getcondidatesall()
              this.getcontactsall()
 this.decfiscmenss.forEach((item, index) => { 
  if(item.statutadmin.length>0&&item.statutcollab.length>0)
      {
               //@ts-ignore                                                            
        if(item.statutadmin[item.statutadmin.length-1].statut=='affecté'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id&&item.origine!='généré automatiquement'
      //@ts-ignore                                                            
        ||item.statutadmin[item.statutadmin.length-1].statut=='à rectifier'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id&&item.origine!='généré automatiquement')
        {
          this.dossencours1.push(item)
          console.log('1',this.dossencours1)
        }
      }
      else if(
      //@ts-ignore                                                            
    item.affecte==this.id&&item.statutadmin.find(e => e.statut==='affecté')&&item.statutcollab.length==0)
      {
        this.dossencours1.push(item)
        console.log('2',this.dossencours1)
      }

   }
   )
   this.condidates.forEach((item, index) => { 
    if(item.statutadmin.length>0&&item.statutcollab.length>0)
        {
                 //@ts-ignore                                                            
          if(item.statutadmin[item.statutadmin.length-1].statut=='affecté'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id
        //@ts-ignore                                                            
          ||item.statutadmin[item.statutadmin.length-1].statut=='à rectifier'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id)
          {
            this.dossencours3.push(item)
            console.log('1',this.dossencours3)
          }
        }
        else if(
        //@ts-ignore                                                            
      item.affecte==this.id&&item.statutadmin.find(e => e.statut==='affecté')&&item.statutcollab.length==0)
        {
          this.dossencours3.push(item)
          console.log('2',this.dossencours3)
        }
  
     }
     )
     this.contacts.forEach((item, index) => { 
      if(item.statutadmin.length>0&&item.statutcollab.length>0)
          {
                   //@ts-ignore                                                            
            if(item.statutadmin[item.statutadmin.length-1].statut=='affecté'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id
          //@ts-ignore                                                            
            ||item.statutadmin[item.statutadmin.length-1].statut=='à rectifier'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id)
            {
              this.dossencours4.push(item)
              console.log('1',this.dossencours4)
            }
          }
          else if(
          //@ts-ignore                                                            
        item.affecte==this.id&&item.statutadmin.find(e => e.statut==='affecté')&&item.statutcollab.length==0)
          {
            this.dossencours4.push(item)
            console.log('2',this.dossencours4)
          }
    
       }
       )
       this.deccomptabilites.forEach((item, index) => { 
        if(item.statutadmin.length>0&&item.statutcollab.length>0)
            {
                     //@ts-ignore                                                            
              if(item.statutadmin[item.statutadmin.length-1].statut=='affecté'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id
            //@ts-ignore                                                            
              ||item.statutadmin[item.statutadmin.length-1].statut=='à rectifier'&&item.statutcollab[item.statutcollab.length-1].statutcoll!='traité'&&item.affecte== this.id)
              {
                this.dossencours2.push(item)
              }
            }
            else if(
            //@ts-ignore                                                            
          item.affecte==this.id&&item.statutadmin.find(e => e.statut==='affecté')&&item.statutcollab.length==0)
            {
              this.dossencours2.push(item)
            }
      
         }
         )
this.dossencours=[]
this.dossencours=this.dossencours.concat(this.dossencours1,this.dossencours2,this.dossencours3,this.dossencours4) 
       console.log(this.dossencours)
       const sort = new Sort();
       if(this.currentuser.rolesuperviseur=='Autorisé')
       {
        this.sorteddossencours=this.dossencours.sort(sort.startSort('created','asc',''));
        console.log('here1')
        console.log(this.sorteddossencours)
       }
       else
       {
        this.sorteddossencours=this.dossencours.sort(sort.startSort('created','asc',''))[0];
        console.log('here2')
        console.log(this.sorteddossencours)
       }

            return (this.sorteddossencours); 
              

             }
             
             getalldecfiscmenss() {
                                
                                                
              this.dec.getdecfiscmenss();
                                                             
                                                               
           } 
          
           getalldeccomptabilites() {                                   
            this.deccompt.getdeccomptabilites();                                                    
         }
                        
          
              getcondidatesbyemail() {
                                                                                
                this.email=this.searchForm.get('email').value;
                this.cond.getCondidate(this.email);
                                                                                                
                                                                                                 
             }
              getcondidatesall() {
                                                                                
                                                          
                this.cond.getCondidates();
                                                                                                                
                                                                                                                 
             }
           
            getcontactreqsbydateinf() {
                                                                                
              
              this.cont.getContactreqsinf(this.searchForm.get('date').value);
                                                                                              
                                                                                               
           }
           getcontactreqsbydatesup() {
                                                                                
            
            this.cont.getContactreqssup(this.searchForm.get('date').value);
                                                                                            
                                                                                             
         }
          getcontactsall() {
                                                                              
                                                        
              this.cont.getContactreqs();
                                                                                                              
                                                                                                               
           }
           
           exportusersAsXLSX():void {
            this.excelService.exportAsExcelFile(this.users,[],[],[],[],[],[], 'sample');
          }
         */
}

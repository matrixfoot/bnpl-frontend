
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
import { CommunService } from '../services/commun';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {
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
  clienttotal=0;
  utilconnecte=0;
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
  decfiscmens: Decfiscmens;
  deccomptabilite: Deccomptabilite;
  condidate: Condidate;
  contact: Contact;
  dossencoursvalide: any[]=[];
  dossencoursnonvalide: any[]=[];
  showdallusers: boolean;
  showconnected: boolean;
  constructor(private formBuilder: FormBuilder,
              private UserService: UserService,
              private cont:ContactService,private commun: CommunService,
              private router: Router,
              private excelService:ExcelService) { }
              ngOnInit() {
               /* this.searchForm = this.formBuilder.group({
              
                  lastname: [null,],
                  firstname: [null,],
                  email: [null,],
                  date: [null,],
                
                })
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
                );*/
               
                

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
                /*this.decfiscmenssSub = this.dec.decfiscmenss$.subscribe(
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
                );*/
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
              /* this.getalldeccomptabilites()
               this.getalldecfiscmenss()
               this.getalldeleted()
               this.getclients()
               this.getclientsbloqued()
               this.getcollaborateurs()
               this.getcondidates()
               this.getcondidatesall()
               this.getconsultants()
               this.getcontactsall()*/
              }
              /*debutcompteurdecfiscale(link,id)
              {

                this.dec.getDecfiscmensreqById(id).then(
                  (decfiscmens: Decfiscmens) => {
                    
                    this.decfiscmens = decfiscmens;
                    this.UserService.getUserById(this.decfiscmens.userId).then(
                      (user:User)=>{
                        if (user)
                        {
                          if(user.standby)
                          return (
                            Swal.fire({
                            title: 'utilisateur en Standby, veuillez le libérer',
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                          }).then((result) => {}).catch(() => {
                            Swal.fire('opération non aboutie!')
                          }))  
                        }
                                           
                        this.commun.getcurrenttime().then(
                          (data:any) => {
                            if(this.decfiscmens.statutcollab.length>0)
                            {
                                                  //@ts-ignore
                            if(this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll=='traité'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-1].statut=='affecté'
                                                  //@ts-ignore
                            ||this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll=='traité'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-1].statut=='à rectifier'
                                                  //@ts-ignore
                            ||this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll=='traité'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-2].statut=='clôturé'
                            //@ts-ignore
                            ||this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll=='traité'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-2].statut=='en cours de supervision'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-1].statut!='supervisé')
                                                  {
                                                    
                                                    this.decfiscmens.statutadmin.push
                                                    //@ts-ignore
                                                    ({
                                                      statut:'en cours de supervision',
                                                      motif:'',
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
                                                                          //@ts-ignore
                            
                                                  if(this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll=='traité'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-1].statut=='supervisé')
                                                  {
                                                    
                                                    this.decfiscmens.statutadmin.push
                                                    //@ts-ignore
                                                    ({
                                                      statut:'en cours de validation',
                                                      motif:'',
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
                                                                          //@ts-ignore
                                                  if(this.decfiscmens.statutcollab[this.decfiscmens.statutcollab.length-1].statutcoll=='traité'&&this.decfiscmens.statutadmin[this.decfiscmens.statutadmin.length-1].statut=='validé')
                                                  {
                                                    
                                                    this.decfiscmens.statutadmin.push
                                                    //@ts-ignore
                                                    ({
                                                      statut:'en cours de clôture',
                                                      motif:'',
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
                                               
                            
                              if(!this.decfiscmens.dateouverturedossier)
                            {
                              
                              this.decfiscmens.dateouverturedossier=data
                            
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
                        )
                      }
                    )
           
                   
}
)
}
//debutcomptabilite
debutcompteurcomptabilite(link,id)
{

  this.deccompt.getDeccomptabilitereqById(id).then(
    (deccomptabilite: Deccomptabilite) => {
      this.deccomptabilite = deccomptabilite;
      this.dec.geexistenttdecfiscmens(this.deccomptabilite.userId,this.deccomptabilite.annee,this.deccomptabilite.mois).then(
        (decfiscmens: Decfiscmens[]) => {
          if(decfiscmens.length>0)
          {
            this.decfiscmens = decfiscmens[0];
            this.UserService.getUserById(this.deccomptabilite.userId).then(
              (user:User)=>{
                if (user)
                {
                  if(user.standby)
                  return (
                    Swal.fire({
                    title: 'utilisateur en Standby, veuillez le libérer',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                  }).then((result) => {}).catch(() => {
                    Swal.fire('opération non aboutie!')
                  }))  
                }                     
                this.commun.getcurrenttime().then(
                  (data:any) => {
                    if(this.deccomptabilite.statutcollab.length>0)
                    {
                                          //@ts-ignore
                    if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='affecté'
                                          //@ts-ignore
                    ||this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='à rectifier'
                                          //@ts-ignore
                    ||this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-2].statut=='clôturé'
                    //@ts-ignore
                    ||this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-2].statut=='en cours de supervision'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut!='supervisé')
                                          {
                                            
                                            this.deccomptabilite.statutadmin.push
                                            //@ts-ignore
                                            ({
                                              statut:'en cours de supervision',
                                              motif:'',
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
                                          this.decfiscmens.statutadmin.push
                                          //@ts-ignore
                                          ({
                                            statut:'en cours de supervision',
                                            motif:'',
                                            datefin:data,
                                          })                      
                                          this.dec.completedecfiscmensreqById(this.decfiscmens._id,this.decfiscmens).then(
                                            (data:any) => {
                                              this.router.navigate([link + '/' + id]); 
                                            },
                                            (error) => {
                                              this.loading = false;
                                              
                                              window.scrollTo(0, 0);     
                                        }
                                        );
                                          }
                                                                  //@ts-ignore
                    
                                          if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='supervisé')
                                          {
                                            
                                            this.deccomptabilite.statutadmin.push
                                            //@ts-ignore
                                            ({
                                              statut:'en cours de validation',
                                              motif:'',
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
                                          this.decfiscmens.statutadmin.push
                                          //@ts-ignore
                                          ({
                                            statut:'en cours de validation',
                                            motif:'',
                                            datefin:data,
                                          })                      
                                          this.dec.completedecfiscmensreqById(this.decfiscmens._id,this.decfiscmens).then(
                                            (data:any) => {
                                              this.router.navigate([link + '/' + id]); 
                                            },
                                            (error) => {
                                              this.loading = false;
                                              
                                              window.scrollTo(0, 0);     
                                        }
                                        );
                                          }
                                                                  //@ts-ignore
                                          if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='validé')
                                          {
                                            
                                            this.deccomptabilite.statutadmin.push
                                            //@ts-ignore
                                            ({
                                              statut:'en cours de clôture',
                                              motif:'',
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
                                          this.decfiscmens.statutadmin.push
                                          //@ts-ignore
                                          ({
                                            statut:'en cours de clôture',
                                            motif:'',
                                            datefin:data,
                                          })                      
                                          this.dec.completedecfiscmensreqById(this.decfiscmens._id,this.decfiscmens).then(
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
                                       
                    
                      if(!this.deccomptabilite.dateouverturedossier)
                    {
                      
                      this.deccomptabilite.dateouverturedossier=data
                    
                      this.deccompt.completedeccomptabilitereqById(this.deccomptabilite._id,this.deccomptabilite).then(
                        (data:any) => {
                          this.router.navigate([link + '/' + id]); 
                        },
                        (error) => {
                          this.loading = false;
                          
                          window.scrollTo(0, 0);     
                    }
                    );
                    this.decfiscmens.dateouverturedossier=data
                    
                    this.dec.completedecfiscmensreqById(this.decfiscmens._id,this.decfiscmens).then(
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
                )
              }
            )
          }
          else
          {
            this.UserService.getUserById(this.deccomptabilite.userId).then(
              (user:User)=>{
                if (user)
                {
                  if(user.standby)
                  return (
                    Swal.fire({
                    title: 'utilisateur en Standby, veuillez le libérer',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                  }).then((result) => {}).catch(() => {
                    Swal.fire('opération non aboutie!')
                  }))  
                }                     
                this.commun.getcurrenttime().then(
                  (data:any) => {
                    if(this.deccomptabilite.statutcollab.length>0)
                    {
                                          //@ts-ignore
                    if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='affecté'
                                          //@ts-ignore
                    ||this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='à rectifier'
                                          //@ts-ignore
                    ||this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-2].statut=='clôturé'
                    //@ts-ignore
                    ||this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-2].statut=='en cours de supervision'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut!='supervisé')
                                          {
                                            
                                            this.deccomptabilite.statutadmin.push
                                            //@ts-ignore
                                            ({
                                              statut:'en cours de supervision',
                                              motif:'',
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
                                                                  //@ts-ignore
                    
                                          if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='supervisé')
                                          {
                                            
                                            this.deccomptabilite.statutadmin.push
                                            //@ts-ignore
                                            ({
                                              statut:'en cours de validation',
                                              motif:'',
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
                                                                  //@ts-ignore
                                          if(this.deccomptabilite.statutcollab[this.deccomptabilite.statutcollab.length-1].statutcoll=='traité'&&this.deccomptabilite.statutadmin[this.deccomptabilite.statutadmin.length-1].statut=='validé')
                                          {
                                            
                                            this.deccomptabilite.statutadmin.push
                                            //@ts-ignore
                                            ({
                                              statut:'en cours de clôture',
                                              motif:'',
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
                                       
                    
                      if(!this.deccomptabilite.dateouverturedossier)
                    {
                      
                      this.deccomptabilite.dateouverturedossier=data
                    
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
                )
              }
            )
          }
    
        }
      )


     
}
)
}
//debutcompteurcontactreq
debutcontact(link,id)
              {

                this.cont.getContactreqById(id).then(
                  (contact: Contact) => {
                    
                    this.contact = contact;
                    this.commun.getcurrenttime().then(
                      (data:any) => {
                        if(this.contact.statutcollab.length>0)
                        {
                                              //@ts-ignore
                        if(this.contact.statutcollab[this.contact.statutcollab.length-1].statutcoll=='traité'&&this.contact.statutadmin[this.contact.statutadmin.length-1].statut=='affecté'
                                              //@ts-ignore
                        ||this.contact.statutcollab[this.contact.statutcollab.length-1].statutcoll=='traité'&&this.contact.statutadmin[this.contact.statutadmin.length-1].statut=='à rectifier'
                        
                         //@ts-ignore
                         ||this.contact.statutcollab[this.contact.statutcollab.length-1].statutcoll=='traité'&&this.contact.statutadmin[this.contact.statutadmin.length-1].statut=='affecté'&&this.contact.statutadmin[this.contact.statutadmin.length-2].statut=='affecté')
                                              {
                                                
                                                this.contact.statutadmin.push
                                                //@ts-ignore
                                                ({
                                                  statut:'en cours de supervision',
                                                  motif:'',
                                                  datefin:data,
                                                })                      
                                                this.cont.modifycontactreqById(this.contact._id,this.contact).then(
                                                  (data:any) => {
                                                    this.router.navigate([link + '/' + id]); 
                                                  },
                                                  (error) => {
                                                    this.loading = false;
                                                    
                                                    window.scrollTo(0, 0);     
                                              }
                                              );
                                              }
                                                                      //@ts-ignore
                        
                                              if(this.contact.statutcollab[this.contact.statutcollab.length-1].statutcoll=='traité'&&this.contact.statutadmin[this.contact.statutadmin.length-1].statut=='supervisé')
                                              {
                                                
                                                this.contact.statutadmin.push
                                                //@ts-ignore
                                                ({
                                                  statut:'en cours de validation',
                                                  motif:'',
                                                  datefin:data,
                                                })                      
                                                this.cont.modifycontactreqById(this.contact._id,this.contact).then(
                                                  (data:any) => {
                                                    this.router.navigate([link + '/' + id]); 
                                                  },
                                                  (error) => {
                                                    this.loading = false;
                                                    
                                                    window.scrollTo(0, 0);     
                                              }
                                              );
                                              }
                                                                      //@ts-ignore
                                              if(this.contact.statutcollab[this.contact.statutcollab.length-1].statutcoll=='traité'&&this.contact.statutadmin[this.contact.statutadmin.length-1].statut=='validé')
                                              {
                                                
                                                this.contact.statutadmin.push
                                                //@ts-ignore
                                                ({
                                                  statut:'en cours de clôture',
                                                  motif:'',
                                                  datefin:data,
                                                })                      
                                                this.cont.modifycontactreqById(this.contact._id,this.contact).then(
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
                                           
                        
                          if(!this.contact.dateouverturedossier)
                        {
                          
                          this.contact.dateouverturedossier=data
                        
                          this.cont.modifycontactreqById(this.contact._id,this.contact).then(
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
                    )
                   
}
)
}
//debutcompteurcondidate
debutcandidature(link,id)
              {

                this.cond.getCondidateById(id).then(
                  (condidate: Condidate) => {
                    
                    this.condidate = condidate;
                    this.commun.getcurrenttime().then(
                      (data:any) => {
                        if(this.condidate.statutcollab.length>0)
                        {
                          console.log('here')
                                              //@ts-ignore
                        if(this.condidate.statutcollab[this.condidate.statutcollab.length-1].statutcoll=='traité'&&this.condidate.statutadmin[this.condidate.statutadmin.length-1].statut=='affecté'
                                              //@ts-ignore
                        ||this.condidate.statutcollab[this.condidate.statutcollab.length-1].statutcoll=='traité'&&this.condidate.statutadmin[this.condidate.statutadmin.length-1].statut=='à rectifier')
                                              {
                                                
                                                this.condidate.statutadmin.push
                                                //@ts-ignore
                                                ({
                                                  statut:'en cours de supervision',
                                                  motif:'',
                                                  datefin:data,
                                                })                      
                                                this.cond.modifycondidateById(this.condidate._id,this.condidate).then(
                                                  (data:any) => {
                                                    this.router.navigate([link + '/' + id]); 
                                                  },
                                                  (error) => {
                                                    this.loading = false;
                                                    
                                                    window.scrollTo(0, 0);     
                                              }
                                              );
                                              }
                                                                      //@ts-ignore
                        
                                              if(this.condidate.statutcollab[this.condidate.statutcollab.length-1].statutcoll=='traité'&&this.condidate.statutadmin[this.condidate.statutadmin.length-1].statut=='supervisé')
                                              {
                                                
                                                this.condidate.statutadmin.push
                                                //@ts-ignore
                                                ({
                                                  statut:'en cours de validation',
                                                  motif:'',
                                                  datefin:data,
                                                })                      
                                                this.cond.modifycondidateById(this.condidate._id,this.condidate).then(
                                                  (data:any) => {
                                                    this.router.navigate([link + '/' + id]); 
                                                  },
                                                  (error) => {
                                                    this.loading = false;
                                                    
                                                    window.scrollTo(0, 0);     
                                              }
                                              );
                                              }
                                                                      //@ts-ignore
                                              if(this.condidate.statutcollab[this.condidate.statutcollab.length-1].statutcoll=='traité'&&this.condidate.statutadmin[this.condidate.statutadmin.length-1].statut=='validé')
                                              {
                                                
                                                this.condidate.statutadmin.push
                                                //@ts-ignore
                                                ({
                                                  statut:'en cours de clôture',
                                                  motif:'',
                                                  datefin:data,
                                                })                      
                                                this.cond.modifycondidateById(this.condidate._id,this.condidate).then(
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
                                           
                        
                          if(!this.condidate.dateouverturedossier)
                        {
                          console.log('here')
                          this.condidate.dateouverturedossier=data
                        
                          this.cond.modifycondidateById(this.condidate._id,this.condidate).then(
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
                    )
                   
}
)
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
getadmincollabview(link, id){
      
  this.UserService.getUserById(id);
  this.router.navigate([]).then((result) => {
    window.open(link + '/' + id, '_blank');
  });; 
}*/
              getNavigationusers(link, id){
      
                this.UserService.getUserById(id);
                this.router.navigate([link + '/' + id]); 
              }
             /* getNavigationusersdeleted(link, id){
      
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
              }*/
              getallusers() {
                
                this.clienttotal=this.users.length
                return this.users; 
              }
             /* getconnectedusers() {
                let filtred=[]
                filtred=this.deccompt.filterByValue(this.users,'desactive')
                this.utilconnecte=(filtred.filter((filter) => (filter.connected === true))).length
                return filtred.filter((filter) => (filter.connected === true)); 
              }
              getclients() {
                let filtred=[]
                filtred=this.deccompt.filterByValue(this.users,'desactive')
                this.ca=(filtred.filter((filter) => (filter.usertype === 'Client'&&!filter.desactive.statut))).length
                return filtred.filter((filter) => (filter.usertype === 'Client'&&!filter.desactive.statut)); 
              }
              getclientsbloqued() {
                let filtred=[]
                filtred=this.deccompt.filterByValue(this.users,'desactive')
                this.cb=(filtred.filter((user) => user.desactive.statut)).length
                return (filtred.filter((user) => user.desactive.statut));
               
              }
              getcollaborateurs() {
                let filtred=[]
                filtred=this.deccompt.filterByValue(this.users,'desactive')
                this.coll=(filtred.filter((user) => user.usertype === ('Collaborateur'||'collaborateur'))).length
                return filtred.filter((user) => user.usertype === ('Collaborateur'||'collaborateur')); 
              }
              getconsultants() {
                let filtred=[]
                filtred=this.deccompt.filterByValue(this.users,'desactive')
                this.cons=(filtred.filter((user) => user.usertype === ('Consultant'||'consultant'))).length
                return filtred.filter((user) => user.usertype === ('Consultant'||'consultant')); 
              }
              getcondidates() {
                let filtred=[]
                filtred=this.deccompt.filterByValue(this.users,'desactive')
                this.condida=(filtred.filter((user) => user.usertype === 'Candidat')).length
                return filtred.filter((user) => user.usertype === 'Candidat');
              }
              getusersbyfirstname() {
                this.firstname=this.searchForm.get('firstname').value;
                this.UserService.getuserbyfirstname(this.firstname)
                 
              }
              getusersbylastname() {
                this.lastname=this.searchForm.get('lastname').value;
                                this.UserService.getuserbylastname(this.lastname)
                                 
              }
              getusersbyemail() {
                                
                this.email=this.searchForm.get('email').value;
                this.UserService.getuserbyemail(this.email);
                                               
                                                 
              }*/
              getall() {
                                
                                                
                this.UserService.getAll();
                                                               
                                                                 
             }
            /* getdossiersencours()
             {
              this.dossencours1=new Array
              this.getall()
              this.getalldeccomptabilites()
              this.getalldecfiscmenss()
              this.getcondidatesall()
              this.getcontactsall()
              this.decfiscmenss.forEach((item, index) => { 
                if(item.statutadmin.length>0&&item.statutcollab.length>0)
                    {
                             //@ts-ignore                                                            
                      if(item.statutadmin[item.statutadmin.length-1].statut!='clôturé'&&item.affecte)
                      {
                        this.dossencours1.push(item)
                      }
                    }
                 }
                 )
              this.dossdecfiscencours=this.dossencours1.length
              //@ts-ignore                                                            
              this.dossdeccompencours=(this.deccomptabilites.filter((deccomptabilite) => !deccomptabilite.statutadmin.find(e => e.statut==='clôturé')&&deccomptabilite.affecte)).length                                   
              //@ts-ignore                                                            
              this.dosscandencours=(this.condidates.filter((condidate) => !condidate.statutadmin.find(e => e.statut==='clôturé')&&condidate.affecte)).length                                   
              //@ts-ignore                                                            
              this.dosscontactencours=(this.contacts.filter((contact) => !contact.statutadmin.find(e => e.statut==='clôturé')&&contact.affecte)).length                                   
       //@ts-ignore                                                            
              this.dossencours2=((this.deccomptabilites.filter((deccomptabilite) => !deccomptabilite.statutadmin.find(e => e.statut==='clôturé')&&deccomptabilite.affecte)))
       //@ts-ignore                                                            
              this.dossencours3=((this.condidates.filter((condidate) => !condidate.statutadmin.find(e => e.statut==='clôturé')&&condidate.affecte)))
       //@ts-ignore                                                            
              this.dossencours4=((this.contacts.filter((contact) => !contact.statutadmin.find(e => e.statut==='clôturé')&&contact.affecte)))
       this.dossencours=[]
       this.dossencours=this.dossencours.concat(this.dossencours1,this.dossencours2,this.dossencours3,this.dossencours4) 
       const sort = new Sort();
       this.sorteddossencours=this.dossencours.sort(sort.startSort('created','asc','')); 
       
            return (this.sorteddossencours);
             }
             getdossiersencoursnonaffecte()
             {
              this.getall()
              this.getalldeccomptabilites()
              this.getalldecfiscmenss()
              this.getcondidatesall()
              this.getcontactsall()
              this.dossdecfiscnonaffecte=(this.decfiscmenss.filter((decfiscmens) => !decfiscmens.affecte)).length
              this.dossdeccompnonaffecte=(this.deccomptabilites.filter((deccomptabilite) => !deccomptabilite.affecte)).length                                   
              this.dosscandnonaffecte=(this.condidates.filter((condidate) => !condidate.affecte)).length                                   
              this.dosscontactnonaffecte=(this.contacts.filter((contact) => !contact.affecte)).length                                   
       this.dossnonaffecte1=(this.decfiscmenss.filter((decfiscmens) => !decfiscmens.affecte))
       this.dossnonaffecte2=((this.deccomptabilites.filter((deccomptabilite) => !deccomptabilite.affecte)))
       this.dossnonaffecte3=((this.condidates.filter((condidate) => !condidate.affecte)))
       this.dossnonaffecte4=((this.contacts.filter((contact) => !contact.affecte)))
       this.dossnonaffecte=[]
       this.dossnonaffecte=this.dossnonaffecte.concat(this.dossnonaffecte1,this.dossnonaffecte2,this.dossnonaffecte3,this.dossnonaffecte4)
       console.log(this.dossnonaffecte) 
       const sort = new Sort();
       this.sorteddossnonaffecte=this.dossnonaffecte.sort(sort.startSort('created','asc',''));
       console.log(this.dossnonaffecte) 
            return (this.sorteddossnonaffecte);
             }
             getalldecfiscmenss() {
                                
                                                
              this.dec.getdecfiscmenss();
                                                             
                                                               
           } 
           getdecfiscmenssvalide() {
            this.dossencoursvalide=[]
            this.decfiscmenss.forEach((item, index) => { 
              if(item.statutadmin.length>0&&item.statutcollab.length>0)
                  {
            //@ts-ignore                                                            
                    if(item.statutadmin[item.statutadmin.length-1].statut=='clôturé')
                    {
                      this.dossencoursvalide.push(item)
                    }
                  }
               }
               )
            this.decfiscvali=this.dossencoursvalide.length                   
             return this.dossencoursvalide;                                                           
                                                             
         }  
         getdecfiscmenssnonvalide() {
          this.dossencoursnonvalide=[]
          this.decfiscmenss.forEach((item, index) => { 
            if(item.statutadmin.length>0&&item.statutcollab.length>0)
                {
          //@ts-ignore                                                            
                  if(item.statutadmin[item.statutadmin.length-1].statut!='clôturé')
                  {
                    this.dossencoursnonvalide.push(item)
                  }
                }
             }
             )
          this.decfiscnonvali=this.dossencoursnonvalide.length                   
           return this.dossencoursnonvalide;                                                          
                                                           
       } 
           getalldeccomptabilites() {                                   
            this.deccompt.getdeccomptabilites();                                                    
         }
         getdeccomptabilitesvalide() {
                      //@ts-ignore                    
                      
          this.deccomptvalid=(this.deccomptabilites.filter((deccomptabilite) => deccomptabilite.statutadmin.find(e => e.statut==='clôturé'))).length                                      
                      //@ts-ignore                    

          return this.deccomptabilites.filter((deccomptabilite) => deccomptabilite.statutadmin.find(e => e.statut==='clôturé'));                                                           
                                                           
       }  
       getdeccomptabilitesnonvalide() {
                     //@ts-ignore                    
                       
         this.deccompnonval=(this.deccomptabilites.filter((deccomptabilite) => !deccomptabilite.statutadmin.find(e => e.statut==='clôturé')&&deccomptabilite.affecte)).length                                       
                    //@ts-ignore                    

         return this.deccomptabilites.filter((deccomptabilite) => !deccomptabilite.statutadmin.find(e => e.statut==='clôturé')&&deccomptabilite.affecte);                                                           
                                                         
     }                     
             getalldeleted() {
                                
                                                
              this.UserService.getAlldeleted();
              this.del=this.usersdeleted.length                                              
                                                               
           } 
              getcondidatesbyemail() {
                                                                                
                this.email=this.searchForm.get('email').value;
                this.cond.getCondidate(this.email);
                                                                                                
                                                                                                 
             }
              getcondidatesall() {
                                                                                
                                                          
                this.cond.getCondidates();
                                                                                                                
                                                                                                                 
             }
             getcondidatevalide() {
                           //@ts-ignore                    
                 
               this.condval=(this.condidates.filter((condidate) => condidate.statutadmin.find(e => e.statut==='clôturé'))).length                                 
                          //@ts-ignore                    

               return this.condidates.filter((condidate) => condidate.statutadmin.find(e => e.statut==='clôturé'));                                                           
                                                               
           }
           getcondidatenonvalide() {
                         //@ts-ignore                    
                   
             this.condnonal=(this.condidates.filter((condidate) => !condidate.statutadmin.find(e => e.statut==='clôturé')&&condidate.affecte)).length                                   
                        //@ts-ignore                    

             return this.condidates.filter((condidate) => !condidate.statutadmin.find(e => e.statut==='clôturé')&&condidate.affecte);                                                           
                                                             
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
           getcontactvalide() {
                         //@ts-ignore                    
                   
             this.contval=(this.contacts.filter((contact) => contact.statutadmin.find(e => e.statut==='clôturé'))).length                                   
                        //@ts-ignore                    

             return this.contacts.filter((contact) => contact.statutadmin.find(e => e.statut==='clôturé'));                                                           
                                                             
         }
         getcontactnonvalide() {
                      //@ts-ignore                    
                      
          this.contnonval=(this.contacts.filter((contact) => !contact.statutadmin.find(e => e.statut==='clôturé')&&contact.affecte)).length                                      
                      //@ts-ignore                    

          return this.contacts.filter((contact) => !contact.statutadmin.find(e => e.statut==='clôturé')&&contact.affecte);                                                           
                                                           
       }*/
           exportusersAsXLSX(source:any[],name:string):void {
            this.excelService.exportAsExcel(source, name);
          }
          onTabClick(event) {
   
          }
          click1()
          {
            this.showdallusers=true
          }
          click2()
          {
            this.showdallusers=false
          }
        /*  click3()
          {
         this.clientsupptemporairement=true   
          }
          click4()
          {
            this.collaborateurs=true
          }
          click5()
          {
            this.consultants=true
          }
          click6()
          {
            this.candidat=true
          }
          click7()
          {
            this.decfiscmensvalide=true
          }
          click8()
          {
            this.decfiscmensnonvalide=true
          }
          click9()
          {
            this.deccomptabilitevalide=true
          }
          click10()
          {
            this.deccomptabilitenonvalide=true
          }
          click11()
          {
            this.candidaturevalide=true
          }
          click12()
          {
            this.candidaturenonvalide=true
          }
          click13()
          {
            this.reclamationtraite=true
          }
          click14()
          {
            this.reclamationnontraite=true
          }
          click29()
          {
            this.showdossencours=true
          }
          click30()
          {
            this.showdosspasencoreaffecte=true
          }
          click15()
          {
this.clientactif=false
          }
          click16()
          {
      this.clientbloque=false      
          }
          click17()
          {
         this.clientsupptemporairement=false   
          }
          click18()
          {
            this.collaborateurs=false
          }
          click19()
          {
            this.consultants=false
          }
          click20()
          {
            this.candidat=false
          }
          click21()
          {
            this.decfiscmensvalide=false
          }
          click22()
          {
            this.decfiscmensnonvalide=false
          }
          click23()
          {
            this.deccomptabilitevalide=false
          }
          click24()
          {
            this.deccomptabilitenonvalide=false
          }
          click25()
          {
            this.candidaturevalide=false
          }
          click26()
          {
            this.candidaturenonvalide=false
          }
          click27()
          {
            this.reclamationtraite=false
          }
          click28()
          {
            this.reclamationnontraite=false
          }
          click31()
          {
            this.showdossencours=false
          }
          click32()
          {
            this.showdosspasencoreaffecte=false
          }
          click33()
          {
            this.showdallusers=true
          }
          click34()
          {
            this.showdallusers=false
          }
          click35()
          {
            this.showconnected=true
          }
          click36()
          {
            this.showconnected=false
          }*/
          
}
  
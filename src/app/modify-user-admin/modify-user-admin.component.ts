import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Subscription } from 'rxjs';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertService } from '../_helpers/alert.service';
import Swal from 'sweetalert2';
import { Deccomptabilite } from '../models/dec-comptabilite';
import { element } from 'protractor';
@Component({
  selector: 'app-modify-user-admin',
  templateUrl: './modify-user-admin.component.html',
  styleUrls: ['./modify-user-admin.component.scss']
})

export class ModifyUserAdminComponent implements OnInit {
  public userForm: FormGroup;
  public users: User[]=[];
  public type: any[]=["recette journaliere","edition note honoraire","achat","releve manuel","releve attache","salaires"];
  public taux: any[]=["7","13","19","export","suspension"];
  public fournisseurs: any[]=[];
  public natures: any[]=[];
  public clients: any[]=[];
  public numeros: any[]=[];
  public banques: any[]=[];
  public naturemanuel: any[]=[];
  public codeValue: string;
  public secteurValue: string;
  public roleValue: string;
  public user: User;
  public loading = false;
  private usersSub: Subscription;
  errormsg:string;
  editionnoteform: FormGroup;
  releveform: FormGroup;
  recetteform: FormGroup;
  achatform: FormGroup;
  ammounts:FormArray
  ammounts1:FormArray
  ammounts2:FormArray
  ammounts3:FormArray
  ammounts4:FormArray
  selected: any;
  token: any;
  deccomptabilitesSub: Subscription;
  deccomptabilites: import("../models/dec-comptabilite").Deccomptabilite[];
  settedclients: any[];
  settednatures: any[];
  settedfournisseurs: any[];
  settednumeros: any[];
  settedbanques: any[];
  settednaturereleve: any[];
  objetsdebit: any[]=[];
  objetscredit: any[]=[];
  settedobjetsdebit: any[];
  settedobjetscredit: any[];
  settedobjets:any[]=[];
  ammounts5: FormArray;
  ammounts6: FormArray;
  uploadFiles: File[]=[];
  constructor(private formBuilder: FormBuilder,
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alertService: AlertService) {
      this.editionnoteform = this.formBuilder.group({
        journal:'',
        cptedt:'',
        ammounts: this.formBuilder.array([ this.createammount() ]),
        ammounts1: this.formBuilder.array([ this.createammount1() ])
     });
     this.recetteform = this.formBuilder.group({
      journal:'',
      cptedt:'',
      ammounts2: this.formBuilder.array([ this.createammount2() ])
   });
   this.achatform = this.formBuilder.group({
    journal:'',
    cptedt:'',
    cptetva:'',
    ammounts3: this.formBuilder.array([ this.createammount3() ]),
    ammounts4: this.formBuilder.array([ this.createammount4() ])
 });
 this.releveform = this.formBuilder.group({
  ammounts5: this.formBuilder.array([ this.createammount5() ]),
  ammounts6: this.formBuilder.array([ this.createammount6() ]),
});
    }
  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.userservice.getUserById(params.id).then(
          (user: User) => {
            this.user = user; 
/*this.deccomptabilitesSub = this.deccompt.deccomptabilites$.subscribe(
  (deccomptabilites) => {
    this.deccomptabilites = deccomptabilites;
    //@ts-ignore
this.deccomptabilites.forEach(element => element.autre4.forEach(e => e.mouvements.forEach(item => (this.clients.push({cl:item.client})))))
this.deccomptabilites.forEach(element => element.autre1.forEach(e => (this.clients.push({cl:e.client}))))
//@ts-ignore
this.deccomptabilites.forEach(element => element.autre4.forEach(e => e.mouvements.forEach(item => (this.fournisseurs.push({four:item.fournisseur})))))
this.deccomptabilites.forEach(element => element.autre3.forEach(e => (this.fournisseurs.push({four:e.fournisseur}),this.natures.push({nat:e.natureachat}))))
this.deccomptabilites.forEach(element => element.autre4.forEach(e => (this.numeros.push({num:e.numerocompte}))))
this.deccomptabilites.forEach(element => element.autre4.forEach(e => (this.banques.push({bq:e.banque}))))
//@ts-ignore
this.deccomptabilites.forEach(element => element.autre4.forEach(e => e.mouvements.forEach(item => (item.contientauxiliaire!=true?(this.objetsdebit.push(item.objetdebit),this.objetscredit.push(item.objetcredit)):''))))    
this.loading = false;


    this.settedclients= this.clients.filter((obj, index) => {
      return index === this.clients.findIndex(o => obj.cl === o.cl);
    });
    this.settednatures= this.natures.filter((obj, index) => {
      return index === this.natures.findIndex(o => obj.nat === o.nat);
    });
    this.settedfournisseurs=this.fournisseurs.filter((obj, index) => {
      return index === this.fournisseurs.findIndex(o => obj.four === o.four);
    });
    this.settednumeros=this.numeros.filter((obj, index) => {
      return index === this.numeros.findIndex(o => obj.num === o.num);
    });
    this.settedbanques=this.banques.filter((obj, index) => {
      return index === this.banques.findIndex(o => obj.bq === o.bq);
    });
    this.settedobjetsdebit=this.objetsdebit.filter((obj, index) => {
      return index === this.objetsdebit.findIndex(o => obj === o);
    });
    this.settedobjetscredit=this.objetscredit.filter((obj, index) => {
      return index === this.objetscredit.findIndex(o => obj === o);
    });
    this.settedobjets=this.settedobjets.concat(this.settedobjetscredit,this.settedobjetsdebit)
  },
  (error) => {
    this.loading = false;
    this.errormsg=error.message;
  }
);
this.deccompt.getdeccomptabilite(user._id)*/
            this.userForm = this.formBuilder.group({
              role: [this.user.role, Validators.required],
            
              firstname: [this.user.firstname, Validators.required],
              lastname: [this.user.lastname, Validators.required],
              confirmemail: [null,],
              mobile: [this.user.mobile,],
              confirmmobile: [null,],
              usertype: [this.user.usertype,],
              nature: [this.user.nature,],
              email: [this.user.email, Validators.required],
              password: [this.user.password, Validators.required],
              civilite: [this.user.civilite, Validators.required],
              raisonsociale: [this.user.raisonsociale, Validators.required],
              clientcode: [{value:this.user.clientcode,disabled:true}, Validators.required],
            },
            {
              validator: [MustMatch('email','confirmemail'),MustMatch('mobile','confirmmobile')]
            });
            this.loading = false;
          
          }
        );
      }
    );                                                   
    this.usersSub = this.userservice.users$.subscribe(
      (users) => {
        this.users = users;
        this.loading = false;
        
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.errormsg=error.message;
      }
    );

    this.userservice.getAll();
    /*this.createrelevemanuelForm();

    // Direct patching does not patch nested arrays
    this.patchValuesDirectly();

    //Correct way
    this.patchValueIteratively();*/
  }
  /*createrelevemanuelForm() {
    this.releveform = this.formBuilder.group({
      employees: this.formBuilder.array([this.newEmployee()]),
    });
  }
  patchValuesDirectly() {
    this.deccompt.autre4.map(item => { 
      console.log(item)   
      //@ts-ignore
      this.relevemanuelform.patchValue(
        {
          type:item.type,
          banque:item.banque,
          numerocompte:item.numerocompte,
          debit:item.soldedebit,
          credit:item.soldecredit,
          skills:item.mouvements
        }
      )});
    console.log(this.relevemanuelform.value);
  }
  patchValueIteratively() {
    let autre4 = this.deccomptabilite.autre4;
    (this.relevemanuelform.get('employees') as FormArray).clear(); //Removing initial item b/c you are creating form array with 1 initial value
    autre4.forEach((car) => {
      const vehicleForm = this.newEmployee();
      vehicleForm.patchValue({
                        
        type:car.type,
        banque:car.banque,
        numerocompte:car.numerocompte,
        debit:car.soldedebit,
        credit:car.soldecredit,
        skills:car.mouvements
      });
      //Create Cars FormArray individually & patch the value
      (vehicleForm.get('skills') as FormArray).clear(); //Initially blank
      car.mouvements.forEach((item) => {
        const carForm = this.newSkill();
        carForm.patchValue(item);
        
        (vehicleForm.get('skills') as FormArray).push(carForm);
        this.totaldebitbis = +(vehicleForm.get('skills').value).reduce((acc,curr)=>{
          acc += +(curr.debit || 0);
          return acc;
        },0);
        this.totalcreditbis = +(vehicleForm.get('skills').value).reduce((acc,curr)=>{
          acc += +(curr.credit || 0);
          return acc;
        },0);    });
      (this.relevemanuelform.get('employees') as FormArray).push(vehicleForm);
    });
    console.log(this.relevemanuelform.value);
  }*/
  onTabClick(event) {
   
  }
  verifyfutur(e,i)
  {
    /*let ammounts = this.editionnoteform.get('ammounts') as FormArray;
    let ammountssliced=ammounts.getRawValue().slice(0,-1)
    if(ammounts.controls[i].get('type').value=='recette journaliere')
    {
      ammounts.controls[i].get('cptedt').disable()
      ammounts.controls[i].get('cptedtdebit').disable()
      ammounts.controls[i].get('fournisseur').disable()
      ammounts.controls[i].get('natureachat').disable()
      ammounts.controls[i].get('client').disable()
    }
    if(ammounts.controls[i].get('type').value=='edition note honoraire')
    {
      ammounts.controls[i].get('fournisseur').disable()
      ammounts.controls[i].get('natureachat').disable()
    }
    if(ammounts.controls[i].get('type').value=='achat')
    {
      ammounts.controls[i].get('client').disable()
      ammounts.controls[i].get('taux').disable()
    }
    this.userservice.getUserById(this.user._id).then(
      (data:User) => { 
        if(data.paramcomptable)
        {
            if(ammounts.length>1&&ammounts.controls[i].get('type').value=='recette journaliere')
            {
              console.log(ammounts.controls[i].get('type').value)
              console.log(ammounts.controls[i].get('taux').value)
//@ts-ignore
if(data.paramcomptable.find((element =>element.type === ammounts.controls[i].get('type').value&&element.taux === ammounts.controls[i].get('taux').value))
//@ts-ignore
||ammountssliced.find((element =>element.type === ammounts.controls[i].get('type').value&&element.taux === ammounts.controls[i].get('taux').value)))
return (
  Swal.fire({
  title: 'vous ne pouvez pas choisir un type déjà parametré',
  icon: 'error',
  confirmButtonColor: '#3085d6',
}).then((result) => {this.removeammount(i)
}).catch(() => {
  Swal.fire('opération non aboutie!')
})) 
            } 
            if(ammounts.length>1&&ammounts.controls[i].get('type').value=='edition note honoraire')
            {
              console.log(ammounts.value)
//@ts-ignore
if(data.paramcomptable.find((element =>element.type === ammounts.controls[i].get('type').value &&element.client === ammounts.controls[i].get('client').value&&element.taux === ammounts.controls[i].get('taux').value))
||ammountssliced.find((element =>element.type === ammounts.controls[i].get('type').value&&element.client === ammounts.controls[i].get('client').value&&element.taux === ammounts.controls[i].get('taux').value)))
return (
  Swal.fire({
  title: 'vous ne pouvez pas choisir un type déjà parametré',
  icon: 'error',
  confirmButtonColor: '#3085d6',
}).then((result) => {this.removeammount(i)
}).catch(() => {
  Swal.fire('opération non aboutie!')
})) 
            } 
            if(ammounts.length>1&&ammounts.controls[i].get('type').value=='achat')
            {
              console.log(ammounts.value)
//@ts-ignore
if(data.paramcomptable.find((element =>element.type === ammounts.controls[i].get('type').value&&element.fournisseur === ammounts.controls[i].get('fournisseur').value&&element.nature === ammounts.controls[i].get('natureachat').value&&element.taux === ammounts.controls[i].get('taux').value))
||ammountssliced.find((element =>element.type === ammounts.controls[i].get('type').value&&element.fournisseur === ammounts.controls[i].get('fournisseur').value&&element.nature === ammounts.controls[i].get('natureachat').value&&element.taux === ammounts.controls[i].get('taux').value)))
return (
  Swal.fire({
  title: 'vous ne pouvez pas choisir un type déjà parametré',
  icon: 'error',
  confirmButtonColor: '#3085d6',
}).then((result) => {this.removeammount(i)
}).catch(() => {
  Swal.fire('opération non aboutie!')
})) 
            } 
        }    
      }  
    )*/
  }
  get ammountControls() {
    return this.editionnoteform.get('ammounts')['controls'];
  }
  get ammountControls1() {
    return this.editionnoteform.get('ammounts1')['controls'];
  }
  get ammountControls2() {
    return this.recetteform.get('ammounts2')['controls'];
  }
  get ammountControls3() {
    return this.achatform.get('ammounts3')['controls'];
  }
  get ammountControls4() {
    return this.achatform.get('ammounts4')['controls'];
  }
  get ammountControls5() {
    return this.releveform.get('ammounts5')['controls'];
  }
  get ammountControls6() {
    return this.releveform.get('ammounts6')['controls'];
  }
  createammount(): FormGroup {
    return this.formBuilder.group({
      taux: '', 
      cpteht: '',
      cptetva: '',
    });
  }
  createammount1(): FormGroup {
    return this.formBuilder.group({
      client:'',
      cptettc: '',
    });
  }
  createammount2(): FormGroup {
    return this.formBuilder.group({
      taux: '',
      cpteht: '',
      cptetva: '', 
      cptettc: '',     
    });
  }
  createammount3(): FormGroup {
    return this.formBuilder.group({ 
      fournisseur:'',
      cptettc: '',
    });
  }
  createammount4(): FormGroup {
    return this.formBuilder.group({ 
      natureachat:'',
      cpteht: '',
    });
  }
  createammount5(): FormGroup {
    return this.formBuilder.group({
      banque:'',
      numerocompte: '',
      cpte: '',
      journalmanuel: '',
    });
  }
  createammount6(): FormGroup {
    return this.formBuilder.group({
      objet:'',
      cpte: '',
    });
  }
 
  addammount(): void {
    this.ammounts = this.editionnoteform.get('ammounts') as FormArray;
    this.ammounts.push(this.createammount());
  }
  addammount1(): void {
    this.ammounts1 = this.editionnoteform.get('ammounts1') as FormArray;
    this.ammounts1.push(this.createammount1());
  }
  addammount2(): void {
    this.ammounts2 = this.recetteform.get('ammounts2') as FormArray;
    this.ammounts2.push(this.createammount2());
  }
  addammount3(): void {
    this.ammounts3 = this.achatform.get('ammounts3') as FormArray;
    this.ammounts3.push(this.createammount3());
  }
  addammount4(): void {
    this.ammounts4 = this.achatform.get('ammounts4') as FormArray;
    this.ammounts4.push(this.createammount4());
  }
  addammount5(): void {
    this.ammounts5 = this.releveform.get('ammounts5') as FormArray;
    this.ammounts5.push(this.createammount5());
  }
  addammount6(): void {
    this.ammounts6 = this.releveform.get('ammounts6') as FormArray;
    this.ammounts6.push(this.createammount6());
  }
  removeammount(i: number) {
    this.ammounts = this.editionnoteform.get('ammounts') as FormArray;
    this.ammounts.removeAt(i);
  }
  removeammount1(i: number) {
    this.ammounts1 = this.editionnoteform.get('ammounts1') as FormArray;
    this.ammounts1.removeAt(i);
  }
  removeammount2(i: number) {
    this.ammounts2 = this.recetteform.get('ammounts2') as FormArray;
    this.ammounts2.removeAt(i);
  }
  removeammount3(i: number) {
    this.ammounts3 = this.achatform.get('ammounts3') as FormArray;
    this.ammounts3.removeAt(i);
  }
  removeammount4(i: number) {
    this.ammounts4 = this.achatform.get('ammounts4') as FormArray;
    this.ammounts4.removeAt(i);
  }
  removeammount5(i: number) {
    this.ammounts5 = this.releveform.get('ammounts5') as FormArray;
    this.ammounts5.removeAt(i);
  }
  removeammount6(i: number) {
    this.ammounts6 = this.releveform.get('ammounts6') as FormArray;
    this.ammounts6.removeAt(i);
  }
  saveparam() {
  this.loading = true;
  const user = new User();
  user.userId = this.user._id;
  this.userservice.completeUserById(user.userId,user,this.uploadFiles).then(
    (data:any) => {
          this.loading = false;
          this.reloadPage()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'paramêtrage ajouté avec succès!',
            showConfirmButton: false,
            timer: 6000 
          });
        },
        (error) => {
          this.loading = false;   
        }
      )
  }
  onSubmit() {
    this.loading = true;
    const user = new User();
    user.userId = this.user._id;
    user.role = this.userForm.get('role').value;
    user.email = this.userForm.get('email').value;
    user.password =this.userForm.get('password').value;
    user.firstname = this.userForm.get('firstname').value;
    user.mobile = this.userForm.get('mobile').value;
    user.usertype =this.userForm.get('usertype').value;
    user.nature =this.userForm.get('nature').value;

    user.lastname = this.userForm.get('lastname').value;

    user.civilite = this.userForm.get('civilite').value;
    user.raisonsociale = this.userForm.get('raisonsociale').value;
    user.clientcode = this.userForm.get('clientcode').value;
    this.userservice.completeUserById(user.userId,user,this.uploadFiles).then(
      (data:any) => {
        this.userForm.reset();
        this.loading = false;
        this.router.navigate(['admin-board']);
      },
      (error) => {
        this.loading = false;    
      }
    );
  }
  myFunction2() {
    var checkbox:any = document.getElementById("myCheck2");
    var text2 = document.getElementById("bodycontainer2");
    var text3 = document.getElementById("modifadmin");
    if (checkbox.checked == true)
    {
      text3.style.display = "none";
      text2.style.display = "block";
      this.userservice.getUserById(this.user._id).then(
        (user:User)=>
        {
          console.log(this.settedclients)
          console.log(this.settedfournisseurs)
          console.log(this.settednatures)

          this.editionnoteform = this.formBuilder.group({ 
            //@ts-ignore
            journal: [user.paramcomptable[0]?user.paramcomptable[0].journalnote:''],
            //@ts-ignore
            cptedt: [user.paramcomptable[0]?user.paramcomptable[0].cptetimbrefiscalnote:''], 
            //@ts-ignore
            ammounts: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptestvanote.map((item,index) => {
              const group = this.createammount();
              //@ts-ignore
              group.patchValue(item);
              return group;
            }):[]),
            //@ts-ignore
ammounts1: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptesttcnote.map((item,index) => {
  const group = this.createammount1();
  //@ts-ignore
  group.patchValue(item);
  return group;
            }):
            this.settedclients.map((item,index) => {
              const group = this.createammount1();
              //@ts-ignore
              group.patchValue(
                {
                  client:item.cl,
                  cptettc:''
                }
              );
              return group;
            }))
          });
         /* user.paramcomptable[0]?this.settedclients.map((el,index) => {
            let ammounts1 = this.editionnoteform.get('ammounts1') as FormArray;
                          //@ts-ignore
            if(user.paramcomptable[0].comptesttcnote.find(element=>element.client==el.cl)==undefined)
            {
              const group = this.createammount1();
              //@ts-ignore
              group.patchValue(
                {
                  client:el.cl,
                  cptettc:''
                }
              );
ammounts1.push(group)            
}
          }
          ):[];*/



          this.releveform = this.formBuilder.group({
            //@ts-ignore
            journal: [user.paramcomptable[0]?user.paramcomptable[0].journalmanuel:''],  
            //@ts-ignore
            ammounts5: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptesmanuelcompte.map((item,index) => {
              const group = this.createammount5();
              //@ts-ignore
              group.patchValue({
                banque:this.settedbanques[index].bq,
                numerocompte:item.numerocompte,
                cpte:item.cpte,
              });
              return group;
            }):
            this.settednumeros.map((item,index) => {
              const group = this.createammount5();
              //@ts-ignore
              group.patchValue(
                {
                  banque:this.settedbanques[index].bq,
                  numerocompte:item.num,
                  cpte:'',
                }
              );
              return group;
            })
            ),
                          //@ts-ignore
ammounts6: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptesmanuelobjets.map((item,index) => {
                            const group = this.createammount6();
                            //@ts-ignore
                            group.patchValue(item);
                            console.log(item)
                            return group;
                                      }):
                        this.settedobjets.map((item,index) => {
                          const group4 = this.createammount6();
                          console.log(item)
                          //@ts-ignore
                          group4.patchValue(
                            {
                              objet:item,
                              cpte:'',
                            }
                          );
                          return group4;
                        })
                        )
          });
        /*  user.paramcomptable[0]?this.settednumeros.map((el,index) => {
            let ammounts5 = this.releveform.get('ammounts5') as FormArray;
                          //@ts-ignore
            if(user.paramcomptable[0].comptesmanuelcompte.find(element=>element.numerocompte==el.num)==undefined)
            {
              const group = this.createammount5();
              console.log(this.settedbanques[index].bq)
              //@ts-ignore
              group.patchValue(
                {
                  banque:this.settedbanques[index].bq,
                  numerocompte:el.num,
                  cpte:'',
                }
              );
ammounts5.push(group)            
}
          }
          ):[];*/
       /*   user.paramcomptable[0]?this.settedobjets.map((el,index) => {
            let ammounts6 = this.releveform.get('ammounts6') as FormArray;
                          //@ts-ignore
            if(user.paramcomptable[0].comptesmanuelobjets.find(element=>element.objet==el)==undefined)
            {
              console.log(el)

              const group = this.createammount6();
              //@ts-ignore
              group.patchValue(
                {
                  objet:el,
                  cpte:'',
                }
              );
ammounts6.push(group)            
}
          }
          ):[];*/


          /*this.releveform = this.formBuilder.group({ 
            //@ts-ignore
            journal: [user.paramcomptable[0]?user.paramcomptable[0].journalmanuel:''],
            //@ts-ignore
            ammounts5: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptesmanuelcompte.map((item,index) => {
              const group = this.createammount5();
              //@ts-ignore
              group.patchValue(item);
              return group;
            }):
            this.settednumeros.map((item,index) => {
              const group = this.createammount5();
              //@ts-ignore
              group.patchValue(
                {
                  numerocompte:item.num,
                  cptedebit:'',
                  cptecredit:''

                }
              );
              return group;
            })
            ),
            //@ts-ignore
ammounts6: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptesmanuelnatures.map((item,index) => {
  const group = this.createammount6();
  //@ts-ignore
  group.patchValue(item);
  return group;
            }):
            this.settednumeros.map((item,index) => {
              const group = this.createammount5();
              //@ts-ignore
              group.patchValue(
                {
                  numerocompte:item.num,
                  cptedebit:'',
                  cptecredit:''

                }
              );
              return group;
            }))
          });
          user.paramcomptable[0]?this.settednaturereleve.map((el,index) => {
            let ammounts6 = this.releveform.get('ammounts6') as FormArray;
                          //@ts-ignore
            if(user.paramcomptable[0].comptesmanuelnatures.find(element=>element.nature==el.natman)==undefined)
            {
              const group = this.createammount6();
              //@ts-ignore
              group.patchValue(
                {
                  nature:el.natman,
                  cptedebit:'',
                  cptecredit:''
                }
              );
ammounts6.push(group)            
}
          }
          ):[];*/


          this.recetteform = this.formBuilder.group({
            //@ts-ignore
            journal: [user.paramcomptable[0]?user.paramcomptable[0].journalrecette:''],
            //@ts-ignore
            cptedt: [user.paramcomptable[0]?user.paramcomptable[0].cptetimbrefiscalrecette:''],
            //@ts-ignore
            cptettc: [user.paramcomptable[0]?user.paramcomptable[0].cptettc:''],
            //@ts-ignore  
            ammounts2: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptestvarecette.map((item,index) => {
              const group2 = this.createammount2();
              //@ts-ignore
              group2.patchValue(item);
              return group2;
            }):[])
          });
          this.achatform = this.formBuilder.group({
            //@ts-ignore
            journal: [user.paramcomptable[0]?user.paramcomptable[0].journalachat:''],
            //@ts-ignore
            cptedt: [user.paramcomptable[0]?user.paramcomptable[0].cptetimbrefiscalachat:''],
            //@ts-ignore
            cptetva: user.paramcomptable[0]?user.paramcomptable[0].comptetvaachat:'',   
                      //@ts-ignore
ammounts3: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].comptesttcachat.map((item,index) => {
  const group3 = this.createammount3();
  //@ts-ignore
  group3.patchValue(item);
  return group3;
            }):
            this.settedfournisseurs.map((item,index) => {
              const group3 = this.createammount3();
              //@ts-ignore
              group3.patchValue(
                {
                  fournisseur:item.four,
                  cptettc:''
                }
              );
              return group3;
            })),
                          //@ts-ignore
            ammounts4: new FormArray(user.paramcomptable[0]?user.paramcomptable[0].compteshtachat.map((item,index) => {
              const group4 = this.createammount4();
              //@ts-ignore
              group4.patchValue(item);
              return group4;
                        }):
                        this.settednatures.map((item,index) => {
                          const group4 = this.createammount4();
                          //@ts-ignore
                          group4.patchValue(
                            {
                              natureachat:item.nat,
                              cpteht:''
                            }
                          );
                          return group4;
                        }))
          });
         /* user.paramcomptable[0]?this.settedfournisseurs.map((el,index) => {
            let ammounts3 = this.achatform.get('ammounts3') as FormArray;
                          //@ts-ignore
            if(user.paramcomptable[0].comptesttcachat.find(element=>element.fournisseur==el.four)==undefined)
            {
              const group3 = this.createammount3();
              //@ts-ignore
              group3.patchValue(
                {
                  fournisseur:el.four,
                  cptettc:''
                }
              );
ammounts3.push(group3)
            }
          }
          ):[];
          user.paramcomptable[0]?this.settednatures.map((el,index) => {
            let ammounts4 = this.achatform.get('ammounts4') as FormArray;
                          //@ts-ignore
            if(user.paramcomptable[0].compteshtachat.find(element=>element.natureachat==el.nat)==undefined)
            {
              const group4 = this.createammount4();
              //@ts-ignore
              group4.patchValue(
                {
                  natureachat:el.nat,
                  cpteht:''
                }
              );
ammounts4.push(group4)
            }
          }
          ):[];*/
        }
      )
    } 
    else 
    {
      text3.style.display = "block";
      text2.style.display = "none";
      
    }
  }
  reloadPage(): void {
    
    window.location.reload();
    
  }
  
  
  
}
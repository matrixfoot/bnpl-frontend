import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Carouselmodel } from '../models/settings';
import { CarouselService } from '../services/settings';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { read, utils } from "xlsx"
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { compconfService } from '../services/compconf.service';
import { User } from '../models/user.model';
import { Compconf } from '../models/compconf.model';
import { CommunService } from '../services/commun';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentUser: any;
   loading=false;
  public carousels: Carouselmodel[] = [];
  private carouselsSub: Subscription;
  carouselform: FormGroup;
  smsform: FormGroup;

  public imagePreview: string;
  fileUploaded = false;
  file: any;
  uploadEvent: any;
  arrayBuffer: string | ArrayBuffer;
  exceljsondata: Event[];
  exceljsondata2: User[];
  tarifform: FormGroup;
  public ammounts: FormArray;
  public type: any[]=["Tarif de base","Tarif spécial"];
  nature: any[];
  natureactivite: any[];
  activite: any[];
  sousactivite: any[];
  regimeimpot: any[];
  actualites: Carouselmodel[];
  tarifs: Carouselmodel[];
  compconfsSub: Subscription;
  compconfs: Compconf[];
  habilitationform: any;
  constructor(private token: TokenStorageService,private carousel:CarouselService,private compconfservice: compconfService,private userservice: UserService,
   private formBuilder: FormBuilder,private commun: CommunService,
    private router: Router,) {
      this.habilitationform = this.formBuilder.group({
        ammounts: this.formBuilder.array([ this.createammount() ])
     });
     }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.nature=this.commun.nature
    this.natureactivite=this.commun.natureactivite
    this.activite=this.commun.activites
    this.sousactivite=this.commun.sousactivites
    this.regimeimpot=this.commun.regimeimpot
    /*this.carouselsSub = this.carousel.carousels$.subscribe(
      (carousels) => {
        this.carousels = carousels;
        this.actualites=this.carousels.filter(p => p.tarifs.length==0)
        this.tarifs=this.carousels.filter(p => p.tarifs.length>0)
        console.log(this.tarifs)
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        
      }
    );
    
      this.carousel.getCarouselalldata();*/
     /* this.compconfsSub = this.compconfservice.compconfs$.subscribe(
        (compconfs) => {
          this.compconfs = compconfs;
          console.log(this.compconfs)
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          
        }
      );
      
        this.compconfservice.getcompconfs();*/
    

   /* this.carouselform = this.formBuilder.group({
      titre: [''],
      rang: [''],
      commentaire: [''],
      description: [''],
      
      image: [null]
      
    });
    this.smsform = this.formBuilder.group({
    
      description: [''],
  
    });*/
  }
  createammount(): FormGroup {
    return this.formBuilder.group({
      id:  [ {value:1, disabled: true},Validators.required],
      intitule: '',
    });
  }
  get f() { return this.carouselform.controls; }
  get ammountControls() {
    return this.habilitationform.get('ammounts')['controls'];
  }
  addammount(){
    this.ammounts = this.habilitationform.get('ammounts') as FormArray;
    const i=this.ammounts.length
    this.ammounts.push(this.createammount());
      this.ammounts.at(i).patchValue({
        id:(this.ammounts.getRawValue()[i-1].id)+1,
       })
      }  
      removeammount(i: number) {
        this.ammounts = this.habilitationform.get('ammounts') as FormArray;
        this.ammounts.removeAt(i);
      }      
  
  setThreeNumberDecimal($event) {
    $event.target.value = $event.target.value ? $event.target.value : 0;
    $event.target.value = parseFloat($event.target.value).toFixed(3);
  }
  sort()
  {
    this.nature.sort()
    this.natureactivite.sort()
    this.activite.sort()
    this.sousactivite.sort()
    this.regimeimpot.sort()
  }
  saveactualite() {
    this.loading = true;
   
    const carousel = new Carouselmodel();
  carousel.titre = this.carouselform.get('titre').value;
    
  carousel.commentaire = this.carouselform.get('commentaire').value;
    
  carousel.description = this.carouselform.get('description').value;
  carousel.rang = this.carouselform.get('rang').value;

    
    carousel.ficheUrl = '';
   if(this.carouselform.get('image').value==null) 
   {
    
      this.carousel.createwithoutfile(carousel).then(
        (data:any) => {
          this.carouselform.reset();
          this.loading = false;
          this.reloadPage()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'actualité ajoutée avec succès!',
            showConfirmButton: false,
            timer: 6000 
          });
        },
        (error) => {
          this.loading = false;
          
        }
      )
    
   
   }
  else
  {
    this.carousel.create(carousel, this.carouselform.get('image').value).then(
      (data:any) => {
        this.carouselform.reset();
        this.loading = false;
        this.reloadPage()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'actualité ajoutée avec succès!',
          showConfirmButton: false,
          timer: 6000 
        });
      },
      (error) => {
        this.loading = false;
        
      }
    );
  }
  }
  savetarif() {
    this.loading = true;
   
    const carousel = new Carouselmodel();
  carousel.tarifs =[];
  carousel.tarifs=this.tarifform.get('ammounts').value
      this.carousel.createwithoutfile(carousel).then(
        (data:any) => {
          this.carouselform.reset();
          this.loading = false;
          this.reloadPage()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'tarifs ajoutée avec succès!',
            showConfirmButton: false,
            timer: 6000 
          });
        },
        (error) => {
          this.loading = false;
          
        }
      )
  }
  sendsms() {
    this.loading = true;

      this.compconfservice.createcompconf(this.smsform.get('description').value).then(
        (data:any) => {
          this.smsform.reset();
          this.loading = false;
          this.reloadPage()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'sms envoyés avec succès!',
            showConfirmButton: false,
            timer: 6000 
          });
        },
        (error) => {
          this.loading = false;
          
        }
      )
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.carouselform.get('image').patchValue(file);
    this.carouselform.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.carouselform.get('image').valid) {
        this.imagePreview = reader.result as string;
        this.fileUploaded = true;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
    
  }
  
  getNavigation(link, id){
      
    this.carousel.getCarouseldataById(id);
    this.router.navigate([link + '/' + id]); 
  }
  getcarousels() {
                                
                                                
    this.carousel.getCarouselalldata();
                                                   
                                                     
 }
 onDelete(id) {
    this.loading = true;
    this.carousel.getCarouseldataById(id);
    
        this.carousel.getCarouseldataById(id).then(
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
                this.carousel.deletecarouseldataById(id);
                this.reloadPage()
              }
  
            }).catch(() => {
              Swal.fire('opération non aboutie!');
            });
    
        
          }
          
        );
      
  }
 myFunction1() {
  var checkbox:any = document.getElementById("myCheck1");
  var text2 = document.getElementById("bodycontainer");
  if (checkbox.checked == true){
    text2.style.display = "block";
  } else {
    Swal.fire({
      title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout d\'actualités, voulez vous continuer?',
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Réinitialiser',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        
        this.carouselform.reset();
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
myFunction2() {
  var checkbox:any = document.getElementById("myCheck2");
  var text2 = document.getElementById("bodycontainer2");
  if (checkbox.checked == true){
    text2.style.display = "block";
  } else {
    Swal.fire({
      title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout d\'utilisateurs, voulez vous continuer?',
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Réinitialiser',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        
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
myFunction3() {
  var checkbox:any = document.getElementById("myCheck3");
  var text2 = document.getElementById("bodycontainer3");
  if (checkbox.checked == true){
    text2.style.display = "block";
  } else {
    Swal.fire({
      title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout des tarifs, voulez vous continuer?',
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Réinitialiser',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        
        this.carouselform.reset();
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
myFunction4() {
  var checkbox:any = document.getElementById("myCheck4");
  var text2 = document.getElementById("bodycontainer4");
  if (checkbox.checked == true){
    text2.style.display = "block";
  } else {
    Swal.fire({
      title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout de compconfs, voulez vous continuer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Réinitialiser',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) { 
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
myFunction5() {
  var checkbox:any = document.getElementById("myCheck5");
  var text2 = document.getElementById("bodycontainer5");
  if (checkbox.checked == true){
    text2.style.display = "block";
  } else {
    Swal.fire({
      title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'envoi des sms, voulez vous continuer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Réinitialiser',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) { 
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
onFileChange(event) {
  if (event.target.files.length > 0) {
    this.file = event.target.files[0];
    this.uploadEvent = event;
  }
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.arrayBuffer = fileReader.result;
    //@ts-ignore
    var data = new Uint8Array(this.arrayBuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i)
      arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = read(bstr, {
      type: "binary"
    });
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    this.exceljsondata2 = utils.sheet_to_json(worksheet, {
      raw: true,
      defval: "",
    });
    console.log(this.exceljsondata2)
  };
  fileReader.readAsArrayBuffer(this.file);
}
afficher()
{
  this.loading = true;
  console.log(this.exceljsondata)
  this.userservice.addusers(this.exceljsondata2).then(
    (data:any) => {
      this.loading = false;
console.log(this.exceljsondata2)        
Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'utilisateurs ajoutées avec succès!',
        showConfirmButton: false,
        timer: 6000 
      });
          this.reloadPage();
    },
    (error) => {
      this.loading = false;
      
    }
  );
}
onFileChange2(event) {
  if (event.target.files.length > 0) {
    this.file = event.target.files[0];
    this.uploadEvent = event;
  }
  let fileReader = new FileReader();
  var arr = new Array();
  fileReader.onload = (e) => {
    //@ts-ignore
    const guestList = fileReader.result.split(/\r?\n/);
    for (var i = 0; i != guestList.length; ++i)
      arr.push(
        {
          MERCHANTIDENTIFICATION:guestList[i].substring(0,10),
          BATCHIDENTIFICATION:guestList[i].substring(10,16),
          INVOICENUMBER:guestList[i].substring(16,22),
          CARDHOLDERNUMBER:guestList[i].substring(22,41),
          MERCHANTSECTOR:guestList[i].substring(41,42),
          CHANNELTRANSACTIONID:guestList[i].substring(42,43),
          OPERATIONCODE:guestList[i].substring(43,44),
          TRANSACTIONCODE:guestList[i].substring(44,46),
          TRANSACTIONAMOUNT:guestList[i].substring(46,55),
          CARDEXPIRYDATE:guestList[i].substring(55,59),
          PROCESSINGDATE:guestList[i].substring(59,65),
          TRANSACTIONDATE:guestList[i].substring(65,71),
          AUTHORIZATIONCODE:guestList[i].substring(71,77),
          REMITTANCEDATE:guestList[i].substring(77,83),
          MERCHANTCATEGORIECODE:guestList[i].substring(83,87),
          FILLER:guestList[i].substring(87,89),
          ACQUIRERBANKIDENTIFICATION:guestList[i].substring(89,94),
          LOCALCARDSYSTEMNETWORK:guestList[i].substring(94,95),
          ISSUERBANKIDENTIFICATION:guestList[i].substring(95,100),
          ACQUIRERREFERENCENUMBER:guestList[i].substring(100,123),
          TRANSACTIONORDERUSAGECODE:guestList[i].substring(123,125),
          MERCHANTNAME:guestList[i].substring(125,150),
          SETTLEMENTAMOUNT:guestList[i].substring(150,159),
          TRANSACTIONTIME:guestList[i].substring(159,163),
          FILLER2:guestList[i].substring(163,167),
          ENDOFRECORD:guestList[i].substring(167,168),
        }
        );
      console.log(arr);
  };
  this.exceljsondata2=arr
  fileReader.readAsText(this.file);
}
afficher2()
{
  /*this.loading = true;
  console.log(this.exceljsondata3)
  this.compconfservice.addcompconfs(this.exceljsondata3).then(
    (data:any) => {
      this.loading = false;
Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'compconfs ajoutées avec succès!',
        showConfirmButton: false,
        timer: 6000 
      });
          this.reloadPage();
    },
    (error) => {
      this.loading = false;
      
    }
  );*/
}
deleteall() {
  /*this.compconfservice.deletecompconfs().then(
    (data: any) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'toutes les compconfs sont suuprimés avec succès!',
        showConfirmButton: false,
        timer: 6000 
      });
      this.reloadPage()
    });*/
}
reloadPage(): void {
  
  setTimeout(() => window.location.reload(), 3000);
  
}
}

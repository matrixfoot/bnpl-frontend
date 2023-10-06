import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Carouselmodel } from '../models/settings';
import { CarouselService } from '../services/settings';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { read, utils } from "xlsx"
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { compconfService } from '../services/compconf.service';
import { User } from '../models/user.model';
import { Compconf } from '../models/compconf.model';
import { CommunService } from '../services/commun';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-insert-compconf-file',
  templateUrl: './insert-compconf-file.component.html',
  styleUrls: ['./insert-compconf-file.component.scss']
})
export class InsertCompconfFileComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: false})
  public viewPort: CdkVirtualScrollViewport;
  displayStyle: string;
  settedfiltreditems: any[]=[];
  displaysearch='none';
  jsondata2: any[]=[];
  jsondata3: any[]=[];
  jsondata4: any[]=[];
  file2: any;
  uploadEvent2: any;
  displaysearch2: string;
  file3: any;
  uploadEvent3: any;
  displaysearch3: string;
  file4: any;
  uploadEvent4: any;
  displaysearch4: string;
  currentItemsToShow2: any=[];
  currentItemsToShow3: any=[];
  currentItemsToShow4: any=[];
  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }
  currentUser: User;
  loading=false;
 file: any;
 uploadEvent: any;
 arrayBuffer: string | ArrayBuffer;
 compconfsSub: Subscription;
 Compconf: Compconf;
  compconfform: FormGroup;
  jsondata: any=[];
  currentItemsToShow= [];
  optionValue:any
  filtreditems=[];
 constructor(private token: TokenStorageService,private compconfservice: compconfService,private userservice: UserService,
  private formBuilder: FormBuilder,private commun: CommunService,
   private router: Router,) {}
  ngOnInit() {
    this.currentUser = this.token.getUser();
    
  }
  myFunction1() {
    var checkbox:any = document.getElementById("myCheck1");
    var checkbox2:any = document.getElementById("myCheck2");
    var checkbox3:any = document.getElementById("myCheck3");
    var checkbox4:any = document.getElementById("myCheck4");

    var text2 = document.getElementById("bodycontainer1");
    if (checkbox.checked == true){
      text2.style.display = "block";
      checkbox2.style.display="none"
      checkbox3.style.display="none"
      checkbox4.style.display="none"

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
          this.jsondata=[]
          text2.style.display = "none";
          checkbox2.style.display="block"
          checkbox3.style.display="block"
          checkbox4.style.display="block"
        }
        else{
          checkbox.checked = true
          text2.style.display = "block";
          checkbox2.style.display="none"
          checkbox3.style.display="none"
          checkbox4.style.display="none"
        }
      }).catch(() => {
        Swal.fire('opération non aboutie!');
      });
  }
}
  myFunction2() {
    var checkbox2:any = document.getElementById("myCheck2");
    var checkbox:any = document.getElementById("myCheck1");
    var checkbox3:any = document.getElementById("myCheck3");
    var checkbox4:any = document.getElementById("myCheck4");
    var text3 = document.getElementById("bodycontainer2");
      if (checkbox2.checked == true){
        text3.style.display = "block";
        checkbox3.style.display="none"
        checkbox.style.display="none"
        checkbox4.style.display="none"
      } else {
        Swal.fire({
          title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout de work gab, voulez vous continuer?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Réinitialiser',
          cancelButtonText: 'Annuler',
        }).then((result) => {
          if (result.value) { 
            this.jsondata2=[]
            text3.style.display = "none";
            checkbox3.style.display="block"
            checkbox.style.display="block"
            checkbox4.style.display="block"
          }
          else{
            checkbox2.checked = true
            text3.style.display = "block";
            checkbox3.style.display="none"
            checkbox.style.display="none"
            checkbox4.style.display="none"
          }
        }).catch(() => {
          Swal.fire('opération non aboutie!');
        });
      }
    }
  myFunction3() {
   
    var checkbox3:any = document.getElementById("myCheck3");
    var checkbox2:any = document.getElementById("myCheck2");
    var checkbox:any = document.getElementById("myCheck1");
    var checkbox4:any = document.getElementById("myCheck4");
    var text4 = document.getElementById("bodycontainer3");
    if (checkbox3.checked == true){
      text4.style.display = "block";
      checkbox.style.display="none"
      checkbox2.style.display="none"
      checkbox4.style.display="none"
    } else {
      Swal.fire({
        title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout de work pos, voulez vous continuer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Réinitialiser',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) { 
          this.jsondata3=[]
          text4.style.display = "none";
          checkbox.style.display="block"
          checkbox2.style.display="block"
          checkbox4.style.display="block"
        }
        else{
          checkbox3.checked = true
          text4.style.display = "block";
          checkbox.style.display="none"
          checkbox2.style.display="none"
          checkbox4.style.display="none"
        }
      }).catch(() => {
        Swal.fire('opération non aboutie!');
      });
    }
  }
  myFunction4() {
   
    var checkbox4:any = document.getElementById("myCheck4");
    var checkbox2:any = document.getElementById("myCheck2");
    var checkbox3:any = document.getElementById("myCheck3");
    var checkbox:any = document.getElementById("myCheck1");
    var text5 = document.getElementById("bodycontainer4");
    if (checkbox4.checked == true){
      text5.style.display = "block";
      checkbox.style.display="none"
      checkbox2.style.display="none"
      checkbox3.style.display="none"
    } else {
      Swal.fire({
        title: 'Vous êtes sur le point de réinitialiser tous les donnés relatifs au formulaire d\'ajout de work sms, voulez vous continuer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Réinitialiser',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) { 
          this.jsondata4=[]
          text5.style.display = "none";
          checkbox.style.display="block"
          checkbox2.style.display="block"
          checkbox3.style.display="block"
        }
        else{
          checkbox4.checked = true
          text5.style.display = "block";
          checkbox.style.display="none"
          checkbox2.style.display="none"
          checkbox3.style.display="none"
        }
      }).catch(() => {
        Swal.fire('opération non aboutie!');
      });
    }
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
            doctype:'compconf',
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
            CHARGEBACKREASONCODE:guestList[i].substring(125,127),
            CHARGEBACKTRANSACTIONCYCLE:guestList[i].substring(127,128),
            MESSAGE:guestList[i].substring(128,150),
            ndPRESENTMENTREASONCODE:guestList[i].substring(125,127),
            ndPRESENTMENTTRANSACTIONCYCLE:guestList[i].substring(127,128),
            PRESENTMENTINDICATOR:guestList[i].substring(163,164),
            MERCHANTNAME:guestList[i].substring(125,150),
            SETTLEMENTAMOUNT:guestList[i].substring(150,159),
            TRANSACTIONTIME:guestList[i].substring(159,163),
            FILLER2:guestList[i].substring(163,167),
            ENDOFRECORD:guestList[i].substring(167,168),
          }
          );
        console.log(arr);
        this.jsondata=arr
        console.log(arr.length)
        this.buildData(this.jsondata.length)
        this.displaysearch = "block";

    };
   
    fileReader.readAsText(this.file);
  }
  

  onFileChange3(event) {
    if (event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      this.uploadEvent2 = event;
    }
    let fileReader = new FileReader();
    var arr = new Array();
    fileReader.onload = (e) => {
      //@ts-ignore
      const guestList = fileReader.result.split(/\r?\n/);
      for (var i = 0; i != guestList.length; ++i)
        arr.push(
          {
            doctype:'work gab',
            RECORDREFERENCE:guestList[i].substring(0,4),
            BATCHIDENTIFICATION:guestList[i].substring(4,8),
            BATCHSEQUENCENUMBER:guestList[i].substring(8,11),
            TRANSACTIONSEQUENCENUMBER:guestList[i].substring(11,15),
            MERCHANTIDENTIFICATION:guestList[i].substring(15,25),
            BATCHSEQUENCENUMBER2:guestList[i].substring(25,31),
            DRAFTNUMBER:guestList[i].substring(31,37),
            CARDHOLDERNUMBER:guestList[i].substring(37,56),
            FILLER:guestList[i].substring(56,60),
            TRANSACTIONAMOUNT:guestList[i].substring(60,69),
            FILLER2:guestList[i].substring(69,81),
            TERMINALINVOICENUMBER:guestList[i].substring(81,91),
            TRANSACTIONTIME:guestList[i].substring(91,95),
            CARDEXPIRYDATE:guestList[i].substring(95,99),
            AUTHORIZATIONCODE:guestList[i].substring(99,105),
            TRANSACTIONDATE:guestList[i].substring(105,111),
            SETTLEMENTAMOUNT:guestList[i].substring(111,120),
            FILLER3:guestList[i].substring(120,125),
            TERMINALTYPE:guestList[i].substring(125,126),
            ISSUERBANKCODE:guestList[i].substring(126,130),
            FILLER4:guestList[i].substring(130,134),
            OPERATIONCODE:guestList[i].substring(134,135),
            ACQUIRERBANKCODE:guestList[i].substring(135,139),
            FILLER5:guestList[i].substring(139,151),
            CURRENCYCODE:guestList[i].substring(151,154),
            FILLER6:guestList[i].substring(154,156),
            TERMINALTYPE2:guestList[i].substring(156,157),
            FILLER7:guestList[i].substring(157,159),
            TRANSTRAILERID:guestList[i].substring(159,160),
          }
          );
        console.log(arr);
        this.jsondata2=arr
        console.log(arr.length)
        this.buildData(this.jsondata2.length)
        this.displaysearch2 = "block";

    };
   
    fileReader.readAsText(this.file2);
  }


  onFileChange4(event) {
    if (event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.uploadEvent3 = event;
    }
    let fileReader = new FileReader();
    var arr = new Array();
    fileReader.onload = (e) => {
      //@ts-ignore
      const guestList = fileReader.result.split(/\r?\n/);
      for (var i = 0; i != guestList.length; ++i)
        arr.push(
          {
            doctype:'work pos',
            RECORDREFERENCE:guestList[i].substring(0,4),
            BATCHIDENTIFICATION:guestList[i].substring(4,8),
            BATCHSEQUENCENUMBER:guestList[i].substring(8,11),
            TRANSACTIONSEQUENCENUMBER:guestList[i].substring(11,15),
            MERCHANTIDENTIFICATION:guestList[i].substring(15,25),
            BATCHSEQUENCENUMBER2:guestList[i].substring(25,31),
            DRAFTNUMBER:guestList[i].substring(31,37),
            CARDHOLDERNUMBER:guestList[i].substring(37,56),
            FILLER:guestList[i].substring(56,60),
            TRANSACTIONAMOUNT:guestList[i].substring(60,69),
            FILLER2:guestList[i].substring(69,81),
            TERMINALINVOICENUMBER:guestList[i].substring(81,91),
            TRANSACTIONTIME:guestList[i].substring(91,95),
            CARDEXPIRYDATE:guestList[i].substring(95,99),
            AUTHORIZATIONCODE:guestList[i].substring(99,105),
            TRANSACTIONDATE:guestList[i].substring(105,111),
            SETTLEMENTAMOUNT:guestList[i].substring(111,120),
            FILLER3:guestList[i].substring(120,125),
            TERMINALTYPE:guestList[i].substring(125,126),
            ISSUERBANKCODE:guestList[i].substring(126,130),
            FILLER4:guestList[i].substring(130,134),
            OPERATIONCODE:guestList[i].substring(134,135),
            ACQUIRERBANKCODE:guestList[i].substring(135,139),
            FILLER5:guestList[i].substring(139,151),
            CURRENCYCODE:guestList[i].substring(151,154),
            FILLER6:guestList[i].substring(154,156),
            TERMINALTYPE2:guestList[i].substring(156,157),
            FILLER7:guestList[i].substring(157,159),
            TRANSTRAILERID:guestList[i].substring(159,160),
          }
          );
        console.log(arr);
        this.jsondata3=arr
        console.log(arr.length)
        this.buildData(this.jsondata3.length)
        this.displaysearch3 = "block";

    };
   
    fileReader.readAsText(this.file3);
  }


  onFileChange5(event) {
    if (event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.uploadEvent4 = event;
    }
    let fileReader = new FileReader();
    var arr = new Array();
    fileReader.onload = (e) => {
      //@ts-ignore
      const guestList = fileReader.result.split(/\r?\n/);
      for (var i = 0; i != guestList.length; ++i)
        arr.push(
          {
            doctype:'work sms',
            RECORDREFERENCE:guestList[i].substring(0,4),
            BATCHIDENTIFICATION:guestList[i].substring(4,8),
            BATCHSEQUENCENUMBER:guestList[i].substring(8,11),
            TRANSACTIONSEQUENCENUMBER:guestList[i].substring(11,15),
            MERCHANTIDENTIFICATION:guestList[i].substring(15,25),
            BATCHSEQUENCENUMBER2:guestList[i].substring(25,31),
            DRAFTNUMBER:guestList[i].substring(31,37),
            CARDHOLDERNUMBER:guestList[i].substring(37,56),
            FILLER:guestList[i].substring(56,60),
            TRANSACTIONAMOUNT:guestList[i].substring(60,69),
            FILLER2:guestList[i].substring(69,81),
            TERMINALINVOICENUMBER:guestList[i].substring(81,91),
            TRANSACTIONTIME:guestList[i].substring(91,95),
            CARDEXPIRYDATE:guestList[i].substring(95,99),
            AUTHORIZATIONCODE:guestList[i].substring(99,105),
            TRANSACTIONDATE:guestList[i].substring(105,111),
            SETTLEMENTAMOUNT:guestList[i].substring(111,120),
            FILLER3:guestList[i].substring(120,125),
            TERMINALTYPE:guestList[i].substring(125,126),
            ISSUERBANKCODE:guestList[i].substring(126,130),
            FILLER4:guestList[i].substring(130,134),
            OPERATIONCODE:guestList[i].substring(134,135),
            ACQUIRERBANKCODE:guestList[i].substring(135,139),
            FILLER5:guestList[i].substring(139,151),
            CURRENCYCODE:guestList[i].substring(151,154),
            FILLER6:guestList[i].substring(154,156),
            TERMINALTYPE2:guestList[i].substring(156,157),
            FILLER7:guestList[i].substring(157,159),
            TRANSTRAILERID:guestList[i].substring(159,160),
          }
          );
        console.log(arr);
        this.jsondata4=arr
        console.log(arr.length)
        this.buildData(this.jsondata4.length)
        this.displaysearch4 = "block";

    };
   
    fileReader.readAsText(this.file4);
  }
  save()

  {
    this.loading = true;
    console.log(this.jsondata)
    if(this.jsondata.length>0)
    {
      this.compconfservice.createcompconf(this.jsondata).then(
        (data:any) => {
          this.loading = false;
    console.log(this.jsondata)        
    Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'fichiers ajoutées avec succès!',
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
    if(this.jsondata2.length>0)
    {
      this.compconfservice.createworkgab(this.jsondata2).then(
        (data:any) => {
          this.loading = false;
    Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'fichiers ajoutées avec succès!',
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
    if(this.jsondata3.length>0)
    {
      this.compconfservice.createworkpos(this.jsondata3).then(
        (data:any) => {
          this.loading = false;
    console.log(this.jsondata)        
    Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'fichiers ajoutées avec succès!',
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
    if(this.jsondata4.length>0)
    {
      this.compconfservice.createworksms(this.jsondata4).then(
        (data:any) => {
          this.loading = false;
    console.log(this.jsondata)        
    Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'fichiers ajoutées avec succès!',
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
  }

buildData(length: number) {
  const ITEMS_RENDERED_AT_ONCE = 5000;
  const INTERVAL_IN_MS = 1000;

  let currentIndex = 0;

  const interval = setInterval(() => {
    const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;
    for (let n = currentIndex; n <= nextIndex ; n++) 
    {
      if (n >= length) {
        clearInterval(interval);
        break;
      }
      if(this.jsondata.length>0)
      {
        this.currentItemsToShow.push(
          this.jsondata[n]
        )
      }
      if(this.jsondata2.length>0)
      {
        this.currentItemsToShow2.push(
          this.jsondata2[n]
        )
      }
      if(this.jsondata3.length>0)
      {
        this.currentItemsToShow3.push(
          this.jsondata3[n]
        )
      }
      if(this.jsondata4.length>0)
      {
        this.currentItemsToShow4.push(
          this.jsondata4[n]
        )
      }
    }
    currentIndex += ITEMS_RENDERED_AT_ONCE;
  }, INTERVAL_IN_MS)
}
/*onPageChange($event) {
  this.currentItemsToShow =  this.jsondata.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
}
filtercompconf()
{
  this.displayStyle = "block";
  this.filtreditems.push(
    this.commun.findByValue2(this.currentItemsToShow,this.optionValue)
  )
  this.settedfiltreditems= this.filtreditems.filter((obj, index) => {
    return index === this.filtreditems.findIndex(o => obj === o);
  });}
closePopup()
{
  this.displayStyle = "none";
 
}*/
reloadPage(): void {
  
  setTimeout(() => window.location.reload(), 3000);
  
}
}

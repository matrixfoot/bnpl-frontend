import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { concat, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Decfiscmens } from '../models/dec-fisc-mens';
import { Router } from '@angular/router';
import { Workpos } from '../models/workpos.model';
import { compconfService } from '../services/compconf.service';
import { FormBuilder } from '@angular/forms';
import { CommunService } from '../services/commun';
import { ExcelService } from '../services/excel.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TokenStorageService } from '../services/token-storage.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-view-workpos',
  templateUrl: './view-workpos.component.html',
  styleUrls: ['./view-workpos.component.scss']
})
export class ViewWorkposComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, {static: false})
  public viewPort: CdkVirtualScrollViewport;
  displayStyle: string;
  settedfiltreditems: any[]=[];
  displaysearch='none';
  optionValue='';
  option1Value='';
  option2Value='';
  option3Value=null;
  option4Value=null;
  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }
  currentUser: User;
  public loading: boolean;
  public users: User[] = [];
  public workposs: Workpos[] = [];
  compconfsSub: Subscription;
  showitems:false
  currentItemsToShow: any=[];
  filtreditems: any=[];
  constructor(private token: TokenStorageService,private formBuilder: FormBuilder,
    private UserService: UserService,
    private commun: CommunService,private com: compconfService,
    private router: Router,
    private excelService:ExcelService) { }

  ngOnInit() {
    this.loading=true
    this.currentUser = this.token.getUser();
    this.compconfsSub = this.com.workposs$.subscribe(
      (workposs) => {
        this.workposs = workposs;
        this.loading = false;
        this.currentItemsToShow=this.workposs.slice(0,100)
      },
      (error) => {
        this.loading = false;
      }
    );
    this.token.getToken()?this.getallworkposs():''
  }
  getallworkposs() {                                            
    this.com.getWorkposs().then(
      (data:any) => {
        this.loading = false;
        this.buildData(this.workposs.length)
      },
      (error) => {
        this.loading = false;    
      }
   );
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
      this.currentItemsToShow.push(
        this.workposs[n]
      )
    }
    currentIndex += ITEMS_RENDERED_AT_ONCE;
  }, INTERVAL_IN_MS)
}
onPageChange($event) {
  this.currentItemsToShow =  this.workposs.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
}
avance()
{
  let rech=document.getElementById("recherche")
  this.optionValue==''?
  rech.style.display=='none':
  this.optionValue=''
}
filterworkposs()
{
  
  let filtredbyid=[]
  let filtredbycarte=[]
  let filtredbyinf=[]
  let filtredbysup=[]
  let filtredbyvalue=[]
  this.filtreditems=[]
  this.displayStyle = "block"; 
this.optionValue!=''?filtredbyvalue=this.commun.filterByValue(this.workposs,this.optionValue):filtredbyvalue=[]
this.option1Value!=''?filtredbyid=this.commun.filterByValue(this.workposs,this.option1Value):filtredbyid=[]
this.option2Value!=''?this.workposs.forEach((element)=> 
{
 
  if(CryptoJS.AES.decrypt(element.CARDHOLDERNUMBER, '****************').toString(CryptoJS.enc.Utf8).substring(0,16)==this.option2Value)
  {
    console.log(element)
    filtredbycarte.push(element)
  }
}
):filtredbycarte=[] 
this.option3Value?
filtredbyinf=this.workposs.filter((element)=> new Date(element.TRANSACTIONDATE.substring(2,4)+'.'+
element.TRANSACTIONDATE.substring(0,2)+'.'+'-20'+element.TRANSACTIONDATE.substring(4,6)) >=this.option3Value):filtredbyinf=[]
this.option4Value?
filtredbysup=this.workposs.filter((element)=> new Date(element.TRANSACTIONDATE.substring(2,4)+'.'+
element.TRANSACTIONDATE.substring(0,2)+'.'+'-20'+element.TRANSACTIONDATE.substring(4,6)) <= this.option4Value):filtredbysup=[]

this.filtreditems=this.filtreditems.concat(filtredbyid,filtredbycarte,filtredbyinf,filtredbysup,filtredbyvalue)
  this.settedfiltreditems= this.filtreditems.filter((obj, index) => {
    return index === this.filtreditems.findIndex(o => obj === o);
  });
}
closePopup()
{
  this.displayStyle = "none";
 
}

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Carouselmodel } from '../models/settings';
import { CarouselService } from '../services/settings';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 4000, noPause: false, showIndicators: true } }
 ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carousels: Carouselmodel[];
  carouselsSub: any;
  sortedcarousels: Carouselmodel[];
  noWrapSlides = false;
  showIndicator = true;
  actualites: Carouselmodel[];
  loading: boolean;
  isLoggedIn: boolean;
  currentuser: User;
  constructor(
    private carousel:CarouselService,private router: Router,private tokenStorage:TokenStorageService,

  ) {}
 
  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentuser = this.tokenStorage.getUser();
    }
    /*this.carouselsSub = this.carousel.carousels$.subscribe(
      (carousels) => {
        this.carousels = carousels; 
        this.actualites=this.carousels.filter(p => p.tarifs.length==0)
        this.sortedcarousels=this.actualites.sort((a, b) => a.rang - b.rang);
      },
      (error) => {
        
      }
    );
    
      this.carousel.getCarouselalldata();*/
      setTimeout(() => document.getElementById('id01').style.display='none', 5000);
  }
 
  getNavigation(link, id){
      
    this.carousel.getCarouseldataById(id);
    this.router.navigate([link + '/' + id]); 
  }
  voirdetail(link, id)
  {
    if (this.isLoggedIn) 
    {
      this.router.navigate([link + '/' + id]); 
    }
    else 
    {
      this.router.navigate(['login'])
      this.loading=false
    }
    
  }
  reloadPage (){
    let window= document.getElementById('id01')    
  }
}

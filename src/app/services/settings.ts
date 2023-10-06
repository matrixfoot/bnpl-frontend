import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Carouselmodel } from '../models/settings';
const API_URL_test = 'http://localhost:3000/api/settings/';
const API_URL_cloud= 'https://macompta.com.tn:3002/api/settings/'
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class CarouselService {
    
    
    constructor(private http: HttpClient) { }
    public carousels: Carouselmodel[] = [];
    public carousels$ = new Subject<Carouselmodel[]>();
 

    getCarouselalldata() {
        this.http.get(API_URL_cloud).subscribe(
          (carousels: Carouselmodel[]) => {
            if (carousels) {
              this.carousels = carousels;
              this.emitCarousels();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitCarousels() {
        this.carousels$.next(this.carousels);
      }
      getCarouseldataById(id: string) {
        return new Promise((resolve, reject) => {
          

          this.http.get(API_URL_cloud + id).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error); 
            }
          );
        });
      }
     
   
      
    
      create(carousel: Carouselmodel, image: File) {
        return new Promise((resolve, reject) => {
          const carouselData = new FormData();
          carouselData.append('carousel', JSON.stringify(carousel));
          carouselData.append('image', image, carousel.titre);
          this.http.post(API_URL_cloud+'createcarouseldata', carouselData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        }); 
      }
     
      createwithoutfile(carousel: Carouselmodel) {
        return new Promise((resolve, reject) => {
          
          this.http.post(API_URL_cloud+'/createcarouselreqwithoutimage', carousel).subscribe(
            (response) => {
              resolve(response);

            },
            (error) => {
              reject(error);
            },
          );
        });
      }
     
    
      modify(id: string, carousel: Carouselmodel, file: File | string) {
        return new Promise((resolve, reject) => {
          let carouseldata: Carouselmodel | FormData;
          if (typeof file === 'string') {
            carousel.ficheUrl = file;
            carouseldata = carousel;
          } else {
            carouseldata = new FormData();
            carouseldata.append('carousel', JSON.stringify(carousel));
            carouseldata.append('image', file, carousel.titre);
          }
          this.http.put(API_URL_cloud + id, carouseldata).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      deletecarouseldataById(id: string) {
        return new Promise((resolve, reject) => {
          this.http.delete(API_URL_cloud+ id).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      } 
      
      
    }

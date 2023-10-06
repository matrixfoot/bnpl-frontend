import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Reclamation } from '../models/reclamation';
const API_URL_cloud= 'https://macompta.com.tn:3002/api/reclamations/'
const API_URL_test = 'http://localhost:3005/api/reclamations/'; 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class ReclamationService {
    
    
    constructor(private http: HttpClient) { }
    public reclamations: Reclamation[] = [];
    public reclamations$ = new Subject<Reclamation[]>();
 

    getReclamations() {
        this.http.get(API_URL_cloud).subscribe(
          (reclamations: Reclamation[]) => {
            if (reclamations) {
              this.reclamations = reclamations;
              this.emitReclamations();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitReclamations() {
        this.reclamations$.next(this.reclamations);
      }
      getReclamationdataById(id: string) {
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
      getReclamation(userId: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_cloud +'reclamation' ,{userId}).subscribe(
            (reclamations: Reclamation[]) => {
              if (reclamations) {
                this.reclamations = reclamations;
                this.emitReclamations();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      create(Reclamation: Reclamation, image: File| string) {
        return new Promise((resolve, reject) => {
          let Reclamationdata: Reclamation | FormData;
          if (typeof image === 'string') {
            console.log(image)
            Reclamationdata = Reclamation;
          } else {
            Reclamationdata = new FormData();
            Reclamationdata.append('reclamation', JSON.stringify(Reclamation));
            Reclamationdata.append('image', image, Reclamation._id);
          }
          this.http.post(API_URL_cloud, Reclamationdata).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        }); 
      }
      modify(id: string, Reclamation: Reclamation, file: File | string) {
        return new Promise((resolve, reject) => {
          let Reclamationdata: Reclamation | FormData;
          if (typeof file === 'string') {
            //@ts-ignore
            Reclamation.changements[Reclamation.changements.length-1].ficheUrl = file;
            Reclamationdata = Reclamation;
          } else {
            Reclamationdata = new FormData();
            Reclamationdata.append('reclamation', JSON.stringify(Reclamation));
            Reclamationdata.append('image', file, Reclamation._id);
          }
          this.http.put(API_URL_cloud + id, Reclamationdata).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      savereclamationById(id: string, reclamation: Reclamation) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'modify/'+ id, reclamation).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
      deleteReclamationdataById(id: string) {
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

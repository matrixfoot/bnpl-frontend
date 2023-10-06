import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Motif } from '../models/motifreclamation';
const API_URL_test = 'http://localhost:3005/api/motifreclamation/';
const API_URL_cloud= 'https://macompta.com.tn:3002/api/motifreclamation/'
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({ providedIn: 'root' })
export class MotifreclamationService {
    
    
    constructor(private http: HttpClient) { }
    public motifreclamations: Motif[] = [
    
    ];
    public motifreclamations$ = new Subject<Motif[]>();
 
    createwithoutfile(motif: Motif) {
      return new Promise((resolve, reject) => {
        
        this.http.post(API_URL_cloud, motif).subscribe(
          (response) => {
            resolve(response);

          },
          (error) => {
            reject(error);
          },
        );
      });
    }
    getmotifreclamationss() {
        this.http.get(API_URL_cloud).subscribe(
          (motifreclamations: Motif[]) => {
            if (motifreclamations) {
              this.motifreclamations = motifreclamations;
              this.emitmotifreclamationss();

            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    
      emitmotifreclamationss() {
        this.motifreclamations$.next(this.motifreclamations);
      }
      getMotifreclamationreqById(id: string) {
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
      getmotifreclamation(userId: string) {
        return new Promise((resolve, reject) => {
          this.http.post(API_URL_cloud  ,{userId}).subscribe(
            (motifreclamations: Motif[]) => {
              if (motifreclamations) {
                this.motifreclamations = motifreclamations;
                this.emitmotifreclamationss();
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      }
      
   /* geexistenttmotifreclamation(userId: string,annee:string,mois:string,source:string) 
    {
return new Promise((resolve, reject) => {
        this.http.post(API_URL_cloud+'/anneemois/',{userId,annee,mois,source}).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error); 
          }
        );
      });

      }*/
      
    /*  create(motifreclamation: Motif) {
        return new Promise((resolve, reject) => {
          
          this.http.post(API_URL_cloud, motifreclamation).subscribe(
            (response) => {
              resolve(response);

            },
            (error) => {
              reject(error);
            },
          );
        });
      }*/
    
     
    
     /* modify(id: string, motifreclamationreq: Motif, image: File | string) {
        return new Promise((resolve, reject) => {
          let motifreclamationreqData: Motif | FormData;
          if (typeof image === 'string') {
            
            motifreclamationreqData = motifreclamationreq;
          } else {
            motifreclamationreqData = new FormData();
            motifreclamationreqData.append('motifreclamationreq', JSON.stringify(motifreclamationreq));
            motifreclamationreqData.append('image', image, motifreclamationreq.email);
          }
          this.http.put(API_URL_cloud + id, motifreclamationreqData).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }*/
      modifymotifreclamationreqById(id: string, motifreclamation: Motif) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+ id, motifreclamation).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        }); 
      }
     /* completemotifreclamationreqById(id: string, motifreclamation: Motif) {
        return new Promise((resolve, reject) => {
          
            
          
          this.http.put(API_URL_cloud+'modify/'+ id, motifreclamation).subscribe(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }*/
    
      deletemotifreclamationById(id: string) {
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
      deletemotifreclamationss() {
        return new Promise((resolve, reject) => {
          this.http.delete(API_URL_cloud).subscribe(
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

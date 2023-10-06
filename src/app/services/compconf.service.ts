import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Compconf } from '../models/compconf.model';
import { Workgab } from '../models/workgab.model';
import { Workpos } from '../models/workpos.model';
import { Worksms } from '../models/worksms.model';


const API_URL_cloud= 'https://macompta.com.tn:3002/api/compconfs/'
const API_URL_test = 'http://localhost:3002/api/compconfs/'; 
@Injectable({
    providedIn: 'root'
  })
export class compconfService {
     
  headers = new HttpHeaders().set('Content-Type', 'application/json',);
  currentUser = {};
  window: any;
  private compconfs: Compconf[] = [];
  private workgabs: Workgab[] = [];
  private workposs: Workpos[] = [];
  private worksmss: Worksms[] = [];

public compconfs$ = new Subject<Compconf[]>();
public workgabs$ = new Subject<Workgab[]>();
public workposs$ = new Subject<Workpos[]>();
public worksmss$ = new Subject<Worksms[]>();

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  createcompconf(compconf: Compconf[]) {
    return new Promise((resolve, reject) => {
      
      this.http.post(API_URL_cloud+'createcompconf/', compconf).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifycompconfById(id: string, compconf: Compconf) {
    return new Promise((resolve, reject) => {
      this.http.put(API_URL_cloud+'compconf/'+ id, compconf).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getcompconfs() {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'allcompconf/').subscribe(
        (compconfs: Compconf[]) => {
          if (compconfs) {
            this.compconfs = compconfs;
            this.emitcompconfs();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    )
  }

  emitcompconfs() {
    this.compconfs$.next(this.compconfs);
  }
  getcompconfById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'compconf/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  deletecompconfById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'compconf/'+ id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }  
  deletecompconfs() {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'allcompconf/').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  //workgab
  createworkgab(Workgab: Workgab[]) {
    return new Promise((resolve, reject) => {
      
      this.http.post(API_URL_cloud+'createWorkgab/', Workgab).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyworgabById(id: string, Workgab: Workgab) {
    return new Promise((resolve, reject) => {
      this.http.put(API_URL_cloud+'workgab/'+ id, Workgab).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getWorkgabs() {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'allworkgab/').subscribe(
        (Workgabs: Workgab[]) => {
          if (Workgabs) {
            this.workgabs = Workgabs;
            this.emitWorkgabs();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    )
  }

  emitWorkgabs() {
    this.workgabs$.next(this.workgabs);
  }
  getworgabById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'workgab/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  deleteworkgabById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'workgab/'+ id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }  
  deleteWorkgabs() {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'allworkgab/').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  //workpos
  createworkpos(Workpos: Workpos[]) {
    return new Promise((resolve, reject) => {
      
      this.http.post(API_URL_cloud+'createWorkpos/', Workpos).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyworkposById(id: string, Workpos: Workpos) {
    return new Promise((resolve, reject) => {
      this.http.put(API_URL_cloud+'workpos/'+ id, Workpos).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getWorkposs() {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'allworkpos/').subscribe(
        (Workposs: Workpos[]) => {
          if (Workposs) {
            this.workposs = Workposs;
            this.emitWorkposs();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    )
  }

  emitWorkposs() {
    this.workposs$.next(this.workposs);
  }
  getworkposById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'workpos/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  deleteworkposById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'workpos/'+ id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }  
  deleteWorkposs() {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'allworkpos/').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  //worksms
  createworksms(Worksms: Worksms[]) {
    return new Promise((resolve, reject) => {
      
      this.http.post(API_URL_cloud+'createWorksms/', Worksms).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  modifyworksmsById(id: string, Worksms: Worksms) {
    return new Promise((resolve, reject) => {
      this.http.put(API_URL_cloud+'worksms/'+ id, Worksms).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getWorksmss() {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'allworksms/').subscribe(
        (Worksmss: Worksms[]) => {
          if (Worksmss) {
            this.worksmss = Worksmss;
            this.emitWorksmss();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    )
  }

  emitWorksmss() {
    this.worksmss$.next(this.worksmss);
  }
  getworksmsById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(API_URL_cloud+'worksms/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error); 
        }
      );
    });
  }
  deleteworksmsById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'worksms/'+ id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }  
  deleteWorksmss() {
    return new Promise((resolve, reject) => {
      this.http.delete(API_URL_cloud+'allworksms/').subscribe(
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
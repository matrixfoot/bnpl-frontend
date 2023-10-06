import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Subscription } from 'rxjs';
import { MustMatch } from '../_helpers/must-match.validator';
import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation';
import { CommunService } from '../services/commun';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-reclamation',
  templateUrl: './create-reclamation.component.html',
  styleUrls: ['./create-reclamation.component.scss']
})
export class CreateReclamationComponent implements OnInit {

  public reclamationform: FormGroup; 
  public currentuser: User;
  public reclamation: Reclamation;
  public imagePreview: string;
  fileUploaded = false; 
  private usersSub: Subscription;
  public loading = false;
  errormsg:string;
  submitted=false
  user: User;
  constructor(private formBuilder: FormBuilder,
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private recserv: ReclamationService,
    private auth: AuthService,
    private commun: CommunService,
    private tokenStorage: TokenStorageService,) {}


 ngOnInit() {
  this.loading = true;
  this.route.params.subscribe(
    (params) => {
      this.recserv.getReclamationdataById(params.id).then(
        (reclamation: Reclamation) => {
          this.userservice.getUserById(reclamation.userId).then(
            (user: User) => {
              this.loading = false;
              this.reclamation = reclamation;
              this.user=user
              console.log(this.reclamation.changements) 
    
                this.reclamationform = this.formBuilder.group({
                  
                  commentaire: [null, Validators.required],
                  statut: '',
                  motif: '',
                  date: '',
                  file: '',
                });  
            }
          )
              
        }
      );
    }
  );

}
get f() { return this.reclamationform.controls; }

filtervalue(value:string):string
{
  let view:string
  value=='T'?view='TPE/ECOM':
  value=='G'?view='GAB':
  value==''||value=='O'||value=='M'?view='Manual':
  value=='R'?view='Recharge GAB':
  value=='Z'?view='Mobile':
  value=='05'?view='Achat':
  value=='06'?view='crédit':
  value=='07'?view='Cash Advance':
  value=='08'?view='Retrait':
  value=='15'?view='Impayé GAB':
  value=='17'?view='Impayé CASH ADVANCE':
  value=='18'?view='Impayé GAB':
  value=='1'?view='1st CHARGEBACK':
  value=='2'?view='2nd CHARGEBACK':
  value
  return view
}
onImagePick(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.reclamationform.get('file').patchValue(file);
  this.reclamationform.get('file').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
    if (this.reclamationform.get('file').valid) {
      this.imagePreview = reader.result as string;
      this.fileUploaded = true;
    } else {
      this.imagePreview = null;
    }
  };
  reader.readAsDataURL(file);
}
removeammount(id:number)
{
  this.recserv.getReclamationdataById(this.reclamation._id).then(
    (reclamation: Reclamation) => {
 //@ts-ignore  
 this.reclamation.changements=reclamation.changements.filter(
  //@ts-ignore  
    e=>e.id!=id
  )
    }
  )
   
}
onSubmit() {
  this.loading = true;
  this.submitted=true
  if (this.reclamationform.invalid) {
      
    return this.loading = false;
}
  const reclamation = new Reclamation();
  this.commun.getcurrenttime().then(
    async (data:any) => {
      reclamation.transactions=this.reclamation.transactions
      reclamation._id=this.reclamation._id
      reclamation.changements=this.reclamation.changements
      reclamation.changements.push(
        //@ts-ignore
        {
                  //@ts-ignore
          id:reclamation.changements.length==0?1:
                    //@ts-ignore
          reclamation.changements[reclamation.changements.length-1].id+1,
          //@ts-ignore
          commentaire :this.reclamationform.get('commentaire').value,
                  //@ts-ignore
          statut :this.reclamationform.get('statut').value,
                  //@ts-ignore
          motif :this.reclamationform.get('motif').value,
                  //@ts-ignore
          date:data,
                  //@ts-ignore
          ficheUrl : ''
        }
      )
      this.recserv.modify(reclamation._id, reclamation, this.reclamationform.get('file').value||'').then(
        (data:any) => {
          console.log(data)
          this.loading = false;
          this.reclamationform.reset()
         // this.router.navigate(['user-board']);
        },
        (error) => {
          this.loading = false;   
        } 
      );
    }
  )
}
onSend() {
  this.recserv.getReclamationdataById(this.reclamation._id).then(
    (reclamation: Reclamation) => {
      this.loading = true;
      this.submitted=true
      if (this.reclamationform.get('commentaire').value!=null) {   
        return Swal.fire({
          title: 'veuillez ajouter votre commentaire avant de valider!',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        }).then((result) => {
          this.loading = false;
          
        }
        )   
    }
    console.log(reclamation.changements)
      this.recserv.savereclamationById(reclamation._id, reclamation).then(
        (data:any) => {
          console.log(data)
          this.loading = false;
         this.router.navigate(['user-board']);
        },
        (error) => {
          this.loading = false;   
        } 
      );
    }
  )
 
}
}

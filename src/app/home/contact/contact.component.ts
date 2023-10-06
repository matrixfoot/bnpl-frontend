import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { AlertService } from '../../_helpers/alert.service';
import Swal from 'sweetalert2';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  


  contactform: FormGroup;
  loading = false;
  public imagePreview: string;
  
  fileUploaded = false;
  errorMessage: string;
  successmessage:string;
  submitted = false;
  currentuser: User;
  constructor(private formBuilder: FormBuilder,    private tokenStorage: TokenStorageService,
    private router: Router,
    private cont: ContactService,    private userservice: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken())
    {
      this.currentuser=this.tokenStorage.getUser()
      this.userservice.getUserById(this.currentuser.userId).then(
        (user:User)=>{
          this.contactform = this.formBuilder.group({
            email: [user.email, [Validators.required, Validators.email]],
            
            firstname: [user.firstname, Validators.required],
            
            mobile: [user.mobile, Validators.required],
            
            
            lastname: [user.lastname, Validators.required],
            
            
            
            description: ['', Validators.required],
            image: [null],
            
         
          });
        }
      )
         
    }
    this.contactform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      
      firstname: ['', Validators.required],
      
      mobile: ['', Validators.required],
      
      
      lastname: ['', Validators.required],
      
      
      
      description: ['', Validators.required],
      image: [null],
      
   
    });

  }
  get f() { return this.contactform.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.contactform.invalid) {
      
     return (this.loading = false);
  }
    const contact = new Contact();
    contact.email = this.contactform.get('email').value;
    
    contact.mobile = this.contactform.get('mobile').value;
    
    contact.firstname = this.contactform.get('firstname').value;
    contact.lastname = this.contactform.get('lastname').value;
  
    contact.description = this.contactform.get('description').value;
   
    contact.ficheUrl = '';
    if (this.contactform.get('image').value==null) {
      
      return ( this.cont.createwithoutimage(contact).then(
        (data:any) => {
          this.contactform.reset();
          this.loading = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'réclamation envoyée avec succès! un email vous a été envoyer pour confirmer la réception de votre réclamation. vous allez recevoir désormais une réponse dans les plus brefs délais ',
            showConfirmButton: false,
            timer: 6000 
          });
          this.router.navigate(['home'])
        },
        (error) => {
          this.loading = false;
        }
      ));
   }
    this.cont.create(contact, this.contactform.get('image').value).then(
      (data:any) => {
        this.contactform.reset();
        this.loading = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'réclamation envoyée avec succès! un email vous a été envoyer pour confirmer la réception de votre réclamation. vous allez recevoir désormais une réponse dans les plus brefs délais ',
          showConfirmButton: false,
          timer: 6000 
        });
        this.router.navigate(['home'])
      },
      (error) => {
        this.loading = false;
        this.alertService.error(error.error.error);
        window.scrollTo(0, 0);
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.contactform.get('image').patchValue(file);
    this.contactform.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.contactform.get('image').valid) {
        this.imagePreview = reader.result as string;
        this.fileUploaded = true;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
    
  }
  onReset() {
    this.submitted = false;
    this.contactform.reset();
}
}
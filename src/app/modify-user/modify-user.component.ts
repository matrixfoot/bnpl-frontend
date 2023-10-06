import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Subscription } from 'rxjs';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertService } from '../_helpers/alert.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss']
})
export class ModifyUserComponent implements OnInit {
  public userForm: FormGroup; 
  public isloggedin=false; 
  public currentuser: User;
  public user: User;
  public codeValue: string;
  public secteurValue: string;
  public roleValue: string;
  public imagePreview:string
  private usersSub: Subscription;
  public loading = false;
  public optionValue:any;
  public option1Value:any;
  public option2Value:any;
  public option3Value:any;
  public submitted=false;
  fiscalmatPattern = "^[0-9]{7}$";
  fiscalmatletterPattern="^[A-Z]{1}$";
  fiscalmatnumbersPattern="^[0-9]{3}$";
  codepostalPattern: "^[a-zA-Z0-9]+{4}$"

  errormsg:string;
  activites: any[]=["Médecin","Avocat","Consultant","Expert","Infirmier","Masseur","Physiothérapeute","Ergothérapeute","Psychomotricien",
  "Diététicien","Orthophoniste","Orthoptiste","Sage-femmes","Architectes","Dessinateurs","Géomètres","Notaire","Huissiers notaire (de justice)", "Interprètes",
  "Ingénieurs-conseil","Topographes","Syndic des copropriétaires","Autre"];
  sousactivites: any[]=["Avocat","Avocat à la cour d'appel","Avocat à la cour de cassation","Médecin","Médecin spécialiste","Médecin dentiste","Médecin vétérinaire"];
  specialites: any[]=["Chirurgie générale",
  "Chirurgie pédiatrique",
  "Chirurgie carcinologique",
  "Chirurgie cardio-vasculaire",
  "Chirurgie vasculaire périphérique",
  "Chirurgie neurologique",
  "Chirurgie orthopédique et traumatologique",
  "Chirurgie plastique, réparatrice et esthétique",
  "Chirurgie urologique",
  "Gynéco-obstétrique",
  "ORL",
  "Stomatologie et chirurgie maxillo-faciale",
  "Ophtalmologie",
  "Chirurgie thoracique",
  "Anesthésie réanimation",
  "Psychiatrie",
  "Pédo-psychiatrie",
  "Imagerie médicale",
  "Anatomie",
  "Anatomie et cytologie pathologiques",
  "Carcinologie médicale",
  "Cardiologie",
  "Dermatologie",
  "Endocrinologie",
  "Gastro-entérologie",
  "Hématologie clinique",
  "Maladies infectieuses",
  "Médecine d’urgence",
  "Médecine de travail",
  "Médecine interne",
  "Médecine légale",
  "Médecine physique, rééducation et réadaptation fonctionnelle",
  "Médecine préventive et communautaire",
  "Néphrologie",
  "Neurologie",
  "Nutrition et maladies nutritionnelles",
  "Pédiatrie",
  "Pneumologie",
  "Radiothérapie carcinologique",
  "Réanimation médicale",
  "Rhumatologie",
  "Biophysique et médecine nucléaire",
  "Génétique",
  "Biologie médicale option biochimie",
  "Biologie médicale option hématologie",
  "Biologie médicale option parasitologie",
  "Biologie médicale option microbiologie",
  "Biologie médicale option immunologie",
  "Histo-embryologie",
  "Pharmacologie",
  "Physiologie et explorations fonctionnelles"];
  sousspecialites: any[]=[];
  sousactivitesavocat: string[]=["Avocat","Avocat à la cour d'appel","Avocat à la cour de cassation"];
  sousactivitesmedecin: string[]=["Médecin","Médecin spécialiste","Médecin dentiste","Médecin vétérinaire"];
  specialitesmedecinspecialiste: string[]=["Chirurgie générale",
  "Chirurgie pédiatrique",
  "Chirurgie carcinologique",
  "Chirurgie cardio-vasculaire",
  "Chirurgie vasculaire périphérique",
  "Chirurgie neurologique",
  "Chirurgie orthopédique et traumatologique",
  "Chirurgie plastique, réparatrice et esthétique",
  "Chirurgie urologique",
  "Gynéco-obstétrique",
  "ORL",
  "Stomatologie et chirurgie maxillo-faciale",
  "Ophtalmologie",
  "Chirurgie thoracique",
  "Anesthésie réanimation",
  "Psychiatrie",
  "Pédo-psychiatrie",
  "Imagerie médicale",
  "Anatomie",
  "Anatomie et cytologie pathologiques",
  "Carcinologie médicale",
  "Cardiologie",
  "Dermatologie",
  "Endocrinologie",
  "Gastro-entérologie",
  "Hématologie clinique",
  "Maladies infectieuses",
  "Médecine d’urgence",
  "Médecine de travail",
  "Médecine interne",
  "Médecine légale",
  "Médecine physique, rééducation et réadaptation fonctionnelle",
  "Médecine préventive et communautaire",
  "Néphrologie",
  "Neurologie",
  "Nutrition et maladies nutritionnelles",
  "Pédiatrie",
  "Pneumologie",
  "Radiothérapie carcinologique",
  "Réanimation médicale",
  "Rhumatologie",
  "Biophysique et médecine nucléaire",
  "Génétique",
  "Biologie médicale option biochimie",
  "Biologie médicale option hématologie",
  "Biologie médicale option parasitologie",
  "Biologie médicale option microbiologie",
  "Biologie médicale option immunologie",
  "Histo-embryologie",
  "Pharmacologie",
  "Physiologie et explorations fonctionnelles"];
  selected: any;
  activitesassociation: string[];
  activitesassociations: any[]=["Syndic des copropriétaires"];
  activitesliberales: string[]=["Médecin","Avocat","Consultant","Expert","Infirmier","Masseur","Physiothérapeute","Ergothérapeute","Psychomotricien",
  "Diététicien","Orthophoniste","Orthoptiste","Sage-femmes","Architectes","Dessinateurs","Géomètres","Notaire","Huissiers notaire (de justice)", "Interprètes",
  "Ingénieurs-conseil","Topographes","Autre"];
  constructor(private formBuilder: FormBuilder,
   
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.loading = true;


     if (this.tokenStorage.getToken()){
      this.isloggedin=true;
      this.currentuser =this.tokenStorage.getUser()
      this.userservice.getUserById(this.currentuser.userId).then(
        (user: User) => {
          this.loading = false;
          this.user = user;
          if (this.user.matriculefiscale){
          this.userForm = this.formBuilder.group({          
            role: [this.user.role,],
            firstname: [this.user.firstname,],
            lastname: [this.user.lastname,],
            confirmemail: [null],
            mobile: [this.user.mobile,],
            confirmmobile: [null],
            usertype: [this.user.usertype,],
            email: [this.user.email,],
            password: [null,],
            confirmpassword: [null,],
            civilite: [this.user.civilite,],
            nature: [this.user.nature,],
            raisonsociale: [this.user.raisonsociale,],
            image: [this.user.ficheUrl||'',],
            selectactivitynature: [null,],
            selectactivity:[null,],
            selectunderactivity:[null,],
            selectfiscalimpot:[null,],
            fiscaltvaassobli: [{value:"Assujeti Obligatoire",disabled:true}],
            fiscalmat: [this.user.matriculefiscale.split(' ')[0],[Validators.pattern(this.fiscalmatPattern),Validators.maxLength(7),Validators.required]],
            fiscalmatletter: [this.user.matriculefiscale.split(' ')[1].split('/')[0],[Validators.pattern(this.fiscalmatletterPattern),Validators.maxLength(1),Validators.required]],
            fiscalmatinchanged: [{value:this.user.matriculefiscale.split(' ')[1].split('/')[1],disabled:true}],
            fiscalmatinchanged2: [{value:this.user.matriculefiscale.split(' ')[1].split('/')[2],disabled:true}],
            fiscalmatnumbers: [this.user.matriculefiscale.split('/')[3],[Validators.pattern(this.fiscalmatnumbersPattern),Validators.maxLength(3),Validators.required]],
            clientcode: [{value:this.user.clientcode,disabled:true}],
          },
          )}
          else {
            this.userForm = this.formBuilder.group({
              
              role: [this.user.role,],
              firstname: [this.user.firstname,],
              lastname: [this.user.lastname,],
              confirmemail: [null],
              mobile: [this.user.mobile,],
              confirmmobile: [null],
              usertype: [this.user.usertype,],
              email: [this.user.email,],
              password: [null,],
              confirmpassword: [null,],
              civilite: [this.user.civilite,],
              nature: [this.user.nature,],
              raisonsociale: [this.user.raisonsociale,],
              image: [this.user.ficheUrl||'',],
              selectactivitynature: [null,],
              selectactivity:[null,],
              selectunderactivity:[null,],
              selectfiscalimpot:[null,],
              fiscaltvaassobli: [{value:"Assujeti Obligatoire",disabled:true}],
              fiscalmat: [this.user.matriculefiscale,[Validators.pattern(this.fiscalmatPattern),Validators.required]],
              fiscalmatletter: [null,[Validators.pattern(this.fiscalmatletterPattern),Validators.maxLength(1),Validators.required]],
              fiscalmatinchanged: [{value:"A",disabled:true}],
              fiscalmatinchanged2: [{value:"P",disabled:true}],
              fiscalmatnumbers: ["000",[Validators.pattern(this.fiscalmatnumbersPattern),Validators.maxLength(3),Validators.required]],
              clientcode: [{value:this.user.clientcode,disabled:true}],
            },
            )
          }
          this.loading = false;
          
        }
      )}
            
            else {this.router.navigate(['login'])};
           
            
           
           
          }
          
          get f() { return this.userForm.controls; } 

  
  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if (this.userForm.invalid) {
      
     return this.loading = false;
  }
    this.alertService.clear();
    const user = new User();
    user.userId = this.currentuser.userId;
    user.role = this.userForm.get('role').value;
    user.email = this.userForm.get('email').value;
    user.password =this.userForm.get('password').value;
    user.mobile = this.userForm.get('mobile').value;
    user.usertype =this.userForm.get('usertype').value;
    user.confirmpassword =this.userForm.get('confirmpassword').value;
    user.firstname = this.userForm.get('firstname').value;
    user.lastname = this.userForm.get('lastname').value;
    user.ficheUrl=''

    user.matriculefiscale = this.userForm.get('fiscalmat').value+' '+this.userForm.get('fiscalmatletter').value+'/'+this.userForm.getRawValue().fiscalmatinchanged+'/'     
    +this.userForm.getRawValue().fiscalmatinchanged2+'/'+this.userForm.get('fiscalmatnumbers').value;

    user.civilite = this.userForm.get('civilite').value;
    user.nature = this.userForm.get('nature').value;
    user.raisonsociale = this.userForm.get('raisonsociale').value;
    user.clientcode = this.userForm.get('clientcode').value;
    user.ficheUrl=''
    console.log(this.userForm.getRawValue().fiscalmatinchanged)
    console.log(this.userForm.getRawValue().fiscalmatinchanged2)
    this.userservice.modifyUserwithimageById(this.user._id, user, this.userForm.get('image').value).then(  
      () => {
       this.userForm.reset();
        this.loading = false;
        this.alertService.success('Modification effectuée avec succès!', { keepAfterRouteChange: true });
        window.scrollTo(0, 0);
        this.router.navigate(['profil'])
        
        
        
      },
      (error) => {
        this.loading = false
        
      }
    );
  }
  update0(e)
  {

    this.selected = e.target.value
    if(this.userForm.get('activitynature').value=='Profession Libérale')
{
  this.userForm.patchValue({
    fiscalmatinchanged:'A',
    fiscalmatinchanged2:'P',
    fiscalmatnumbers:'000'
  })
}
    if(this.selected=='associations et syndics')
    {
this.activites=this.activitesassociations
    }
    else if (this.selected=='Profession Libérale')
    {
      this.activites=this.activitesliberales
    }
    else{
      this.activites=[]
    }
    this.userForm.patchValue({
      activity:'',
      selectactivity:'',
      underactivity:'',
      selectunderactivity:'',
      specialite: '',
      sousspecialite: '',
    })
  }
  update(e)
  {
    this.selected = e.target.value
    if(this.userForm.get('activity').value=='Syndic des copropriétaires')
{
  console.log('here')
  this.userForm.patchValue({
    fiscalmatinchanged:'N',
    fiscalmatinchanged2:'N',
    fiscalmatnumbers:'000'
  })
}
    if(this.selected=='Avocat')
    {
this.sousactivites=this.sousactivitesavocat
    }
    else if (this.selected=='Médecin')
    {
      this.sousactivites=this.sousactivitesmedecin

    }
    else{
      this.sousactivites=[]
      this.specialites=[]
      this.sousspecialites=[]
    }
    this.userForm.patchValue({
      
      underactivity:'',
      selectunderactivity:'',
      specialite: '',
      sousspecialite: '',
    })
  }
  update2(e)
  {
    this.selected = e.target.value
    
    if(this.selected=='Médecin spécialiste')
    {
this.specialites=this.specialitesmedecinspecialiste
    }
   
    else{
      this.specialites=[]
      this.sousspecialites=[]

    }
    this.userForm.patchValue({
      specialite: '',
      sousspecialite: '',
    })
  }
  update3(e)
  {
  }
  sort()
  {
    this.specialites.sort()
    this.sousactivites.sort()
    this.activites.sort()
  }
  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.userForm.get('image').patchValue(file);
    this.userForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.userForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
  reloadPage (){
    setTimeout(() => window.location.reload(), 3000);
    
    
  }
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  
}

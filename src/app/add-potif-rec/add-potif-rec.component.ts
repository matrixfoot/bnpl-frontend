import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { UserService } from '../services/user.service';
import { CommunService } from '../services/commun';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { MotifreclamationService } from '../services/motifreclamation';
import { Motif } from '../models/motifreclamation';

@Component({
  selector: 'app-add-potif-rec',
  templateUrl: './add-potif-rec.component.html',
  styleUrls: ['./add-potif-rec.component.scss']
})
export class AddPotifRecComponent implements OnInit {
  exceljsondata4=[];
  file: File;
  uploadEvent: any;
  arrayBuffer: string | ArrayBuffer;
  motifform: FormGroup;
  public ammounts2: FormArray;
  currentUser: any;
  motifs=[];
  motifsSub: any;
  loading: boolean;
motifreclamation:Motif
  constructor(private userservice: UserService,private formBuilder: FormBuilder,private commun: CommunService,
    private router: Router,private token:TokenStorageService, private motifservice:MotifreclamationService) {
      this.motifform = this.formBuilder.group({
        ammounts2: this.formBuilder.array([ this.createammount2() ])
     });

     }
  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.motifsSub = this.motifservice.motifreclamations$.subscribe(
      (motifs) => {
        this.motifreclamation=motifs[0];
        this.motifs = motifs[0].groupe;
        console.log(motifs)
        this.motifform = new FormGroup({          
          ammounts2: new FormArray(this.motifs.map(item => {
            const group = this.createammount2();
            //@ts-ignore
            group.patchValue({
              groupe:item.groupe,
              famille:item.famille,
              code:item.code,
              motif:item.motif,
              contientfichier:item.contientfichier,
              delai:item.delai
            });
            return group;
          }))
        });
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        
      }
    );
    
      this.motifservice.getmotifreclamationss();
  }
  get ammountControls2() {
    return this.motifform.get('ammounts2')['controls'];
  }
  addammount2(){
    this.ammounts2 = this.motifform.get('ammounts2') as FormArray;
    this.ammounts2.push(this.createammount2());
  }
  removeammount2(i: number) {
    this.ammounts2.removeAt(i); 
  }
  createammount2(): FormGroup {
    return this.formBuilder.group({
      famille: '',
      groupe: '',
      code: '',

      motif: '',
      document: '',
      delai: '',
      contientfichier: '',

    });
  }
  submit() {
    this.loading = true;
    const motif = new Motif();
    
  motif.groupe =[];
  motif.groupe=this.motifform.get('ammounts2').value
  this.motifs.length==0?
  //@ts-ignore
  this.motifservice.createwithoutfile(motif).then(
    (data:any) => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'motifs ajoutés avec succès!',
        showConfirmButton: false,
        timer: 6000 
      });
    },
    (error) => {
      this.loading = false;                
    }
  ) :
  this.motifservice.modifymotifreclamationreqById(this.motifreclamation._id,motif).then(
    (data:any) => {
      this.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'motifs ajoutés avec succès!',
        showConfirmButton: false,
        timer: 6000 
      });
    },
    (error) => {
      this.loading = false;                
    }
  ) 
  }
  onFileChange3(event,i:number) {
    this.exceljsondata4=[]
    if (event.target.files.length > 0) 
    {
      this.file = event.target.files[0];
      this.uploadEvent = event;
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      //@ts-ignore
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var j = 0; j != data.length; ++j)
        arr[j] = String.fromCharCode(data[j]);
      var bstr = arr.join("");
      var workbook = read(bstr, {
        type: "binary"
      });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata4 = utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
      });
      console.log(this.exceljsondata4)
      this.motifform = new FormGroup({          
        ammounts2: new FormArray(this.exceljsondata4.map(item => {
          const group = this.createammount2();
          //@ts-ignore
          group.patchValue({
            groupe:item.groupe,
            famille:item.famille,
            code:item.code,
            motif:item.libelle,
            contientfichier:item.document,
            delai:item.delai
          });
          return group;
        }))
      });
      
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}

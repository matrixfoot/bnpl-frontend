
export class Deccomptabilite {
  userId: string;
  _id:string;
  nature:string;
  registrecommerce:string;
  matriculefiscale:string;
  codetva:string;
  codegenre:string;
  raisonsociale:string;
  adresse:string;
  codepostal:string;
  activite:string;
  sousactivite:string;
  datearretactivite:string;
  regimefiscalimpot:string;
  firstname:string;
  lastname:string;
  codedeclaration:string;
  mois:string;
  annee:string;
  debitmoisprecedent:string;
  creditmoisprecedent:string
  moisreleve:string
  anneereleve:string
  totalht:number
  totaltva:number
  realtotaltva:number
  totaldt:number
  totalttc:number
  totalht19:number
  totaltva19:number
  realtotaltva19:number
  totaldt19:number
  totalttc19:number
  totalht0:number
  totaltva0:number
  realtotaltva0:number
  totaldt0:number
  totalttc0:number
  totalht019:number
  totaltva019:number
  realtotaltva019:number
  totaldt019:number
  totalttc019:number
  totalht2:number
  totaltva2:number
  totaldt2:number
  totalttc2:number
  totalht219:number
  totaltva219:number
  totaldt219:number
  totalttc219:number
  totalrecette:number
  totalrecette19:number
  totalht3:number
  totaltva3:number
  totaldt3:number 
  totalttc3:number
  totaldebit:number
  totalcredit:number
  totalsoldemois:number
  totalsalairebrut:number
  totalcnss:number
  totalsalaireimposable:number
  totalretenueimpot:number
  totalavancepret:number
  totalsalairenet:number
  affecte:string;
  dateaffectation:string;
  created:Date;
  updated: Date;
  dateouverturedossier:number
  statutadmin:string[]
  statutcollab:string[]
autre0:Autre0[]
autre1:Autre[]
autre2bis:Autre2bis[]
autre2:Autre2[]
autre1bis:Autrebis[]
autre3:Autre3[]
autre3bis:Autre3bis[]
autre4:Autre4[]
autre4bis:Autre4bis[]
autre5:Autre5[]
autre5bis:Autre5bis[]
autre6:Autre6[]
autre6bis:Autre6bis[]
}
export interface Autre0 {
  type:string,
  jour: string,
  date: string,
  numeronote:string,
  montantht:string,
  montantht19:string,
  montanttva:string,
  montanttva19:string,
  montantdt:string,
  montantttc:string,
  montantttc19:string,
  client:string,
  autreclient:string,

}
export interface Autre {
        type:string,
        numeropiece:string,
        jour: string,
        date: string,
        numeronote:string,
        montantht:string,
        montantht19:string,

        montanttva:string,
        montanttva19:string,

        montantdt:string,
        montantttc:string,
        montantttc19:string,

        client:string,
        autreclient:string,

}
export interface Autrebis {
  code:string,
  journal: string,
  date: string,
  prefixe:string,
  numeropiece:string,
  libelle:string,
  numeroexterne:string,
  reflettrage:string,
  compte:string,
  sens:string,
  montant:number,

}
export interface Autre2 {
      type:string,
      jour: string,
      numeropiece:string,
      date: string,
      recette:string,
      recette19:string,

      montantht:string,
      montantht19:string,

      montanttva:string,
      montanttva19:string,

      montantdt:string,
      montantttc:string,
      montantttc19:string,
}
export interface Autre2bis {
  code:string,
  journal: string,
  date: string,
  prefixe:string,
  numeropiece:string,
  libelle:string,
  numeroexterne:string,
  reflettrage:string,
  compte:string,
  sens:string,
  montant:number,
}
export interface Autre3 {
      type:string,
      numeropiece:string,
      jour: string,
      date: string,
      fournisseur:string,
      autrefournisseur:string,
      numerofacture:string,
      natureachat:string,
      autrenatureachat:string,
      montantht:string,
      montanttva:string,
      montantdt:string,
      montantttc:string,
      reglement:string,
      ficheUrl:string,
      contientfiche:boolean
}
export interface Autre3bis {
  code:string,
  journal: string,
  date: string,
  prefixe:string,
  numeropiece:string,
  libelle:string,
  numeroexterne:string,
  reflettrage:string,
  compte:string,
  sens:string,
  montant:number,
}
export interface Autre4 {
  type:string,
  banque:string,
  numerocompte:string,
  soldedebit:string,
  soldecredit:string,
  mouvements:[]
}
export interface Autre4bis {
  code:string,
  journal: string,
  date: string,
  prefixe:string,
  numeropiece:string,
  libelle:string,
  numeroexterne:string,
  reflettrage:string,
  compte:string,
  sens:string,
  montant:number,
}
export interface Autre5 {
  type:string,
  annee: string,
  mois: string,
  ficheUrl:string,
  contientfiche:boolean

}
export interface Autre5bis {
  code:string,
  journal: string,
  date: string,
  prefixe:string,
  numeropiece:string,
  libelle:string,
  numeroexterne:string,
  reflettrage:string,
  compte:string,
  sens:string,
  montant:number,
}
export interface Autre6 {
  type:string,
      matricule: string,
      nomprenom: string,
      salairebrut:string,
      montantcnss:string,
      montantimposable:string,
      montantretenue:string,
      montantavance:string,
      salairenet:string,
      reglement:string,
      ficheUrl:string,
      contientfiche:boolean
    }
    export interface Autre6bis {
      code:string,
      journal: string,
      date: string,
      prefixe:string,
      numeropiece:string,
      libelle:string,
      numeroexterne:string,
      reflettrage:string,
      compte:string,
      sens:string,
      montant:number,
    }
export class User {   
  userId: string;
  email: string;
  _id:string;
  password: string;
  confirmpassword: string;
  firstname:string;
  lastname:string;
  mobile:string;
  usertype:string;
  civilite:string;
  nature:string;
  ficheUrl:string;
  raisonsociale:string;
  nomsociete:string;
  clientcode: string;
  role: string;
  banque: string;
  accessToken: string;
  verified:Date;
  created:Date;
  acceptTerms:Boolean;
resetToken: Boolean;
passwordReset:Boolean;
matriculefiscale:string
updated: Date;
connected: Boolean;
desactive:{statut: string, date:Date};
restaured:Date;
compte:  String 
carte:  String 
affiliation:  String 
terminal:  String 
matfiscale:  String 
habilitation:[]
contact:string
  }
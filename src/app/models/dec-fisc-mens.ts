export class Decfiscmens {
   
    userId: string;
    email: string;
    _id:string;
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
    nature:string;
    origine:string
    mois:string;
    annee:string;
    affecte:string;
    dateaffectation:string;
    created:Date;
    dateouverturedossier:number
  updated: Date;
  statutadmin:string[]
  statutcollab:string[]

  impottype1: {

type:string;
traitementetsalaire:{
salairebrut:string;
salaireimposable:string;
retenuealasource:string;
contributionsociale:string;
}
location1:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
location2:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
location3:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
location4:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
honoraire1:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
honoraire2:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
honoraire3:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
montant10001:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
montant10002:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
montant10003:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
montant10004:{
    type:string;
    montantbrut:string;
    taux:string;
    montantnet:string;
    montantretenue:string;
}
autre:string[]
  }
  impottype2: {

    type:string;
    reporttvamoisprecedent:string;
    tvacollecter:{
    type:string;
    chiffreaffaireht:string;
    tvaammount:string;
    ammountttc:string;
    
    }
    tvacollecter19:{
        type:string;
        chiffreaffaireht:string;
        tvaammount:string;
        ammountttc:string;
        
        }
    tvarecuperableimmobilier:{
        type:string;
    achatlocauxht:string;
    achatlocauxtva:string;
    
    
    }
    tvarecuperableequipement:{
        type:string;
    achatlocauxht:string;
    achatlocauxtva:string;
    achatimporteht:string;
    achatimportetva:string;
    
    
    }
    tvarecuperableautreachat:{
        type:string;
    achatlocauxht:string;
    achatlocauxtva:string;
    achatimporteht:string;
    achatimportetva:string;
    
    
    }
    locationhabitationmeuble:{
        type:string;
        htammount:string;
        tvaammount:string;
        ttcammount:string;
        }
    locationusagecommercial:{
        type:string;
            htammount:string;
            tvaammount:string;
            ttcammount:string;
            }
    operationlotissement:{
        type:string;
                htammount:string;
                tvaammount:string;
                ttcammount:string;
                }
    interetpercue:{
        type:string;
                    htammount:string;
                    tvaammount:string;
                    ttcammount:string;
                    }
    autretvaspecial:{
        type:string;
                        htammount:string;
                        tvaammount:string;
                        ttcammount:string;
                        taux:string
                        }       
    }
    impottype3: {

        type:string;
        tfpsalairebrut:string;
        basetfp:string;
        montanttfpmois:string;
        reporttfpmoisprecedent:string;
        montantavance:string;
        salairesnonsoumistfp:string;
        tfppayer:string;
        tfpreporter:string;
        
        }
    impottype4: {

            type:string;
            foprolossalairebrut:string;
            basefoprolos:string;
            montantfoprolos:string;
            salairesnonsoumisfoprolos:string
            }
    impottype5: {

                type:string;
                nombrenotehonoraire:string;
                totaldroittimbre:string;
                }
    impottype6: {

                    type:string;
                    chiffreaffairettc:string;
                    tclpayer:string;
                    }
                    impottype7: {

                        type:string;
                        chiffreaffaireht:string;
                        montantcontribution:string;
                        }
}
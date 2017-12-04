export class offres{

   location : [
   { 
    name : string;
    pays: string;
    adresse:string ;
    tarif: number ;
    durée: number ;
    date_debut:string;
    option: string ;
    }];
   
   trajet : [
   { 
    name : string;
    depart: string;
    destination: string ;
    lieu_depart: string ;
    lieu_arrivé: string ;
    tarif: number;
    places_restantes:string ;
    date:string
    }
  ];

   voyage: [
   {
    name : string;
    pays: string;
    adresse_location:string;
    tarif: number;
    date_aller: string ;
    date_retour: string ;
    lieu_aller: string ;
    lieu_retour: string ;
    durée:number;
    description:string;
    }
  ]

}
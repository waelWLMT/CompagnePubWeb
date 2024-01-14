import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { DevisService } from 'src/app/services/devis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-compagn',
  templateUrl: './details-compagn.component.html',
  styleUrls: ['./details-compagn.component.scss']
})
export class DetailsCompagnComponent implements OnInit {


  public currentUser:any;

  public campaign: any;
  public detailedTowns: any;

  public displayDetails:any = false;
  public campaignState: any;


  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'Validé' },
    { stateId: 3, stateDescription: 'En Cours' },
    { stateId: 4, stateDescription: 'Clôturée' },
    { stateId: 5, stateDescription: 'Annulée' }
  ];

  constructor(private campaignService: CampaignService, private devisService: DevisService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getFileCampaign();
    this.initCurrentUser();
  }

  initCurrentUser(){
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUser = user;
  }

  closeCampaign(){
    if(this.currentUser.roleId === 1){
      Swal.fire({
        icon: "warning",
        title: 'La comapgne sera clôturer définitivement!',
        text: 'Êtes-vous sûre de vouloir continuer?',
        showCancelButton: true,
        confirmButtonText: `Continuer`,
        confirmButtonColor: '#d9534f',
        cancelButtonText: 'Annuler'
  
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          let campaignId = this.campaign.id;
          let userId = this.currentUser.id;
  
          this.campaignService.closeCampaign(campaignId, userId)
            .subscribe(response => {            
  
              Swal.fire({
                icon: 'success',
                title: 'succes',
                showConfirmButton: false, 
                timer: 1500               
              });              
             
              this.router.navigateByUrl('Lst_Compagne' ); 
              //this.router.navigateByUrl('Frm_Facture_details/'+ campaignId );            
  
            }, error => {
              Swal.fire({  
                icon: 'error',
                title: 'Problème de cloture de la compagne',
                showConfirmButton: false,
                timer: 1500
              })
            });
        }
  
      });

    }else{
      Swal.fire("Erreur", "Vous n'aves pas les droit de lancer la réalisation!", "error");
    }   
  }

  launchRealization(){

    if(this.currentUser.roleId === 1){
      Swal.fire({
        icon: "warning",
        title: 'La Réalisation da la comapgne sera lancée !',
        text: 'Êtes-vous sûre de vouloir continuer?',
        showCancelButton: true,
        confirmButtonText: `Continuer`,
        confirmButtonColor: '#d9534f',
        cancelButtonText: 'Annuler'
  
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          let campaignId = this.campaign.id;
          let userId = this.currentUser.id;
  
          this.campaignService.launchRealization(campaignId, userId)
            .subscribe(response => {            
  
              Swal.fire({
                icon: 'success',
                title: 'succes',
                showConfirmButton: false, 
                timer: 1500               
              });

              this.router.navigateByUrl('Lst_Compagne');            
  
            }, error => {
              Swal.fire({  
                icon: 'error',
                title: 'Problème de lancement de la compagne',
                showConfirmButton: false,
                timer: 1500
              })
            });
        }
  
      });

    }else{
      Swal.fire("Erreur", "Vous n'aves pas les droit de lancer la réalisation!", "error");
    }   
  }


  dupliquerCompagne(){
   
    // activer duplication d'un ancien campagne
    if(this.campaignState.stateId > 3){
      console.log("le traiatement se fait quand le compagne est déja clôturée");      
    }

    if(this.campaignState.stateId < 3){
      Swal.fire("Erreur", "Impossible de dupliquer une compagne non réalisée!", "error");
    }    

    Swal.fire({
      icon: "warning",
      title: 'La compagne sera dupliquée!',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {
      if (result.isConfirmed) {

        let campaignId = this.campaign.id;
        let userId = this.currentUser.id;

        this.campaignService.duplicateCampaign(campaignId, userId)
          .subscribe(response => {            

            Swal.fire({
              icon: 'success',
              title: 'succes',
              showConfirmButton: false,
              timer: 1500
            });

            this.router.navigateByUrl('Edit_Compagne/'+response);

          }, error => {
            Swal.fire({

              icon: 'error',
              title: 'Problème de duplication compagne',
              showConfirmButton: false,
              timer: 1500
            })
          });
      }
    });
  }

  setCampaignState(stateId){
    let index = this.campaignStates.findIndex(x => x.stateId === stateId);
    this.campaignState = this.campaignStates[index];
  }

  getFileCampaign(){

    this.displayDetails = false;
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");
    this.campaignService.getCampaignById(campaignId)
    .subscribe(response=>{

      this.campaign = response;        
      this.setCampaignState(this.campaign.campaignState); 
      this.getDetailedCampaignTowns();
    }, error=>{
      console.log(error);
    });
  }

  getDetailedCampaignTowns(){
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");

    this.campaignService.getDetailedCampaignTownsList(campaignId)
    .subscribe(response=>{
      this.detailedTowns = response;

      this.displayDetails = true;
    }, error =>{console.log(error);}
    ); 
  }

  countBusinessCost(){
    let businessCost = 0;

    //businessCost = this.campaign.campaignProducts.finalUnitPrice 
    this.campaign.campaignProducts.forEach(item => {
      businessCost += item.finalUnitPrice;
    });

    businessCost = businessCost * (this.campaign.penetraionRate / 100) ; 

    return businessCost;
  }


}

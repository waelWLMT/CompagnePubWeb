import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {

  public campaign: any;
  public displayData: any = false;
  public isEditAutorized: any;

  public detailedCampaignTownsList: any;

  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'Validé' },
    { stateId: 3, stateDescription: 'En Cours' },
    { stateId: 4, stateDescription: 'Clôturée' },
    { stateId: 5, stateDescription: 'Annulée' }   
  ];

  public campaignState: any;

  constructor(private campaignService: CampaignService, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {    
    this.getCampaignById();
  }

  getCampaignById() {

    this.displayData = false;
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");

    this.campaignService.getCampaignById(campaignId)
      .subscribe(response => {

        this.campaign = response;
        this.campaign.executionDate = this.datePipe.transform(this.campaign.executionDate, 'yyyy-MM-dd');
        let index = this.campaignStates.findIndex(x => x.stateId === this.campaign.campaignState);
        this.campaignState = this.campaignStates[index];
        this.displayData = true;

        this.isEditAutorized = this.campaign.campaignState == 1 ? true : false;        

        // get campaignTown Map
        this.getDetailedTownsList();




      }, error => {
        console.log(error);
      }
      );
  }

  //#region -------------------------------------------Begin Campaign Towns Management

  deleteCampaignTown(townId) {
    let campaignId = this.campaign.id;

    Swal.fire({
      icon: "warning",
      title: 'La ville sera supprimé définitivement!!',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed) {
        this.campaignService.deleteCampaignTown(campaignId, townId)
          .subscribe(response => {
            this.campaign = response;

            // get campaignTown Map
            this.getDetailedTownsList();

            Swal.fire({
              icon: 'success',
              title: 'succes',
              showConfirmButton: false,
              timer: 1500
            })

          }, error => {
            Swal.fire({

              icon: 'error',
              title: 'Problème de suppression ville',
              showConfirmButton: false,
              timer: 1500
            })
          });
      }

    });


  }

  addCampaigntown(townId) {
    let campaignId = this.campaign.id;

    Swal.fire({
      icon: "warning",
      title: 'La ville sera affectée',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed){
        this.campaignService.addCampaignTown(campaignId, townId)
        .subscribe(response => {
          this.campaign = response;
  
          // get campaignTown Map
          this.getDetailedTownsList();
  
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            showConfirmButton: false,
            timer: 1500
          })
  
        }, error => {
          Swal.fire({
  
            icon: 'error',
            title: "Problème d'ajout ville",
            showConfirmButton: false,
            timer: 1500
          })
        });

      }

    });

  

  }

  getDetailedTownsList() {

    if (this.campaign != undefined) {
      let campaignId = this.campaign.id;

      this.campaignService.getDetailedCampaignTownsList(campaignId)
        .subscribe(response => {
          this.detailedCampaignTownsList = response;
        }, error => {
          console.log(error);
        });
    }
  }

  //#endregion

  //#region -------------------------------------------Begin Campaign Products Management

  deleteProductById(productId) {
    let campId = this.campaign.id;
    let prodId = productId;


    Swal.fire({
      icon: "warning",
      title: 'Le produit sera supprimé définitivement!!',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed) {
        this.campaignService.deleteCampaignProduct(campId, prodId)
          .subscribe(response => {
            this.campaign = response;

            Swal.fire({
              icon: 'success',
              title: 'succes',
              showConfirmButton: false,
              timer: 1500
            })

          }, error => {
            Swal.fire({

              icon: 'error',
              title: 'Problème de suppression produit',
              showConfirmButton: false,
              timer: 1500
            })
          });
      }

    });


  }

  updateCampaignProduct(productUpdateDto) {
    let campId = this.campaign.id;

    Swal.fire({
      icon: "warning",
      title: 'Le produit sera modifié !',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#007bff',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed) {
        // il faut créer le web api
        this.campaignService.updateCampaignProduct(campId, productUpdateDto)
          .subscribe(response => {
            this.campaign = response;

            Swal.fire({
              icon: 'success',
              title: 'succes',
              showConfirmButton: false,
              timer: 1500
            })

          }, error => {
            Swal.fire({

              icon: 'error',
              title: 'Problème de modification produit',
              showConfirmButton: false,
              timer: 1500
            })
          });
      }

    });
  }

  addNewCampaignProduct(productTypeId) {

    let campaignId = this.campaign.id;

    Swal.fire({
      icon: "warning",
      title: 'Le produit sera affecté',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed){
        this.campaignService.addCampaignProduct(campaignId, productTypeId)
        .subscribe(response => {
          this.campaign = response;
  
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            showConfirmButton: false,
            timer: 1500
          })
  
        }, error => {
          Swal.fire({  
            icon: 'error',
            title: "Problème d'affectation produit",
            showConfirmButton: false,
            timer: 1500
          })
        });

      }
    });


    
  }

  //#endregion


  //#region ------------------------------------------- Begin Campaign Business types Management
  addNewCampaignBusinessType(businessTypeMapCode) {

    let campaignId = this.campaign.id;

    Swal.fire({
      icon: "warning",
      title: 'Le produit sera affecté',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed){

        this.campaignService.addCampaignBusinessType(campaignId, businessTypeMapCode)
        .subscribe(response => {
          this.campaign = response;
  
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            showConfirmButton: false,
            timer: 1500
          })
  
        }, error => {
          Swal.fire({
  
            icon: 'error',
            title: "Problème d'ajout type de business",
            showConfirmButton: false,
            timer: 1500
          })
        });


      }});
  }

  deleteCampaignBusinessTypeByMapCode(mapCode) {
    let campId = this.campaign.id;
    let BusinessTypeMapCode = mapCode;

    Swal.fire({
      icon: "warning",
      title: 'Le Type de business sera supprimé définitivement!!',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed) {
        this.campaignService.deleteCampaignBusinessType(campId, BusinessTypeMapCode)
          .subscribe(response => {
            this.campaign = response;

            Swal.fire({
              icon: 'success',
              title: 'Succès',
              showConfirmButton: false,
              timer: 1500
            })

          }, error => {
            Swal.fire({
              icon: 'error',
              title: 'Problème se suppression type de business',
              showConfirmButton: false,
              timer: 1500
            })
          });
      }

    });
  }
  //#endregion

  //#region ------------------------------------------- Begin Campaign Global Parameters Management
  updateCampaignGlobalParams(globalParams) {

    let campaignId = this.campaign.id;
    let campaignGlobalParmsUpdateDto = globalParams;

    Swal.fire({
      icon: "warning",
      title: 'Les paramétre globale de la compagne seront modifié!',
      text: 'Êtes-vous sûre de vouloir continuer?',
      showCancelButton: true,
      confirmButtonText: `Continuer`,
      confirmButtonColor: '#d9534f',
      cancelButtonText: 'Annuler'

    }).then((result) => {

      if (result.isConfirmed) {
        this.campaignService.updateCampignGlobalParams(campaignId, campaignGlobalParmsUpdateDto)
          .subscribe(response => {
            this.campaign = response;
            this.campaign.executionDate = this.datePipe.transform(this.campaign.executionDate, 'yyyy-MM-dd');

            Swal.fire({
              icon: 'success',
              title: 'Succès',
              showConfirmButton: false,
              timer: 1500
            })

          }, error => {
            Swal.fire({
              icon: 'error',
              title: 'Problème de modification compagne',
              showConfirmButton: false,
              timer: 1500
            })
          });
      }

    });

  }

  goToDetailsCampaignPage(param){
    this.router.navigateByUrl(param + this.campaign.id);   
  }

  //#endregion

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignBusinessUpdateDto } from 'src/app/models/CampaignBusinessUpdateDto';
import { CampaignService } from 'src/app/services/campaign.service';
import { PhotoService } from 'src/app/services/photo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-campaign-businesses',
  templateUrl: './list-campaign-businesses.component.html',
  styleUrls: ['./list-campaign-businesses.component.scss']
})
export class ListCampaignBusinessesComponent implements OnInit {

  public showList: any;

  public campaignDetails: any;
  public campaignBusinesses: any;

  public businessTypesList: any;
  public townsList: any;

  public selectedTownId: any;
  public selectedBusinessTypeId: any;
  public selectedBusinessName: any;
  public businessStateId: any;

  public searchCreteria: any = '';

  public businessStateList: any =
    [
      { stateId: 1, description: 'A faire' },
      { stateId: 2, description: 'En cours' },
      { stateId: 3, description: 'Fini' },
      { stateId: 4, description: 'Annulé' }
    ];

  public selectedStateId: any;

  public modalBusiness: any;
  public currentUser: any;
  public page: any = 1;
  public nbrItemPerPage: any = 5;
  public selectedPhotos: any[];

  public selectedBusiness: any;  
  public selectedCampaignId: any;

  constructor(private campaignService: CampaignService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initCurrentUser();
    this.getCampaignFullData();
  }

  initCurrentUser() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUser = user;
  } 

  setModalGalleryBusiness(business){
    this.selectedBusiness = business;
    this.selectedCampaignId = business.compagnId;
  }

  setListPhotos(event ){
    const filesList = event.target.files;
    this.selectedPhotos = filesList;   
  }
  
  setModalBusiness(business) {
    if (this.showList) {      
      this.modalBusiness = business;
      this.modalBusiness.cityName = this.getTownName(business.businessTownId)
      this.modalBusiness.businessTypeName = this.getBusinessTypeName(business.businessTypeId);
      this.modalBusiness.currentStateDescription = this.getBusinessState(business.state);
      
      this.selectedStateId = business.state;      
    }
  }

  verifUpdateValid(oldState, newState) {

    let valid = true;
    let msg = '';

    if (this.currentUser.roleId === 2) {
      valid = false;
      msg = "Vous n'aves pas le droit de modifier le business";
    }

    if ((newState < oldState) || (oldState == 4)) {
      valid = false;
      msg = "Modification impossible!";
    }

    if (!valid) {
      Swal.fire("Erreur", msg, "error");
    }

    return valid;

  }

  updateBusinessState(business) {

    let valid = this.verifUpdateValid(this.modalBusiness.state, this.selectedStateId);    

    if (valid) {

      Swal.fire({
        icon: "warning",
        title: "L'etat de business va être modifiée",
        text: 'Êtes-vous sûre de vouloir continuer?',
        showCancelButton: true,
        confirmButtonText: `Continuer`,
        confirmButtonColor: '#d9534f',
        cancelButtonText: 'Annuler'

      }).then((result) => {

        if (result.isConfirmed) {

          let businessUpdateDto: CampaignBusinessUpdateDto = {
            campaignId: this.campaignDetails.id,
            businessCampaignId: this.modalBusiness.campaignBusinessId,
            newStateId: this.selectedStateId,
            oldStateId: this.modalBusiness.state,
            userModifId: this.currentUser.id
          };    
          
          var listPhoto = this.selectedPhotos;

          if(!listPhoto){
            Swal.fire({
              icon: 'error',
              title: 'Veuillez verifier les champs obligatoires',
              showConfirmButton: false,
              timer: 1500
            });
            return ;
          }

          this.campaignService.updateCampaignBusiness(businessUpdateDto, listPhoto)
            .subscribe(response => {                              
            
              Swal.fire({
                icon: 'success',
                title: 'succes',
                showConfirmButton: false,
                timer: 2000
              });

              this.getCampaignFullData();              

            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Problème de modification état de business',
                showConfirmButton: false,
                timer: 1500
              })
            });


        }

      });


    }

  }

  getBusinessState(stateId) {
    let index = this.businessStateList.findIndex(x => x.stateId == stateId);
    if (index != -1)
      return this.businessStateList[index].description;
  }

  getBusinessTypeName(businessTypeId) {

    let index = this.businessTypesList.findIndex(x => x.id == businessTypeId);
    if (index != -1) {
      return this.businessTypesList[index].code;
    }

  }

  getTownName(townId) {
    let index = this.townsList.findIndex(x => x.id == townId);
    if (index != -1) {
      return this.townsList[index].city;
    }
  }

  getCampaignFullData() {
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");
    this.showList = false;

    this.campaignService.getCampaignById(campaignId)
      .subscribe(response => {
        this.campaignDetails = response;
        this.businessTypesList = this.campaignDetails.campaignBusinessTypes;
        this.townsList = this.campaignDetails.campaignTowns;
        this.campaignBusinesses = this.campaignDetails.campaignBusinesses;
        this.setBusinessAdditionalData();
        this.showList = true;
        this.page = 1;
      });
  }

  setBusinessAdditionalData() {
    let tempBusiness = [];

    this.campaignBusinesses.forEach(item => {
      item.townName = this.getTownName(item.businessTownId);
      item.stateName = this.getBusinessState(item.state);
      item.busninessTypeName = this.getBusinessTypeName(item.businessTypeId);
      item.businessName = item.place.name;

      tempBusiness.push(item);
    });

    this.campaignBusinesses = tempBusiness;

  }


}

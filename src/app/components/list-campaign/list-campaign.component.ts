import { DatePipe } from '@angular/common';
//import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCampaignCreteria } from 'src/app/models/SearchCampaignCreteria';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { ClientService } from 'src/app/services/client.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { RegionService } from 'src/app/services/region.service';
import { TownService } from 'src/app/services/town.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.component.html',
  styleUrls: ['./list-campaign.component.scss']
})
export class ListCampaignComponent implements OnInit {

  public showList:any = false;
  public campaignsList:any;
  public currentUser: any;
  public searchcriteria: SearchCampaignCreteria;
  
  public searchStartDate:any;
  public searchEndDate:any;
  
  public clientList: any;
  public selectedClientId: any;

  public regionsList: any;
  public selectedRegionId: any;

  public productTypeList: any;
  public selectedProductTypeIds: any;

  public townsList: any;
  public selectedTownsIds: any;

  public businessTypeList: any;
  public selectedBusnissTypes: any;

  public userClientName: any;

  public page: any = 1;
  public nbrItemPerPage: any = 5;


  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'Validé' },
    { stateId: 3, stateDescription: 'En Cours' },
    { stateId: 4, stateDescription: 'Clôturée' },
    { stateId: 5, stateDescription: 'Annulée' }
  ];

  constructor(
    private campaignService: CampaignService, 
    private router: Router,  
    private datePipe: DatePipe, 
    private clientService: ClientService,
    private productTypeService: ProductTypeService,
    private regionService: RegionService,
    private businessTypeService: BusinessTypeService,
    private townService: TownService

    ) { }

  ngOnInit(): void {  
    
    this.initSearchCreteria();
    this.searchcriteria = new SearchCampaignCreteria();
    this.setCurrentUser(); 
    this.getListCampaigns();


    this.getAllClient();
    this.getAllProductType();
    this.getAllRegions();
    this.getAllBusinessTypes();

  }

  public getAllClient() {


    let roleId = this.currentUser.roleId;
    let clientId = roleId ===2 ? this.currentUser.clientId : -1;

    this.clientService.getAllClient()
      .subscribe(data => {
        this.clientList = data;

        if(roleId === 2){
          this.selectedClientId = clientId;
          this.userClientName = this.clientList.find(x=> x.id == clientId).name;
        }
          
      }, error => {
        console.log(error);
      });
  }

  public getAllProductType() {
    this.productTypeService.getAllProductTypes()
      .subscribe(data => {
        this.productTypeList = data;
      }, error => {
        console.log(error);
      });
  }

  getAllRegions() {
    this.regionService.getAllRegions()
      .subscribe(response => {
        this.regionsList = response;
      }, error => {
        console.log(error);
      });


  }

  getAllBusinessTypes() {
    this.businessTypeService.getAllBusinessTypes()
      .subscribe(response => {
        this.businessTypeList = response;
      }, error => {
        console.log(error);
      });
  }

  getTownsBySelectedRegion() {

    let regionId = this.selectedRegionId;
    let fullEntity = false;

    if (!isNaN(regionId) && regionId > 0) {

      Swal.fire({
        title: 'Recherche des ville',
        html: 'Chargement en cours!',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

      this.townService.getTownsByRegion(regionId, fullEntity)
        .subscribe(response => {
          this.townsList = response;
          Swal.close();
        }, error => {
          console.log(error);
        });
    }else{
      this.townsList = [];
      this.selectedTownsIds = [];
    }
  }

  initSearchCreteria(){    
    this.searchcriteria = new SearchCampaignCreteria();     
    
    let startDate = new Date();
    startDate.setDate(startDate.getDate() + -60);
    this.searchStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');    
    this.searchEndDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  }

  searchCampaign(form){
    let valid = this.verifAndBuildSearchCreteria(form.value);

    if(valid){
     
      Swal.fire({
        title: 'Recherche des ville',
        html: 'Chargement en cours!',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });      

      this.campaignService.searchCampaignsByCreteria(this.searchcriteria)
      .subscribe(response=>{
        this.campaignsList = response;
        Swal.close();
      }, error=>{
        console.log(error);
      })
    }
    
  }

  verifAndBuildSearchCreteria(formValue){

    let valid = true;
    let msg = "";

    this.searchcriteria.startDate = formValue.searchStartDate;
    this.searchcriteria.endDate = formValue.searchEndDate;
 
    if(this.currentUser.roleId === 2){
      this.searchcriteria.clientId = this.currentUser.id;
    }else{
      this.searchcriteria.clientId = this.selectedClientId != null && this.selectedClientId != undefined ? this.selectedClientId : null;
    }

    this.searchcriteria.regionId = this.selectedRegionId != undefined ? this.selectedRegionId : null;
    this.searchcriteria.towns = this.selectedTownsIds != undefined ? this.selectedTownsIds : null;

    this.searchcriteria.businessTypes = this.selectedBusnissTypes != undefined ? this.selectedBusnissTypes : null;

    // vérif de la période de creation de recherche
    if(this.searchcriteria.startDate != null && this.searchcriteria.endDate != null){

      if(this.searchcriteria.startDate > this.searchcriteria.endDate){
        valid = false;
        msg = "Veuillez vérifier la période de création des compagnes";
      }    

    }else{
      valid = false;
      msg = "Veuillez vérifier la période de creataion de recherche";
    }

    if(!valid)
      Swal.fire("Erreur", msg, "error");

    return valid;

  }
  
  setCurrentUser(){
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  getCampaignStateDescription(campaignStateId){
    let index = this.campaignStates.findIndex(x => x.stateId === campaignStateId);
    
    if(index != -1)
      return this.campaignStates[index].stateDescription;

    return "";
  }

  getListCampaigns(){

    let roleId = this.currentUser.roleId;
    let clientId = roleId === 2 ? this.currentUser.clientId : -1;

    this.showList = false;    
    
    this.campaignService.getAllCampaignsList()
    .subscribe(response => {   
      
      let list: any = response;      
      
      if(roleId === 2)
        this.campaignsList = list.filter(x=> x.customerId == clientId);
      else
        this.campaignsList = list;
       
      this.showList = true;
    
    });

  }

  goToCampaignBusinessList(campaign){

    let campaignId = campaign.id;

    if(campaign.campaignState == 3){
      this.router.navigateByUrl("LstCampaign_Businesses"+"/"+campaignId);
    }

  }

  goTo(campaign, isDetails){

    let pageUrl = '';
    if(isDetails)
      pageUrl = campaign.campaignState === 1 ? "Edit_Compagne/" : "Details_File_Compagne/";

    else 
      pageUrl = 'DetailedDevisCampaign/';

    this.router.navigateByUrl(pageUrl+ campaign.id);
    
  }

}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CampaignBusinessUpdateDto } from '../models/CampaignBusinessUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
 

  private apiUrl: any = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  //#region General campaign services


  // à compléter
  updateCampaignBusiness(businessUpdateDto: CampaignBusinessUpdateDto, listPhoto) {   
 
    let url = this.apiUrl + '/Campaign/UpdateCampaignBusinessState';
    url += '?campaignId='+ businessUpdateDto.campaignId;
    url += '&businessCampaignId='+ businessUpdateDto.businessCampaignId;
    url += '&oldStateId='+ businessUpdateDto.oldStateId;
    url += '&newStateId='+ businessUpdateDto.newStateId;
    url += '&userModifId='+ businessUpdateDto.userModifId;

    let formData = new FormData();

    for(const file of listPhoto){
      formData.append(file.name, file);
    };   

    return this.httpClient.post(url, formData, )

    // old code
    /*let url = this.apiUrl + '/Campaign/UpdateCampaignBusinessState/';
    url += businessUpdateDto.campaignId;

    return this.httpClient.put(url, businessUpdateDto);
    */
   
  }


  closeCampaign(campaignId, userId){
    let url = this.apiUrl + '/Campaign/CloseCampaign/';

    url += campaignId+'/';
    url += userId;

    return this.httpClient.get(url);
  }

  launchRealization(campaignId, userId){
    let url = this.apiUrl + '/Campaign/LaunchRealization/';

    url += campaignId+'/';
    url += userId;

    return this.httpClient.get(url);
  }

  
  searchCampaignsByCreteria(searchcriteria){
    let url = this.apiUrl + '/Campaign/SearchCampaign/';
    return this.httpClient.post(url, searchcriteria);
  }

  addCompaign(compagnDto: any) {
    let url = this.apiUrl + '/Campaign/';
    return this.httpClient.post(url, compagnDto);
  }

  getCampaignById(id: number) {

    let url = this.apiUrl + '/Campaign/';
    url += id;
    return this.httpClient.get(url);
  }
  
  updateCampignGlobalParams(campaignId, campaignGlobalParmsUpdateDto) {

    let url = this.apiUrl + '/Campaign/updateCampaignGlobalParams/';
    url += campaignId + '/';

    return this.httpClient.put(url, campaignGlobalParmsUpdateDto);
  }

  duplicateCampaign(campaignId, userId) {

    let url = this.apiUrl;
    url += '/Campaign/DuplicateCampagn/'+campaignId;
    url += '/'+ userId;

    return this.httpClient.get(url);

  }

  //#endregion


  //#region Towns Services

  getDetailedCampaignTownsList(campaignId) {

    let url = this.apiUrl + '/Campaign/getCampaignTownMap/';
    url += campaignId;
    return this.httpClient.get(url);

  }

  deleteCampaignTown(campaignId, townId) {

    let url = this.apiUrl + '/Campaign/deleteCampaignTown/';
    url += campaignId;
    url += "/" + townId;

    return this.httpClient.delete(url);
  }

  addCampaignTown(campaignId, townId) {

    let url = this.apiUrl + '/Campaign/addCampaignTown/';
    url += campaignId;
    url += "/" + townId;

    return this.httpClient.get(url);
  }

  getAllCampaignsList() {
    let url = this.apiUrl + '/Campaign/GetAllCampaigns';
    return this.httpClient.get(url);
  }

  //#endregion

  //#region  Campaign Products Services

  deleteCampaignProduct(campaignId, productTypeId) {

    let url = this.apiUrl + '/Campaign/deleteCamapaignProduct/';

    url += campaignId + '/';
    url += productTypeId;

    return this.httpClient.delete(url);
  }

  updateCampaignProduct(campaignId, productUpdateDto) {

    let url = this.apiUrl + '/Campaign/updateCamapaignProduct/';
    url += campaignId;

    return this.httpClient.put(url, productUpdateDto);
  }

  addCampaignProduct(campaignId, productTypeId) {
    let url = this.apiUrl + '/Campaign/addCamapaignProduct/';

    url += campaignId + '/';
    url += productTypeId;

    return this.httpClient.get(url);
  }

  //#endregion

  //#region Campaign Business types Services

  addCampaignBusinessType(campaignId, businessTypeMapCode) {
    let url = this.apiUrl + '/Campaign/addCampaignBusinessType/';

    url += campaignId + '/';
    url += businessTypeMapCode;

    return this.httpClient.get(url);
  }

  deleteCampaignBusinessType(campaignId, BusinessTypeMapCode) {

    let url = this.apiUrl + '/Campaign/deleteCampaignBusinessType/';

    url += campaignId + '/';
    url += BusinessTypeMapCode;

    return this.httpClient.delete(url);
  }



  //#endregion




}

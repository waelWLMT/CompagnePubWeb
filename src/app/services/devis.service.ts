import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  validateDevis(campaignId){
   
    let url = this.apiUrl+"/Quote/GenerateCampaignQuote/";
    url += campaignId
    return this.httpClient.get(url);
  }

  getAllDevis(userRoleId, customerId){
   
    let url = this.apiUrl+'/Quote/';
    url += userRoleId;
    url += '/'+ customerId;

    return this.httpClient.get(url);
  }

  getDetailsDevisById(idDevis){
  
    let url = this.apiUrl+'/Quote/';
    url += idDevis;

    return this.httpClient.get(url);
  }

  generateDevis(campaignId){
    
    let url = this.apiUrl+'/Devis/generateDevisCampaign/'; 

    return this.httpClient.post(url, campaignId );    
  }

  getDevisByCampaignId(campaignId){
   
    let url = this.apiUrl+'/Devis/generateDevisCampaign/';
    url += campaignId;

    return this.httpClient.get(url);
  }

}




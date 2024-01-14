import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getAllFacture(userRoleId, customerId){
   
    let url = this.apiUrl+'/Bill/GetBills/';
    url += userRoleId;
    url += '/'+ customerId;

    return this.httpClient.get(url);
  }

  getFactureByCampaignId(campaignId){
   
    let url = this.apiUrl+'/Bill/CampaignBill/';
    url += campaignId;

    return this.httpClient.get(url);
  }

  



}

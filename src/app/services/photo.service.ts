import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  getListPhotosByBusinessId(businessId){
    let url = this.apiUrl+ '/Photo/getByBusinessId/';
    url += businessId;

    return this.httpClient.get(url);
  }

  getBusinessFolderPath(campaignId, businessId){
    let url = this.apiUrl+ '/Photo/getByBusinessFilesFolderPath';
    url += '/' + campaignId;
    url += '/' + businessId;

    return this.httpClient.get(url);
  }
}

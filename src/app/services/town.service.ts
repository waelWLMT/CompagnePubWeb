import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TownService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTownsByRegion(regionId, fullEntity){
    
    let url = this.apiUrl+"/Town/TownsByRegion/"
        url += regionId;
        url += "/"+fullEntity;

    return this.http.get(url);
  }

  getAllTowns(fullEntity){
    let url = this.apiUrl +"/Town/fullEntity/"
    url += fullEntity;
    return this.http.get(url);
  }
}

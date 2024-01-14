import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getAllRegions(){
    let url = this.apiUrl + '/Region/';
    return this.http.get(url);
  }

}

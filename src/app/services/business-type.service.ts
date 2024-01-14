import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllBusinessTypes() {
    let url = this.apiUrl + "/BusinessType/";
    return this.http.get(url);
  }
}

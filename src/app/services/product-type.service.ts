import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductType } from '../models/PoductType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  
  private apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }

  addProductType(product : ProductType) : Observable<any> {
    let url = this.apiUrl +'/ProductType';
    return this.httpClient.post<any>(url, product);    
  }

  getAllProductTypes() {
    let url = this.apiUrl +'/ProductType';
    return this.httpClient.get(url);
  }

  getProductTypeById(productId : number){
    let url = this.apiUrl +'/ProductType/';
    url+= productId;
    return this.httpClient.get(url);
  }

  updateProductType(id, productType){
    let url = this.apiUrl+'/ProductType/';
    return this.httpClient.put(url + id, productType);
  }

  
}

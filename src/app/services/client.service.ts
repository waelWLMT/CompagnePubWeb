import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient) { }


  addClient(customer : Customer) : Observable<any> {

    let url = this.apiUrl +'/Customer';
    return this.httpClient.post<any>(url, customer);    
  }

  getAllClient() {
    let url = this.apiUrl +'/Customer';
    return this.httpClient.get(url);
  }

  getClientById(customerId : number){
    let url = this.apiUrl +'/Customer/';
    return this.httpClient.get(url+customerId);
  }

  updateCustomer(id, editedCustomer){
    let url = this.apiUrl+'/Customer/';
    return this.httpClient.put(url + id, editedCustomer);
  }

}

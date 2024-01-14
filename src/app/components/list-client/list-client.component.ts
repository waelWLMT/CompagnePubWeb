import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  public customersList : any;
  public showCustomersList : boolean = false;

  public page: any = 1;
  public nbrItemPerPage: any = 5;
  
  constructor(private clientService: ClientService, private router : Router) { }

  ngOnInit(): void {
    this.getCustomersList();   
  }

  getCustomersList(){

    
    this.clientService.getAllClient()
      .subscribe(response => {
        this.customersList = response;
        this.showCustomersList = true;
        this.page = 1;
      });
  }

  goToDetails(customer){
    this.router.navigateByUrl('Details_Client/'+ customer.id)
  }

}

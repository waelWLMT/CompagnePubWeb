import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.scss']
})
export class DetailsClientComponent implements OnInit {

  public customer;
  public modalCustomer;
  public displayDetails : boolean = false;
  constructor(private clientService : ClientService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById(){
    let customerId = this.activatedRoute.snapshot.params.CustomerId;

    this.clientService.getClientById(customerId)
    .subscribe(response => {
      this.customer = response;
      this.displayDetails = true;
    });
  }

  setModalCustomer(){
    this.modalCustomer = this.customer;
  }

  UpdateCustomer(editedCustomer){
    let id = editedCustomer.id;
    this.clientService.updateCustomer(id, editedCustomer)
    .subscribe(response=>{
      this.customer = response;     
      this.router.navigateByUrl('Lst_Client');
    });
  }
  
}

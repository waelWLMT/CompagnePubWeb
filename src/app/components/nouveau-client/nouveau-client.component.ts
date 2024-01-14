import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/Address';
import { Customer } from 'src/app/models/customer';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveau-client',
  templateUrl: './nouveau-client.component.html',
  styleUrls: ['./nouveau-client.component.scss']
})
export class NouveauClientComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router) { }

  public customersList: any;
  public page: any = 1;
  public nbrItemPerPage: any = 5;

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList() {
    this.clientService.getAllClient()
      .subscribe(response => {
        this.customersList = response;
        this.page = 1;
      });
  }

  buildCustomerModel(formValue: any) {

    let address: Address = new Address();

    address.street = formValue.street != undefined ? formValue.street : '';
    address.townName = formValue.townName != undefined ? formValue.townName : '';
    address.countryName = formValue.countryName != undefined ? formValue.countryName : '';

    let customer: Customer = new Customer();

    customer.name = formValue.name;
    customer.taxIdNumber = formValue.taxIdNumber;
    customer.mail = formValue.mail;
    customer.telNumber = formValue.telNumber;

    customer.address = address;
    return customer;
  }

  buildErreurMessage(controls) {
    let msg = "Veuillez remplir les champs suivant:";

    if(controls.name.status == "INVALID"){
      msg += "<br>" +"name";
    }
    
    if(controls.taxIdNumber.status == "INVALID"){
      msg += "<br>" +"Matricule fiscale";
    }

    if(controls.telNumber.status == "INVALID"){
      msg += "<br>" +"Numéro de téléphone";
    }

    if(controls.mail.status == "INVALID"){
      msg += "<br>" +"EMAIL";
    }

    if(controls.street.status == "INVALID"){
      msg += "<br>" +"Rue";
    }

    if(controls.townName.status == "INVALID"){
      msg += "<br>" +"Ville";
    }

    if(controls.countryName.status == "INVALID"){
      msg += "<br>" +"Pays";
    }    

    Swal.fire('Erreur!',  msg, "error" );   

  }

  ajouterClient(f: NgForm) {

    if (!f.valid) {
      this.buildErreurMessage(f.controls);
    }

    if (f.valid) {

      Swal.fire({
        title: 'Ajout nouveau client!',
        text: 'êtes-vous sûr de vouloir continuer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, ajouter!',
        cancelButtonText: 'Non, Annuler'
      })
      .then((result) => {
        if (result.value) {   
          let customer = this.buildCustomerModel(f.value);
          this.clientService.addClient(customer)
            .subscribe(response => {
              Swal.fire(
                'Ajouté!',
                'Le nouveau client a été ajouté avec succès.',
                'success'
              ).then(() => {
                this.router.navigateByUrl('Lst_Client');
              });

            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erreur serveur!'
              });
            });
        }
      })






    }

  }

}

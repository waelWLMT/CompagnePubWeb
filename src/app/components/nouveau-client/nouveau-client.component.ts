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

  constructor(private readonly clientService: ClientService,private readonly router: Router) { }

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

  buildCustomerModel(form: any) {

    let formValue = form.value;

    let address: Address = new Address();

    address.street = formValue.street != undefined ? formValue.street : '';
    address.townName = formValue.townName != undefined ? formValue.townName : '';
    address.countryName = 'France';

    let customer: Customer = new Customer();

    customer.name = formValue.name;
    customer.sirenSiret = formValue.sirenSiret;
    customer.mail = formValue.mail;
    customer.telNumber = formValue.telNumber;

    customer.address = address;
    return customer;
  }

  buildErreurMessage(form) {
    
    let controls = form.controls;   
    
    let msg = "Veuillez remplir les champs suivant:";

    if(controls.name.status == "INVALID"){
      msg += "<br>" +"name";
    }
    
    if(controls.sirenSiret.status == "INVALID"){
      msg += "<br>" +"SIRET/SIRET";
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
      this.buildErreurMessage(f);
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
          let customer = this.buildCustomerModel(f);
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

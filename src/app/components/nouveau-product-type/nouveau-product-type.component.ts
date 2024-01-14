import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from 'protractor';
import { ProductType } from 'src/app/models/PoductType';
import { ProductTypeService } from 'src/app/services/product-type.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveau-product-type',
  templateUrl: './nouveau-product-type.component.html',
  styleUrls: ['./nouveau-product-type.component.scss']
})
export class NouveauProductTypeComponent implements OnInit {

  constructor(private router : Router, private productTypeService : ProductTypeService) { }

  public unitList = [{id : 1, description : 'mm'} , {id : 2, description : 'cm'}, {id : 1, description : 'mt'}  ];
  public selectedUnitId = 1;

  public hasSize : boolean = true;
  public colorValue = '#000000';

  public productTypesList : any;
  public showList = false;

  public nbrItemPerPage: any = 5;
  public page: any = 1;

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  public getAllProductTypes(){

    this.showList = false;
    this.productTypeService.getAllProductTypes()
    
    .subscribe(
      response=>{
        this.productTypesList = response;
        this.showList =true;
        this.page = 1 ;
    }, error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur serveur!'
      });
    }
    
    
    )
  }
 
  buildProductType(formValue){
    let productTypeDto = new ProductType();
    
    productTypeDto.name = formValue.name;
    productTypeDto.price = +formValue.price;    
    productTypeDto.description = formValue.description;
    
    productTypeDto.color = formValue.colorValue != undefined ? formValue.colorValue : "";
    productTypeDto.defaultNbrProductPerBusiness = formValue.defaultPenetrationRate;
   
    if(this.hasSize){

      productTypeDto.size = {
        height: formValue.height,
        width:  formValue.width,
        unit: formValue.unite
      }

    }
   

    return productTypeDto;


  }

  verifProductForm(form) {
    let valid = true;
    let message = '';

    if (!form.valid) {
      message = 'Veuillez renseigner tous les champs obligatoires !';
      valid = false;
    }

    if(isNaN(form.value.price)){
      message = 'Prix unitaire doit etre un nombre !';
      valid = false;
    }

    if(isNaN(form.value.defaultPenetrationRate)){
      message = 'Taux de pénetration par défaut !';
      valid = false;
    }

    if (!valid)
      Swal.fire('Erreur', message, 'error');

    return valid;



  }

  submit(form){
   
    let valid= this.verifProductForm(form);
    if(valid){
      Swal.fire({
        title: 'êtes-vous sûr de vouloir continuer?',
        text: 'Ajout nouveau Type de produit!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, ajouter!',
        cancelButtonText: 'Non, Annuler'
      }).then((result) => {
        if (result.value) {
  
          let productDto = this.buildProductType(form.value);
          this.productTypeService.addProductType(productDto)
            .subscribe(response => {
              Swal.fire(
                'Ajouté!',
                'Le nouveau Type de produit a été ajouté avec succès.',
                'success'
              ).then(() => {
                this.router.navigateByUrl('Lst_Types_Produits');
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

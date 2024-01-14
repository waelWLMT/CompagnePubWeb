//import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { until } from 'selenium-webdriver';
import { ProductTypeService } from 'src/app/services/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product-types',
  templateUrl: './list-product-types.component.html',
  styleUrls: ['./list-product-types.component.scss']
})
export class ListProductTypesComponent implements OnInit {

  public productTypesList : any;
  public showList = false;

  public dimensionUnits = [ {id: 1, unitDescription : 'mm'}, {id: 2, unitDescription : 'cm'}, {id: 3, unitDescription : 'mt'}];

  public nbrItemPerPage: any = 5;
  public page: any = 1;

  constructor(private productTypesService : ProductTypeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  public getAllProductTypes(){

    this.showList = false;
    this.productTypesService.getAllProductTypes()
    
    .subscribe(
      response=>{
        this.productTypesList = response;
        this.showList =true;
        this.page = 1;
    }, error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erreur serveur!'
      });
    }
    
    
    )
  }

  getDimensionUnit(unitId){
    let unit:any;
    if(unitId != undefined){
      unit = this.dimensionUnits.find(x=> x.id == unitId);
      if(unit != undefined)   return unit.unitDescription;
    }   
  }

  goToDetails(productType){
    this.router.navigateByUrl('Details_ProductType/'+ productType.id);
  }

}

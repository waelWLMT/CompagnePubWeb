import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTypeService } from 'src/app/services/product-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-product-type',
  templateUrl: './details-product-type.component.html',
  styleUrls: ['./details-product-type.component.scss']
})
export class DetailsProductTypeComponent implements OnInit {

  public details;
  public modalProductType;
  public displayDetails: boolean = false;
  public dimensionUnits = [ { id: 1 , unitDescription: "mm"}, { id: 2 , unitDescription: "cm"}, { id: 3 , unitDescription: "mt"}];

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.getDetailProductTypeById();
  }

  setmodalProductType(){
    this.modalProductType = this.details;
  }

  verifModel(modalProductType){
    let valid = true;
    let msg = "Les champs suivants sont obligatoires: ";

    if(modalProductType.name == undefined || modalProductType.name == ''){
      valid = false;
      msg = "<br> Product type";
    }

    if(modalProductType.price == undefined || modalProductType.price == ''){
      valid = false;
      msg = "<br> Prix";
    }

    if(modalProductType.defaultNbrProductPerBusiness == undefined || modalProductType.defaultNbrProductPerBusiness == '' || modalProductType.defaultNbrProductPerBusiness < 1 ){
      valid = false;
      msg = "<br> Taux de penetration par business";
    }

    if(modalProductType.description == undefined || modalProductType.description == ''){
      valid = false;
      msg = "<br> Description";
    }

    if(!valid){
      Swal.fire("Erreur",msg, "error");
    }

    return valid;
  }

  update(modalProductType){

    let valid = this.verifModel(modalProductType);
    if(valid){
      Swal.fire({
        icon: "warning",
        title: 'Le Type de produit sera modifié !',
        text: 'Êtes-vous sûre de vouloir continuer?',
        showCancelButton: true,
        confirmButtonText: `Continuer`,
        confirmButtonColor: '#007bff',
        cancelButtonText: 'Annuler'
  
      }).then((result) => {
  
        let productTypeId = modalProductType.id;      

        if (result.isConfirmed) {
          // il faut créer le web api
          this.productTypeService.updateProductType(productTypeId, modalProductType)
            .subscribe(response => {
              this.details = response;
  
              Swal.fire({
                icon: 'success',
                title: 'succes',
                showConfirmButton: false,
                timer: 1500
              })
  
            }, error => {
              Swal.fire({
  
                icon: 'error',
                title: 'Problème de modification produit',
                showConfirmButton: false,
                timer: 1500
              })
            });
        }
  
      });
    }

    /*
   let valid = this.verifModel(modalProductType);

   if(valid){
     this.productTypeService.updateProductType(modalProductType.id, modalProductType)
     .subscribe(response=>{
        this.route.navigateByUrl("");
     },error=>{
       console.log(error);
      });


      */
   

  }
  
  getDetailProductTypeById(){
    
    this.displayDetails = false;
    let productTypeId = this.activatedRoute.snapshot.params.ProductTypeId;

    this.productTypeService.getProductTypeById(productTypeId)
    .subscribe(response=>{
      this.details = response;
      this.displayDetails = true;
    }, error=>{ 
      console.log(error);
    });

  }

  getDimensionUnit(unitId){
    let unit:any;
    if(unitId != undefined){
      unit = this.dimensionUnits.find(x=> x.id == unitId);
      if(unit != undefined)   
        return unit.unitDescription;

    }   
  }

}

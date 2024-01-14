import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductTypeService } from 'src/app/services/product-type.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-campaign-products',
  templateUrl: './edit-campaign-products.component.html',
  styleUrls: ['./edit-campaign-products.component.scss']
})
export class EditCampaignProductsComponent implements OnInit {

  @Input() public campaignProducts:any; 
  @Output() deleteProductEmmiter = new EventEmitter<number>();
  @Output() updateCampaignProductEmmiter = new EventEmitter<any>();
  @Output() addCampaignProductEmmiter = new EventEmitter<number>();


  public currentUser: any;
  
  
  private showList:boolean = false;
  public productTypeList: any;
  public selectedProductTypeId: any;   

  public modalProduct:any;
  
  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.showList = this.campaignProducts != undefined;    
    this.getAllProductType();
  }

  getAllProductType() {

    this.selectedProductTypeId = undefined;

    this.productTypeService.getAllProductTypes()
      .subscribe(data => {
        this.productTypeList = data;
      }, error => {
        console.log(error);
      });
  }
  
  deleteProduct(productTypeId: number){    
    this.deleteProductEmmiter.emit(productTypeId);
  }

  setModalProduct(product){
    this.modalProduct = product;
  }

  updateCampaignProduct(){

    if(this.modalProduct != undefined){
      
      let productUpdateDto = {
        productTypeId: this.modalProduct.productTypeId,
        finalPrice: this.modalProduct.finalUnitPrice,
        finalNbrProductPerBusiness: this.modalProduct.nbrProductPerBusiness
      };

      this.updateCampaignProductEmmiter.emit(productUpdateDto);

    }
    
    
  }

  addCampaignProducts(){
    
    if(this.selectedProductTypeId != undefined){    
      let index = this.campaignProducts.findIndex(x => x.productTypeId == this.selectedProductTypeId);
     
      if(index === -1){

        let productTypeId = this.selectedProductTypeId;
        this.addCampaignProductEmmiter.emit(+productTypeId); 
        this.selectedProductTypeId = undefined;
      }
      else{
        Swal.fire("Erreur","Produit Existe Déja", "error");
      }
    }else{
      Swal.fire("Erreur", "Veuillez selectionnez un type de produit", "error");
    }

  }
  
}

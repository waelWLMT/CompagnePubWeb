import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-campaign-business-types',
  templateUrl: './edit-campaign-business-types.component.html',
  styleUrls: ['./edit-campaign-business-types.component.scss']
})
export class EditCampaignBusinessTypesComponent implements OnInit, OnChanges {


  @Input() campaignBusinessTypes: any;
  @Output() deletecampaignBusinessTypeEmmiter = new EventEmitter<string>();
  @Output() addCampaignBusinessTypeEmmiter = new EventEmitter<string>();

  public businessTypeList: any;
  public selectedBusnissType: any;


  constructor(private businessTypeService: BusinessTypeService) { }
 
  // stratigie à appliquer sur dans edit-type de poduit et edit-ville
  ngOnChanges(changes: SimpleChanges): void {    

     let first = changes["campaignBusinessTypes"].firstChange;

     if(!first){
       this.businessTypeList = this.getEnabledItems(this.businessTypeList);
       //this.getAllBusinessTypes();
     }    

  }

  ngOnInit(): void {
    this.getAllBusinessTypes();
  }

  deleteBusinessType(mapCode) {
    this.deletecampaignBusinessTypeEmmiter.emit(mapCode);
  }

  getEnabledItems(items){

    let list =[];

    items.forEach(item => {      
      
      let index = this.campaignBusinessTypes.findIndex(x=> item.id == x.id);
      console.log(index);

      if(index > -1)
        item.disabled = true;
      else
        item.disabled = false;

      list.push(item);

    });

    console.log("flitred List");
    console.log(list);
    return list;
    
    
  } 

  getAllBusinessTypes() {

    this.selectedBusnissType = undefined;
    this.businessTypeList = [];

    this.businessTypeService.getAllBusinessTypes()
      .subscribe(response => {

        this.businessTypeList= this.getEnabledItems(response); 

      }, error => {
        console.log(error);
      });
  }

  addCampaignBusinessType() {
    if (this.selectedBusnissType != undefined) {
      let index = this.campaignBusinessTypes.findIndex(x => x.mapCode == this.selectedBusnissType);

      if (index === -1) {
        let businessTypeMapCode = this.selectedBusnissType;
        this.addCampaignBusinessTypeEmmiter.emit(businessTypeMapCode);
        this.selectedBusnissType = undefined;
      }
      else {
        Swal.fire("Erreur", "Type de business Existe Déja", "error");
      }
    } else {
      Swal.fire("Erreur", "Veuillez selectionnez un type de business", "error");
    }
  }

}

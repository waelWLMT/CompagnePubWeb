import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Place } from 'src/app/models/Place';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-edit-campaign-towns',
  templateUrl: './edit-campaign-towns.component.html',
  styleUrls: ['./edit-campaign-towns.component.scss']
})
export class EditCampaignTownsComponent implements OnInit, OnChanges {

  @Input() detailedCampaignTownsList: any; 
  @Input() CampaignRegion: any;

  @Output() deleteCampaignTownEmmiter = new EventEmitter<number>();
  @Output() addCampaignTownEmmiter = new EventEmitter<number>();
  
  

  public displaytownsToAdd:any = false;
  
  public townsList:any;
  public selectedTownId: any;  
  
  public selectedTown: any;

  public centerMapPosition: any;
  public placesList : any[];
  
  constructor(private townService: TownService) { }
 
  ngOnChanges(changes: SimpleChanges): void {

    let first = changes["detailedCampaignTownsList"].firstChange;
    if(!first && this.townsList != undefined){
      this.townsList = this.getEnabledItems(this.townsList);
    }
  }

  ngOnInit(): void {     
    this.getListOfTowns();  
  }


  getEnabledItems(items){

    let list =[];

    items.forEach(item => {      
      
      let index = this.detailedCampaignTownsList.findIndex(x=> item.id == x.town.id);
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
  
  getListOfTowns(){    
    // region
    if(this.CampaignRegion != undefined){

      let regionId = this.CampaignRegion.id;
      let fullEntity = false;

      this.townService.getTownsByRegion(regionId, fullEntity)
        .subscribe(response => {
          //this.townsList = response;

          this.townsList = this.getEnabledItems(response);
          this.displaytownsToAdd= true;         
        }, error => {
          console.log(error);
        });
   
    }

  }
  

  deleteCampaigntown(town){

    let townId = town.id;
    this.deleteCampaignTownEmmiter.emit(townId);
  }

  addCampaignTowns(){
    let townId = this.selectedTownId;
    this.addCampaignTownEmmiter.emit(townId);

    this.selectedTownId = undefined;
  }

  // modal params
  setModalTown(detailedTown){
    if(detailedTown != undefined){
      this.selectedTown = detailedTown;
      this.setCenterMapPosition();
      this.setPlacesList();
    }
      
  }

  // set map center
  setCenterMapPosition(){

    if(this.selectedTown != undefined){
      this.centerMapPosition = {
        lat: this.selectedTown.town.lat,
        lng: this.selectedTown.town.lng      
      }      
    }    
  }

  // set map Places
  setPlacesList(){
    if(this.selectedTown.townBusinesses){
      
      this.placesList = [];
     
      this.selectedTown.townBusinesses.forEach(item=> {
        
        let place: Place = {
          lat: item.place.lat,
          lng: item.place.lng,
          label: item.place.name,
          draggable: false
        }

        this.placesList.push(place);

      });
    
    }
  }


}

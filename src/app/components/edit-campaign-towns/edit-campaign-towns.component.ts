import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Place } from 'src/app/models/Place';
import { BusinessTypeService } from 'src/app/services/business-type.service';
import { TownService } from 'src/app/services/town.service';

@Component({
  selector: 'app-edit-campaign-towns',
  templateUrl: './edit-campaign-towns.component.html',
  styleUrls: ['./edit-campaign-towns.component.scss']
})
export class EditCampaignTownsComponent implements OnInit, OnChanges {

  @Input() detailedCampaignTownsList: any;
  @Input() campaignRegion: any;
  @Input() campaign: any;

  @Output() deleteCampaignTownEmmiter = new EventEmitter<number>();
  @Output() addCampaignTownEmmiter = new EventEmitter<number>();

  public dispalyMap: boolean = true;
  public displaytownsToAdd: any = false;

  public townsList: any;
  public selectedTownId: any;

  public selectedTown: any;

  public centerMapPosition: any;
  public placesList: any[];

  @Input() businesstypes: any;

  constructor(private readonly townService: TownService, private readonly router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {

    let first = changes["detailedCampaignTownsList"].firstChange;
    if (!first && this.townsList != undefined) {
      this.townsList = this.getEnabledItems(this.townsList);
    }    
  }

  ngOnInit(): void {
    this.getListOfTowns();
    this.businesstypes = this.campaign.campaignBusinessTypes;
  }

  showMap() {
    this.dispalyMap = !this.dispalyMap;
  }

  getEnabledItems(items) {

    let list = [];

    items.forEach(item => {

      let index = this.detailedCampaignTownsList.findIndex(x => item.id == x.town.id);

      if (index > -1)
        item.disabled = true;
      else
        item.disabled = false;

      list.push(item);

    });

    return list;
  }

  getListOfTowns() {
    // region
    if (this.campaignRegion != undefined) {

      let regionId = this.campaignRegion.id;
      let fullEntity = false;

      this.townService.getTownsByRegion(regionId, fullEntity)
        .subscribe(response => {
          this.townsList = this.getEnabledItems(response);
          this.displaytownsToAdd = true;
        }, error => {
          console.log(error);
        });

    }

  }

  deleteCampaigntown(town) {

    let townId = town.id;
    this.deleteCampaignTownEmmiter.emit(townId);
  }

  addCampaignTowns() {
    let townId = this.selectedTownId;
    this.addCampaignTownEmmiter.emit(townId);

    this.selectedTownId = undefined;
  }

  gotToTownPage(detailedTown) {
    this.router.navigate(['DetailsCampagneTown/campagne/', this.campaign.id, 'town', detailedTown.town.id]);
  }

  // modal params
  setModalTown(detailedTown) {
    if (detailedTown != undefined) {
      this.selectedTown = detailedTown;
      this.setCenterMapPosition();
      this.setPlacesList();
    }
  }

  // set map center
  setCenterMapPosition() {

    if (this.selectedTown != undefined) {
      this.centerMapPosition = {
        lat: this.selectedTown.town.lat,
        lng: this.selectedTown.town.lng
      }
    }
  }

  // set map Places
  setPlacesList() {

    if (this.selectedTown.townBusinesses) {

      this.placesList = [];

      this.selectedTown.townBusinesses.forEach(item => {

        let businessType = this.businesstypes.filter(x=> item.businessTypeId == x.id)[0];
        let fullAdresse = this.selectedTown.town.city + ", " + this.selectedTown.town.postalCode;

        let place: Place = {
          lat: item.place.lat,
          lng: item.place.lng,
          label: item.place.name,
          draggable: false,
          fullAdresse: item.place.placeAdresse ?? fullAdresse,
          businessTypeLibelle: businessType.tagValueDesignation, 
          businessId: item.businessTownId
        }

        this.placesList.push(place);
      });

    }
    
  }


}

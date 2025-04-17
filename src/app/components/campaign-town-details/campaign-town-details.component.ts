import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { CampaignService } from 'src/app/services/campaign.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-campaign-town-details',
  templateUrl: './campaign-town-details.component.html',
  styleUrls: ['./campaign-town-details.component.scss']
})
export class CampaignTownDetailsComponent implements OnInit {

  public detailesTown: any;
  public zoom: any;
  public map: any;
  public mapCenter: any;
  public campaignId: any;
  public townId: any;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly campagnService: CampaignService) { }

  ngOnInit(): void {
    this.zoom = environment.townMapZoom;
    this.getDetailesTown();
  }

  getDetailesTown() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.campaignId = params.get('campagneId');
      this.townId = params.get('townId');
    });

    this.campagnService.getDetailedCampaignTown(this.campaignId, this.townId)
      .subscribe(response => {
        this.detailesTown = response;
        this.setMapCenter();
        this.initMap();
      });

  }

  setMapCenter(){    
    this.mapCenter = {
      lat : this.detailesTown.town.lat,
      lng : this.detailesTown.town.lng
    }
  }

  setMapView(){
    this.map = L.map('map').setView([this.mapCenter.lat, this.mapCenter.lng], 6); // Centre France
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  initMap() {
    this.setMapView();
    this.addPlacesToMap();
  }

  addPlacesToMap() {
    // Ajouter les marqueurs
    /* this.detailesTown.townBusinesses.forEach(lieu => {
      L.marker([lieu.lat, lieu.lng])
        .addTo(this.map)
        .bindPopup(`<b>${lieu.name}</b>`);
    }); */


  }




}

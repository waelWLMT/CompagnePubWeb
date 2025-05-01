import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';

@Component({
  selector: 'app-campaign-town-details',
  templateUrl: './campaign-town-details.component.html',
  styleUrls: ['./campaign-town-details.component.scss']
})
export class CampaignTownDetailsComponent implements OnInit {

  @Input() businessTypes: any;
  @Input() details: any;
  public maxzoom: any = 18;
  public minzoom: any = 3;
  public centerzoom: any = 3;
  public map: L.Map;
  public centroid: L.LatLngExpression;
  public markersList: any[];


  public selectedBusiness: any;
  public showBusinessDetails: boolean = false;

  public markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
  });

  ngOnInit(): void {
    this.initMap();
  }

  initMapCenter() {
    this.centroid = [+this.details.town.lat, +this.details.town.lng];
    this.map = L.map('map', {
      center: this.centroid,
      zoom: this.centerzoom
    });
  }

  initTiles() {
    let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.maxzoom,
      minZoom: this.minzoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    return tiles;
  }

  initMarkersList() {

    this.markersList = [];

    this.details.townBusinesses.forEach(business => {

      let marker = L.marker([business.place.lat, business.place.lng], { title: business.place.name, icon: this.markerIcon });
      (marker as any).data = business;

      marker.on('click', () => {
        this.setSelectedBusiness((marker as any).data);
        console.log((marker as any).data);
      });

      this.markersList.push(marker);

    });
    return this.markersList;
  }


  closeDetails() {
    this.showBusinessDetails = false;
    this.selectedBusiness = undefined;
  }

  setSelectedBusiness(business) {
    let businessType = this.businessTypes.find(x => x.id == business.businessTypeId);
    this.selectedBusiness = business;
    this.selectedBusiness.businessTypeLabel = businessType.tagValueDesignation;

    this.selectedBusiness.place.placeAdresse ??= this.details.town.city + ", " + this.details.town.postalCode;

    this.showBusinessDetails = true;

  }

  addMarkersToMap() {
    this.markersList.forEach(item => {
      item.addTo(this.map);
    })
  }

  initMap() {

    this.initMapCenter();
    const tiles = this.initTiles();
    this.initMarkersList();
    this.addMarkersToMap();
    tiles.addTo(this.map);
  }

}

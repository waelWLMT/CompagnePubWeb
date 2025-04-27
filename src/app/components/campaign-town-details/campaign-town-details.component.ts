import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';

@Component({
  selector: 'app-campaign-town-details',
  templateUrl: './campaign-town-details.component.html',
  styleUrls: ['./campaign-town-details.component.scss']
})
export class CampaignTownDetailsComponent implements OnInit {

  @Input() details: any;
  public maxzoom : any = 18;
  public minzoom : any = 5;  
  public centerzoom : any = 10;
  public map: L.Map;
  public centroid: L.LatLngExpression;
  public markersList : any [];

  public markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
  });

  ngOnInit(): void {
    this.initMap();
  }

  initMapCenter(){
    this.centroid = [+this.details.town.lat, +this.details.town.lng ];  
    this.map = L.map('map', {
      center: this.centroid,
      zoom: this.centerzoom
    });
  }

  initTiles(){
    let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.maxzoom,
      minZoom: this.minzoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    return tiles;
  }

  initMarkersList(){

    this.markersList = [];

    this.details.townBusinesses.forEach(business => {      
      this.markersList.push(L.marker([business.place.lat, business.place.lng], { icon: this.markerIcon }));
    });
    return this.markersList;
  }

  addMarkersToMap(){
    this.markersList.forEach(item => {
      item.addTo(this.map);
    })
  }

  initMap(){

    this.initMapCenter();
    const tiles = this.initTiles();
    this.initMarkersList();
    this.addMarkersToMap();
    tiles.addTo(this.map);
  }

}

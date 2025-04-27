import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list-town-businesses',
  templateUrl: './list-town-businesses.component.html',
  styleUrls: ['./list-town-businesses.component.scss']
})



export class ListTownBusinessesComponent implements OnInit{

  public nbrItemPerPage = 5;
  public page = 1;
  @Input() businesses: any[];
  public places: any[];
  
  public showListPlaces : boolean = false;
  
  constructor() { }
  
  ngOnInit(): void {
    
    if(this.businesses){
      this.places = this.businesses;
      this.showListPlaces = true;            
    }   
    
  }

}

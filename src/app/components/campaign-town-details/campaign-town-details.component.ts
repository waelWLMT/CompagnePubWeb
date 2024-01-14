import { Component, Input, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-campaign-town-details',
  templateUrl: './campaign-town-details.component.html',
  styleUrls: ['./campaign-town-details.component.scss']
})
export class CampaignTownDetailsComponent implements OnInit {

  @Input() center: any[];
  @Input() palcesList: any;

  public zoom: any;
  constructor() { }

  ngOnInit(): void {}
  
}

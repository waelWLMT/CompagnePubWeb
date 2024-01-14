import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.scss']
})
export class ListFactureComponent implements OnInit {

  public currentUser: any;
  public listFacture: any;
  public showList:any;

  public page: any = 1;
  public nbrItemPerPage: any = 5;

  constructor(private factureService: FactureService, private router: Router) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if(this.currentUser != null && this.currentUser != undefined){
      this.getAllFacture();
    }  

  }

  getAllFacture(){

    this.showList = false;

    let userRole = this.currentUser.roleId;
    let customerId = userRole == 2 ? this.currentUser.clientId : -1 ;
  
    this.factureService.getAllFacture(userRole, customerId)
    .subscribe(response=>{
      this.listFacture = response;
      this.showList =true;

      this.page = 1;
      
    }, error=>{ 
      console.log(error);
    });
  }

  getBusinessCost(billBusinesses){
    if(billBusinesses != undefined){
      return billBusinesses[0].businessCost;
    }

  }

  goToDetails(campaignId){        
    this.router.navigateByUrl('Frm_Facture_details/'+ campaignId);
  }

}

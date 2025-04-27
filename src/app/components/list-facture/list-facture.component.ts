import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';
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

  constructor(private readonly factureService: FactureService,private readonly router: Router) { }

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

  imprimer(factureId) {

    this.factureService.getFacutreReport(factureId).subscribe((response: Blob) => {

      const blob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);

      // Ouvrir directement dans un nouvel onglet
      window.open(fileURL, '_blank');

      // Libère l'objet après un petit délai (optionnel mais propre)
      setTimeout(() => URL.revokeObjectURL(fileURL), 5000);
      
    }, error => {
      console.error('Erreur lors du téléchargement du PDF', error);
    });

  }

}

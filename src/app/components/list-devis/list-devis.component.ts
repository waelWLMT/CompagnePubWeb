import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';

@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrls: ['./list-devis.component.scss']
})
export class ListDevisComponent implements OnInit {

  public currentUser: any;
  public listDevis: any;
  public showList: any;

  public page: any = 1;
  public nbrItemPerPage: any = 5;

  constructor(private readonly devisService: DevisService, private readonly router: Router) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (this.currentUser != null && this.currentUser != undefined) {
      this.getAllDevis();
    }

  }

  getAllDevis() {

    this.showList = false;

    let userRole = this.currentUser.roleId;
    let customerId = userRole == 2 ? this.currentUser.clientId : -1;

    this.devisService.getAllDevis(userRole, customerId)
      .subscribe(response => {
        this.listDevis = response;
        this.showList = true;
        this.page = 1;

      }, error => {
        console.log(error);
      });
  }

  goToDetails(devisId) {
    this.router.navigateByUrl('Frm_devis_details/' + devisId);
  }

  imprimer(devisId) {

    this.devisService.getDevisReport(devisId).subscribe((response: Blob) => {

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

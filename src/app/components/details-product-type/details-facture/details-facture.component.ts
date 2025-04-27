import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.scss']
})
export class DetailsFactureComponent implements OnInit {

  public displayDetails: any;
  public details: any;
  public pubCampanyTown: string;
  public page: any = 1;
  public nbrItemPerPage: any = 5;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly factureService: FactureService) { }

  ngOnInit(): void {
    this.getFactureByCampaignId();
    this.pubCampanyTown = environment.PubCampanyCity;

  }

  getFactureByCampaignId() {
    let campaignId = this.activatedRoute.snapshot.params.CampaignId;
    this.displayDetails = false;

    Swal.fire({
      title: 'Chargement en cours!',
      html: 'Veuillez patienter SVP',
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    this.factureService.getFactureByCampaignId(campaignId)
      .subscribe(response => {
        this.details = response;
        this.displayDetails = true;
        Swal.close();
      }, error => {
        console.log(error);
      }
      )

  }


  imprimer() {

    let campaignId = this.activatedRoute.snapshot.params.CampaignId;

    Swal.fire({
      title: '  Impression en cours!',
      html: 'Veuillez patienter SVP',
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading()
      },
    });

    this.factureService.getFactureReportByCampagnId(campaignId).subscribe((response: Blob) => {


      const blob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);

      Swal.close();

      // Ouvrir directement dans un nouvel onglet
      window.open(fileURL, '_blank');

      // Libère l'objet après un petit délai (optionnel mais propre)
      setTimeout(() => URL.revokeObjectURL(fileURL), 5000);

    }, error => {
      console.error('Erreur lors du téléchargement du PDF', error);
    });

  }
}

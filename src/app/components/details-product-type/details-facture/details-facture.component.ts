import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureService } from 'src/app/services/facture.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-facture',
  templateUrl: './details-facture.component.html',
  styleUrls: ['./details-facture.component.scss']
})
export class DetailsFactureComponent implements OnInit {

  public displayDetails: any;
  public details:any;

  constructor(private activatedRoute: ActivatedRoute, private factureService: FactureService) { }

  ngOnInit(): void {
    this.getFactureByCampaignId();
  }

  getFactureByCampaignId(){
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
    .subscribe(response=>{
        this.details = response;
        this.displayDetails = true;
        Swal.close();
    },error=>{
      console.log(error);
    }
    )
    
  }

}

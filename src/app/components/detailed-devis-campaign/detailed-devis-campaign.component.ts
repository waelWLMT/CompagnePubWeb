import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign.service';
import { DevisService } from 'src/app/services/devis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailed-devis-campaign',
  templateUrl: './detailed-devis-campaign.component.html',
  styleUrls: ['./detailed-devis-campaign.component.scss']
})
export class DetailedDevisCampaignComponent implements OnInit {

  public campaign: any;
  public detailedTowns: any;

  public displayDetails: any = false;
  public campaignState: any;

  public campaignStates = [
    { stateId: 1, stateDescription: 'Brouillon' },
    { stateId: 2, stateDescription: 'En Cours' },
    { stateId: 3, stateDescription: 'Clôturée' },
    { stateId: 4, stateDescription: 'Annulée' }
  ];

  constructor(
    private campaignService: CampaignService,
    private devisService: DevisService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getFileCampaign();
  }

  ValiderDevis() {

    Swal.fire({
      title: "Validation devis",
      text: "Êtes-vous sure de vouloir continuer?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText:"Oui, Continuer",
      denyButtonText:"Non, Annuler",
      showDenyButton: true
    }).then((result) => {
      if (result.value) {
        // on confirme
        Swal.close();

        Swal.fire({
          title: 'Validation Devis',
          html: 'Validation en cours',
          showConfirmButton: false,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          },
        });

        let campaignId = this.campaign.id;
        this.devisService.validateDevis(campaignId)
          .subscribe(response => {
            Swal.close();

            Swal.fire({
              title: "Succée",
              text: "Devis validé avec succées",
              icon: "success",
              timer: 2500,
              showConfirmButton: true
            }).then(() => {
              this.router.navigateByUrl('Frm_Facture_details/'+ campaignId );
            });

          });

      } else {
        Swal.close();
      }
    });

  }

  countBusinessTypeInCampaign(businessType){  
    let list = this.campaign.campaignBusinesses.filter(x=> x.businessTypeId == businessType.id);
    return list.length;
  }

  getCurrentDate() {
    let date = new Date();
    return date;
  }

  getFileCampaign() {

    this.displayDetails = false;
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");
    this.campaignService.getCampaignById(campaignId)
      .subscribe(response => {
        this.campaign = response;
        let index = this.campaignStates.findIndex(x => x.stateId === this.campaign.campaignState);
        this.campaignState = this.campaignStates[index];
        this.getDetailedCampaignTowns();
      }, error => {
        console.log(error);
      });
  }

  getDetailedCampaignTowns() {
    let campaignId = +this.activatedRoute.snapshot.paramMap.get("CampaignId");

    this.campaignService.getDetailedCampaignTownsList(campaignId)
      .subscribe(response => {
        this.detailedTowns = response;

        this.displayDetails = true;
      }, error => { console.log(error); }
      );
  }

  countBusinessCost() {
    let businessCost = 0;

    //businessCost = this.campaign.campaignProducts.finalUnitPrice 
    this.campaign.campaignProducts.forEach(item => {
      businessCost += item.finalUnitPrice;
    });

    businessCost = businessCost * (this.campaign.penetraionRate / 100);

    return businessCost;
  }

}

import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-campaign-global-params',
  templateUrl: './edit-campaign-global-params.component.html',
  styleUrls: ['./edit-campaign-global-params.component.scss']
})
export class EditCampaignGlobalParamsComponent implements OnInit {


  @Input() campaignGlobalParams: any;
  @Output() updateCampaignGlobalParmsEmmiter = new EventEmitter<any>();
  @Output() goToDetailsEmmitter = new EventEmitter<any>();

  constructor(private datePipe: DatePipe) { }


  setDateFormat(){
    this.campaignGlobalParams.executionDate = this.datePipe.transform(this.campaignGlobalParams.executionDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void { }

  // verif all global params are good
  verifGlobalParams() {

    let valid = true;
    let msg = 'Veuillez remplir les champs obligatoires';
    let params = this.campaignGlobalParams;

    if (params.title == undefined || params.title == '') {
      valid = false;
    }
    if (params.goal == undefined || params.goal == '') {
      valid = false;
    }
    if (params.forecastBudget == undefined || params.forecastBudget == '') {
      valid = false;
    }
    if (params.executionDate == undefined || params.executionDate == null) {
      valid = false;
    }

    if (params.description == undefined || params.description == '') {
      valid = false;
    }

    if (params.penetraionRate == undefined || params.penetraionRate < 10 || params.penetraionRate > 100) {
      valid = false;
      msg = "Le taux de pénétration doit etre entre 10% et 100%";
    }

    if (!valid) {
      Swal.fire("Erreur", msg, "error");
    }

    return valid;
  }

  buildCampainGloblaParametersUpdateDto() {

    let globalParams = {
      title: this.campaignGlobalParams.title,
      goal: this.campaignGlobalParams.goal,
      forecastBudget: this.campaignGlobalParams.forecastBudget,
      executionDate: this.campaignGlobalParams.executionDate,
      description: this.campaignGlobalParams.description,
      penetrationRate: this.campaignGlobalParams.penetraionRate
    }

    return globalParams;
  }

  updateCampaignGlobalParameters() {
    let valid = this.verifGlobalParams();
    if (valid) {

      let globalParms = this.buildCampainGloblaParametersUpdateDto();
      this.updateCampaignGlobalParmsEmmiter.emit(globalParms);
    }

  }

  gotToDevisPage(){
    this.goToDetailsEmmitter.emit("DetailedDevisCampaign/")
  }

  gotToDetailsPage(){
    this.goToDetailsEmmitter.emit("Details_File_Compagne/");
  }
  

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from 'src/app/services/devis.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devis-details',
  templateUrl: './devis-details.component.html',
  styleUrls: ['./devis-details.component.scss']
})
export class DevisDetailsComponent implements OnInit {

  public displayDetails: any;
  public details:any;
  public pubCampanyTown: any;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly devisService: DevisService) { }

  ngOnInit(): void {
    this.getDevisDetails();
    this.pubCampanyTown = environment.PubCampanyCity;
  }

  getDevisDetails(){
    let devisId = this.activatedRoute.snapshot.params.DevisId;
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

    this.devisService.getDetailsDevisById(devisId)
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

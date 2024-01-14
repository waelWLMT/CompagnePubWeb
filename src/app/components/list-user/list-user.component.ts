import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public usersList;
  public showusersList;

  public page: any = 1;
  public nbrItemPerPage: any = 5;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers() {

    this.showusersList = false;
    this.userService.getAllUsers()

      .subscribe(
        response => {
          this.usersList = response;
          this.showusersList = true;
          this.page= 1;
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erreur serveur!'
          });
        }


      )
  }

  public goToDetails(user) {
    this.router.navigateByUrl('editUser/' + user.id);
  }


  desactivateUser(user) {

    Swal.fire({
      title: 'Desactivation utilisateur!',
      text: 'êtes-vous sûr de vouloir continuer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Désactiver!',
      cancelButtonText: 'Non, Annuler'
    })
      .then((result) => {
        Swal.close();
        if (result.value) {
          Swal.fire({
            title: '',
            html: 'Connexion en cours',
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading()
            },
          });

          let userId = user.id;
          this.userService.activerDesactivateUser(userId, false)
            .subscribe(response => {
              this.usersList = response;
            }
              , error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Erreur serveur!'
                })
              });
        }
      });
  }




}

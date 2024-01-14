import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  public user;
  public modalUser;
  public displayDetails: boolean = false;
  public roles: any;

  constructor(
   
    private userService: UserService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private roleServices: RoleService,
    private router: Router) { }
  

  public customersList: any;

  ngOnInit(): void {
    this.getUserById();
    this.getAllClients();
    this.getAllRoles();   
  }

  getAllRoles() {
   
    this.roleServices.getAllUserRoles()
    .subscribe(response=>{
      this.roles = response;
    }, error=> {
      console.log(error);
    }
    )
    
  }

  getRoleDescription(roleId) {

    let roleDesc = '';

    if (roleId != undefined && this.roles != undefined)
        roleDesc =this.roles.find(x=> x.id == roleId).roleName;

    return roleDesc;
  } 

  getAllClients() {
    this.clientService.getAllClient()
      .subscribe(response => {
        this.customersList = response;
      }, error => {
        Swal.fire("Erreur", "Erreur de chargement list client", "error");
      });
  }

  getUserById() {
    let userId = this.activatedRoute.snapshot.params.UserId;
    this.userService.getUserById(userId)
      .subscribe(response => {
        this.user = response;
        this.displayDetails = true;
      });
  }

  setModalUser() {
    this.modalUser = this.user;
  }

  verifModifUser(user) {
    let message = "Veuillez renseignez les champs obligatoires:";
    let valid = true;

    if (user.lastName == "" || user.lastName == undefined) {
      message += "<br> Nom";
      valid = false;
    }

    if (user.firstName == "" || user.firstName == undefined) {
      message += "<br> Prénom";
      valid = false;
    }

    if (user.email == "" || user.email == undefined) {
      message += "<br> Email";
      valid = false;
    }

    if (user.telNumber == "" || user.telNumber == undefined) {
      message += "<br> Numéro téléphone";
      valid = false;
    }

    if (user.password == "" || user.password == undefined) {
      message += "<br> Mot de passe";
      valid = false;
    }

    if (user.roleId == null || user.roleId == undefined) {
      message += "<br> Role";
      valid = false;
    }

    if (user.roleId == null && (user.clientId == null || user.clientId < 1)) {
      message += "<br> Client";
      valid = false;
    }

    if (!valid)
      Swal.fire("Erreur", message, "error");

    return valid;

  }

  updateUser(editedUser) {

    let valid = this.verifModifUser(editedUser);

    if (valid) {
      Swal.fire({
        icon: "warning",
        title: 'modification utilisateur!',
        text: 'Êtes-vous sûre de vouloir continuer?',
        showCancelButton: true,
        confirmButtonText: `Continuer`,
        confirmButtonColor: '#d9534f',
        cancelButtonText: 'Annuler'
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.userService.updateUser(editedUser.id, editedUser)
              .subscribe(response => {
                this.user = response;

                Swal.fire({
                  icon: 'success',
                  title: 'succes',
                  showConfirmButton: false,
                  timer: 1500
                })

              }, error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Problème de suppression ville',
                  showConfirmButton: false,
                  timer: 1500
                })
              });
          }

        });
    }





  }








}


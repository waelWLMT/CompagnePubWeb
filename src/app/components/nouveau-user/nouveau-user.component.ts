import { unsupported } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ClientService } from 'src/app/services/client.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nouveau-user',
  templateUrl: './nouveau-user.component.html',
  styleUrls: ['./nouveau-user.component.scss']
})
export class NouveauUserComponent implements OnInit {

  public roles: any;
  public selectedRoleId: any;
  public customersList: any;
  public selectedCustomerId: any;
  public usersList;
  public showusersList;

  public page: any = 1;
  public nbrItemPerPage: any = 5;

  constructor(private roleService: RoleService, private userService: UserService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllClients();
    this.getAllUserRoles();
  }

  getAllClients() {
    this.clientService.getAllClient()
      .subscribe(response => {
        this.customersList = response;
      }, error => {
        Swal.fire("Erreur", "Erreur de chargement list client", "error");
      });
  }

  getAllUserRoles(){
    this.roleService.getAllUserRoles()
    .subscribe(response=> {
      this.roles = response;
    });
  }

  getUserRole(roleId){
    
    if(roleId != undefined && this.roles != undefined)
      return this.roles.find(x=> x.id == roleId).roleName;
    
    return "";
  }

  addCustomUser = (term) => ({ id: term, name: term });

  buildUser(userFormValue) {

    let userDto: User = new User();

    userDto.firstName = userFormValue.firstName;
    userDto.lastName = userFormValue.lastName;
    userDto.matricule = userFormValue.matricule;
    userDto.Email = userFormValue.mail;

    userDto.telNumber = userFormValue.telNumber;
    userDto.roleId = this.selectedRoleId;
    userDto.password = userFormValue.password;
    userDto.clientId = userDto.roleId == 2 ? this.selectedCustomerId : -1;

    return userDto;

  }

  verifUserForm(userForm) {

    let valid = true;
    let message = 'Veuillez renseigner tous les champs obligatoires !';

    let formControls = userForm.controls;

    if(formControls.lastName.status == "INVALID"){
      valid = false,
      message += "<br> Prénom";
    }

    if(formControls.firstName.status == "INVALID"){
      valid = false,
      message += "<br> Nom";
    }

    if(formControls.matricule.status == "INVALID"){
      valid = false,
      message += "<br> Matricule";
    }

    if(formControls.mail.status == "INVALID"){
      valid = false,
      message += "<br> Email";
    }

    if(formControls.telNumber.status == "INVALID"){
      valid = false,
      message += "<br> Numéro téléphone";
    }

    if(formControls.roleUser.status == "INVALID"){
      valid = false,
      message += "<br> Role";
    }

    if(formControls.password.status == "INVALID"){
      valid = false,
      message += "<br> Mot de passe";
    }

    if(formControls.confirmePassword.status == "INVALID" || formControls.password.value != formControls.confirmePassword.value ){
      valid = false,
      message += "<br> Confirme mot de passe";
    }    

    if(this.selectedRoleId === 2 && formControls.clientId.status == "INVALID"){
      valid = false;
      message += "<br> Client";
    }
   

    if (!valid)
      Swal.fire('Erreur', message, 'error');

    return valid;

    /*
    let valid = true;
    let message = '';

    if (!userForm.valid) {
      message = 'Veuillez renseigner tous les champs obligatoires !';
      valid = false;
    }

    if (userForm.value.password !== userForm.value.confirmePassword) {
      message = 'mot de passe de confirmation non valide !';
      valid = false;
    }

    if (!valid)
      Swal.fire('Erreur', message, 'error');

    return valid;

*/

    

  }

  public ajouterUtilisateur(userForm) {

    let valid = this.verifUserForm(userForm);
    if (valid) {

      Swal.fire({
        title: 'êtes-vous sûr de vouloir continuer?',
        text: 'Ajout nouveau utilisateur!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, ajouter!',
        cancelButtonText: 'Non, Annuler'
      }).then((result) => {
        if (result.value) {

          let userDto = this.buildUser(userForm.value);
          this.userService.addUser(userDto)
            .subscribe(response => {
              Swal.fire(
                'Ajouté!',
                'Le nouveau utilisateur a été ajouté avec succès.',
                'success'
              ).then(() => {
                this.router.navigateByUrl('Lst_Utilisateur');
              });

            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erreur serveur!'
              });
            });
        }
      })

    }

  }

  public getAllUsers() {

    this.showusersList = false;
    this.userService.getAllUsers()

      .subscribe(
        response => {
          this.usersList = response;
          this.showusersList = true;
          this.page = 1;
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erreur serveur!'
          });
        }


      )
  }

  goToDetails(user){
    if(user != undefined)
      this.router.navigateByUrl('editUser/'+user.id);
  }

}

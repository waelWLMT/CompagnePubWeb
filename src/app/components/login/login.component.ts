import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'process';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false; 
  error = '';

  constructor(private router: Router, private authService: AuthenticationService) {

    // redirect to home if already logged in
    if (this.authService.userValue)
      this.router.navigate(['/']);

  }


  ngOnInit() {}


  verifAuthetificationIdentiy(userName, password) {


    let valid = true;
    let msg = "";

    valid = userName && password;

    if (!valid) {
      msg = "Veuillez saisir UserName et mot de passe !!";
      Swal.fire({
        title: "Erreur",
        text: msg,
        timer: 2000,
        icon: "error"
      });
    }

    return valid;

  }

  public login(loginForm) {

    let userName = loginForm.value.userName;
    let password = loginForm.value.password;

    let valid = this.verifAuthetificationIdentiy(userName, password);

    if (valid) {

      Swal.fire({
        title: '  Connexion en cours!',
        html: 'Veuillez patienter SVP',
        showConfirmButton: false,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading()
        },
      });

      this.authService.login(userName, password)
        .pipe(
          first())
        .subscribe(
          data => {
            Swal.close();
            this.router.navigate(['/']);            
          },
          error => {
            Swal.fire({
              title: "Erreur",
              text: error,
              icon: "error",
              timer: 1500,
            });
          });
    }







  }
}

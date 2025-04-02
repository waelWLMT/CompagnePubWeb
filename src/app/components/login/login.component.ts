import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  error = '';

  constructor(private readonly router: Router,private readonly authService: AuthenticationService) {

    // redirect to home if already logged in
    if (this.authService.userValue)
      this.router.navigate(['/']);

  }

  ngOnInit() { }

  showOrHidePassword(){

    let htmlPasswordElement = document.getElementById("password") as HTMLElement;
    let type = htmlPasswordElement.getAttribute("type") === "password" 
    ? "text" 
    : "password";

    htmlPasswordElement.attributes["type"].value = type;  

    let htmlEyeElement = document.getElementById("togglePassword");
    htmlEyeElement.classList.toggle("bi-eye");


  }

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
        willOpen: () => {
          Swal.showLoading()
        },
      });     

      
      this.authService.login(userName, password)
        .pipe(first())
        .subscribe(
          data => {
            Swal.close();
            this.router.navigate(['/']);
          },
          error => {
            Swal.fire({
              title: "Erreur",
              text: "Login ou mot de passe incorrect",
              icon: "error",
              timer: 3000,
            });
          });
    }







  }
}

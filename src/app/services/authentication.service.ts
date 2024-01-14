import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  private apiUrl = environment.apiUrl;

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private menusSubject: BehaviorSubject<any>;
  public menus: Observable<any>;


  constructor(private router: Router, private httpClient: HttpClient) {

    let tempUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userSubject = new BehaviorSubject<User>(tempUser);
    this.user = this.userSubject.asObservable();

    this.menusSubject = new BehaviorSubject<any>(tempUser ? tempUser.menus : null);
    this.menus = this.menusSubject.asObservable();

  }


  public get userValue(): User {
    return this.userSubject.value;
  }

  login(userName: string, password: string) {

    let url = this.apiUrl + '/Authentication/authenticate';

    let authenticateRequest: any = {
      userName: userName,
      password: password
    };

    return this.httpClient.post<any>(url, authenticateRequest)
      .pipe(
        map(response => {          

          let rep = response;
          let token = rep.token;
          let user = rep.user;        

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('jwtToken', token);
          this.userSubject.next(user);
          this.menusSubject.next(user.menus);
          
          return user;
        })
      );

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.menusSubject.next(null);
    this.router.navigate(['/login']);
  }









}

import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'CompagnWebApp';
  public menusList: any;
  public currentUser: any;

  private ngUnsubscribe = new Subject<void>();

  constructor(private upperCasePipe: UpperCasePipe, private authService: AuthenticationService, private router: Router) {

    this.setCurrentUser();
    this.setCurrentMenues();

  }
  
  setCurrentUser() {
    this.authService.user.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.currentUser = x;
        if(!this.currentUser)
          this.router.navigate(['login']);
      });
  }

  setCurrentMenues() {
    this.authService.menus
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.menusList = x;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void { }

  getConnectedUserName() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userName = currentUser ? this.upperCasePipe.transform(currentUser.lastName) + ' ' + currentUser.firstName : '';

    return userName;

  }

  getEspaceName() {
    
    let currentUser = this.authService.userValue;    
    let espaceName = '';

    if (currentUser) {
      if (currentUser.roleId == 1)
        espaceName = "Admin"
      else if (currentUser.roleId == 2)
        espaceName = "Client";
      else
        espaceName = "Agent"
    }

    return espaceName;
  }

  logout() {
    this.authService.logout();
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../entity/User";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {SessionService} from "../../service/session.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
  private userService: UserService;
  sessionService: SessionService;
  private router: Router;

  user: User;

  private subscription: Subscription;

  constructor(userService: UserService,
              sessionService: SessionService,
              router: Router) {
    this.userService = userService;
    this.sessionService = sessionService;
    this.router = router;
  }

  ngOnInit(): void {
    this.subscription = this.userService.updateCurrentUser()
      .subscribe(result => {
        this.user = result;
      });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  getUserName(): string {
    if (this.userService.isUserPresent(this.user))
      return this.user.firstName + ' ' + this.user.lastName;
    return 'Мой профиль';
  }

  logOut() {
    this.userService.logOut();
    this.doTransferToMainPage();
  }

  doTransferToMainPage() {
    this.router.navigate(['/']);
  }
}

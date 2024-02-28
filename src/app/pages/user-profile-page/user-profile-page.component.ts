import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../entity/User";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {SessionService} from "../../service/session.service";
import {UrlService} from "../../service/url.service";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;
  private userService: UserService;
  private sessionService: SessionService;
  private urlService: UrlService;

  user: User;

  private subscriptionParams: Subscription;
  private subscriptionUser: Subscription;

  constructor(activatedRoute: ActivatedRoute,
              userService: UserService,
              sessionService: SessionService,
              urlService: UrlService) {
    this.activatedRoute = activatedRoute;
    this.userService = userService;
    this.sessionService = sessionService;
    this.urlService = urlService;
  }

  ngOnInit(): void {
    this.subscriptionParams = this.activatedRoute.params
      .subscribe(params => {
        let userId: bigint = params['id'];

        this.subscriptionUser = this.userService.getUserById(userId)
          .subscribe(result => {
            this.user = result;
          })
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptionParams)
      this.subscriptionParams.unsubscribe();
    if (this.subscriptionUser)
      this.subscriptionUser.unsubscribe();
  }

  getButtonBackRoute(): string {
    if (this.sessionService.isCurrentUserAdmin()) {
        return '/user-list';
    } else {
      return null;
    }
  }
}

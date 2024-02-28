import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  private activatedRoute: ActivatedRoute;

  firstName: string;
  lastName: string;
  email: string;

  private subscription1: Subscription;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.subscription1 = this.activatedRoute.queryParams
      .subscribe(params => {
      this.firstName = params['first_name'];
      this.lastName = params['last_name'];
      this.email = params['email'];
    });
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
  }
}

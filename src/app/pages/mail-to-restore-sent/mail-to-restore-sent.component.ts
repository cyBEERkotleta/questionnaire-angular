import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mail-to-restore-sent',
  templateUrl: './mail-to-restore-sent.component.html',
  styleUrls: ['./mail-to-restore-sent.component.css']
})
export class MailToRestoreSentComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;

  email: string;

  private subscription1: Subscription;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.subscription1 = this.activatedRoute.queryParams
      .subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
  }
}

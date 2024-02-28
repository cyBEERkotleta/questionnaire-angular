import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-questionnaire-answers',
  templateUrl: './questionnaire-answers.component.html',
  styleUrls: ['./questionnaire-answers.component.css']
})
export class QuestionnaireAnswersComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;

  formId: bigint;

  private subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => {
        this.formId = params['id'];
      });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}

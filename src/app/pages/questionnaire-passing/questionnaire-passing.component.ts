import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FormService} from "../../service/form.service";
import {Form} from "../../entity/Form";

@Component({
  selector: 'app-questionnaire-passing',
  templateUrl: './questionnaire-passing.component.html',
  styleUrls: ['./questionnaire-passing.component.css']
})
export class QuestionnairePassingComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;
  private formService: FormService;

  form: Form;

  private subscriptionParams: Subscription;
  private subscriptionForm: Subscription;

  constructor(activatedRoute: ActivatedRoute,
              formService: FormService) {
    this.activatedRoute = activatedRoute;
    this.formService = formService;
  }

  ngOnInit(): void {
    this.subscriptionParams = this.activatedRoute.params
      .subscribe(params => {
        let formId = params['id'];

        this.subscriptionForm = this.formService.getFormById(formId)
          .subscribe(result => {
            this.form = result;
          });
      });
  }

  ngOnDestroy() {
    if (this.subscriptionParams)
      this.subscriptionParams.unsubscribe();
    if (this.subscriptionForm)
      this.subscriptionForm.unsubscribe();
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AnsweredForm} from "../../entity/AnsweredForm";
import {Subscription} from "rxjs";
import {AnsweredFormService} from "../../service/answered-form.service";

@Component({
  selector: 'app-manage-answers',
  templateUrl: './manage-answers.component.html',
  styleUrls: ['./manage-answers.component.css']
})
export class ManageAnswersComponent implements OnInit, OnDestroy {
  @Input() formId: bigint;

  answeredForms: AnsweredForm[];

  private answeredFormService: AnsweredFormService;

  loading = false;

  private subscriptionNewData: Subscription;

  constructor(answeredFormService: AnsweredFormService) {
    this.answeredFormService = answeredFormService;
  }

  ngOnInit() {
    this.loadAnswers();
  }

  ngOnDestroy() {
    if (this.subscriptionNewData)
      this.subscriptionNewData.unsubscribe();
  }

  private loadAnswers() {
    this.loading = true;

    if (this.subscriptionNewData)
      this.subscriptionNewData.unsubscribe();

    this.subscriptionNewData = this.answeredFormService.getAnsweredFormsByFormId(this.formId)
      .subscribe(result => {
        this.answeredForms = result;

        this.loading = false;
      });
  }
}

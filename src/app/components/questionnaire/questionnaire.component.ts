import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FieldService} from "../../service/field.service";
import {AnsweredFormService} from "../../service/answered-form.service";
import {Field} from "../../entity/Field";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Answer} from "../../entity/Answer";
import {AnsweredForm} from "../../entity/AnsweredForm";
import {FormService} from "../../service/form.service";
import {Form} from "../../entity/Form";
import {Router} from "@angular/router";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  @Input() formId: bigint;

  private formService: FormService;
  private fieldService: FieldService;
  private answeredFormService: AnsweredFormService;
  private router: Router;

  formGroup: FormGroup;
  formControls: FormControl<string>[] = [];

  form: Form;
  fields: Field[];

  globalError = '';
  showAllErrors = false;

  savingProcess = false;

  private subscriptionForm: Subscription;
  private subscriptionFields: Subscription;
  private subscriptionSaveAnswers: Subscription;

  constructor(formService: FormService,
              fieldService: FieldService,
              answeredFormService: AnsweredFormService,
              router: Router) {
    this.formService = formService;
    this.fieldService = fieldService;
    this.answeredFormService = answeredFormService;
    this.router = router;

    this.formGroup = new FormGroup({});
  }

  ngOnInit() {
    this.subscriptionFields = this.fieldService.getActiveFieldsByFormId(this.formId)
      .subscribe(result => {
        this.fields = result;

        this.addFormControls(this.fields.length);
      });

    this.subscriptionForm = this.formService.getFormById(this.formId)
      .subscribe(result => {
        this.form = result;
      });
  }

  ngOnDestroy() {
    if (this.subscriptionFields)
      this.subscriptionFields.unsubscribe();
    if (this.subscriptionSaveAnswers)
      this.subscriptionSaveAnswers.unsubscribe();
    if (this.subscriptionForm)
      this.subscriptionForm.unsubscribe();
  }

  private addFormControls(count: number) {
    for (let i = 0; i < count; i++) {
      let validators = [Validators.maxLength(300)];
      if (this.fields[i].required)
        validators.push(Validators.required);

      const control = new FormControl<string>('', validators);
      this.formGroup.addControl(`control${i}`, control);
      this.formControls.push(control);
    }
  }

  getControlByIndex(index: number): FormControl<string> {
    return this.formGroup.get(`control${index}`) as FormControl<string>;
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.savingProcess = true;
    this.saveAnswers();
    this.savingProcess = false;
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.globalError = 'Не все необходимые поля заполнены';
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  saveAnswers() {
    let answers: Answer[] = this.collectAnswers();
    let answeredForm = new AnsweredForm(null, answers, this.form);

    this.subscriptionSaveAnswers = this.answeredFormService.saveAnsweredForm(answeredForm)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.navigateToCongratsPage();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private collectAnswers(): Answer[] {
    let answers: Answer[] = [];

    for (let i = 0; i < this.formControls.length; i++) {
      let text = this.formControls[i].getRawValue();
      let answer = new Answer(null, text, this.fields[i]);
      answers.push(answer);
    }
    return answers;
  }

  clearAllFields() {
    location.reload();
  }

  private navigateToCongratsPage() {
    this.router.navigate(['/successful-form-passing']);
  }

  private isAnyErrorInFields(): boolean {
    for (let i = 0; i < this.formControls.length; i++) {
      if (this.doesControlHaveError(this.formControls[i]))
        return true;
    }
    return false;
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FieldService} from "../../service/field.service";
import {FormService} from "../../service/form.service";
import {Subscription} from "rxjs";
import {Form} from "../../entity/Form";
import {Field} from "../../entity/Field";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-fields',
  templateUrl: './manage-fields.component.html',
  styleUrls: ['./manage-fields.component.css']
})
export class ManageFieldsComponent implements OnInit, OnDestroy {
  @Input() formId: bigint;

  private fieldService: FieldService;
  private formService: FormService;
  private router: Router;

  form: Form;
  fields: Field[];

  globalError: string = '';

  private subscriptionFields: Subscription;
  private subscriptionForm: Subscription;
  private subscriptionDelete: Subscription;

  constructor(fieldService: FieldService,
              formService: FormService,
              router: Router) {
    this.fieldService = fieldService;
    this.formService = formService;
    this.router = router;
  }

  ngOnInit() {
    this.loadFields();
    this.loadForm();
  }

  ngOnDestroy() {
    if (this.subscriptionFields)
      this.subscriptionFields.unsubscribe();
    if (this.subscriptionForm)
      this.subscriptionForm.unsubscribe();
    if (this.subscriptionDelete)
      this.subscriptionDelete.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  deleteField(field: Field) {
    this.subscriptionDelete = this.fieldService.deleteField(field)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.loadFields();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private loadFields() {
    if (this.subscriptionFields)
      this.subscriptionFields.unsubscribe();

    this.subscriptionFields = this.fieldService.getFieldsByFormId(this.formId)
      .subscribe(result => {
        this.fields = result;
      });
  }

  private loadForm() {
    if (this.subscriptionForm)
      this.subscriptionForm.unsubscribe();

    this.subscriptionForm = this.formService.getFormById(this.formId)
      .subscribe(result => {
        this.form = result;
      });
  }

  navigateToAnswersPage() {
    this.router.navigate(['/questionnaire-answers', this.formId]);
  }
}

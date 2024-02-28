import {Component} from '@angular/core';
import {Form} from "../../entity/Form";
import {FormService} from "../../service/form.service";
import {Subscription} from "rxjs";
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent {
  deletedForm: Form;

  private formService: FormService;
  private modalDeleteWindowService: ModalDeleteWindowService;

  globalError: string = '';

  private subscription: Subscription;

  constructor(formService: FormService,
              modalDeleteWindowService: ModalDeleteWindowService) {
    this.formService = formService;
    this.modalDeleteWindowService = modalDeleteWindowService;

    this.deletedForm = this.modalDeleteWindowService.getDeletableObject() as Form;
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    this.deleteForm();
  }

  private deleteForm() {
    this.subscription = this.formService.deleteForm(this.deletedForm)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.modalDeleteWindowService.close();
          location.reload();
        }
        else {
          this.globalError = result.message;
        }
      });
  }
}

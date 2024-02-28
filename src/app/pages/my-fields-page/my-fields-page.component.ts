import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Field} from "../../entity/Field";
import {FieldService} from "../../service/field.service";
import {FormService} from "../../service/form.service";
import {Form} from "../../entity/Form";
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {ModalEditWindowService} from "../../service/modal-edit-window.service";
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";

@Component({
  selector: 'app-my-fields-page',
  templateUrl: './my-fields-page.component.html',
  styleUrls: ['./my-fields-page.component.css']
})
export class MyFieldsPageComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;

  modalCreateWindow: ModalCreateWindowService;
  modalEditWindow: ModalEditWindowService;
  modalDeleteWindow: ModalDeleteWindowService;

  formId: bigint;

  private subscriptionParams: Subscription;

  constructor(activatedRoute: ActivatedRoute,
              modalCreateWindow: ModalCreateWindowService,
              modalEditWindow: ModalEditWindowService,
              modalDeleteWindow: ModalDeleteWindowService) {
    this.activatedRoute = activatedRoute;

    this.modalCreateWindow = modalCreateWindow;
    this.modalEditWindow = modalEditWindow;
    this.modalDeleteWindow = modalDeleteWindow;
  }

  ngOnInit() {
    this.subscriptionParams = this.activatedRoute.params
      .subscribe(params => {
          this.formId = params['id'];
        }
      );
  }

  ngOnDestroy() {
    if (this.subscriptionParams)
      this.subscriptionParams.unsubscribe();
  }
}

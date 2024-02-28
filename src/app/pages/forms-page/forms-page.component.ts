import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {FormService} from "../../service/form.service";
import {ActivatedRoute} from "@angular/router";
import {TopicService} from "../../service/topic.service";
import {Topic} from "../../entity/Topic";
import {Form} from "../../entity/Form";
import {Subscription} from "rxjs";
import {FieldService} from "../../service/field.service";
import {ModalEditWindowService} from "../../service/modal-edit-window.service";
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.css']
})
export class FormsPageComponent implements OnInit, OnDestroy {
  private activatedRoute: ActivatedRoute;
  sessionService: SessionService;

  loading = false;
  private formsLoaded = false;
  private topicLoaded = false;
  private fieldCountsLoaded = false;

  term: string = '';

  formService: FormService;
  topicService: TopicService;
  private fieldService: FieldService;

  modalCreateService: ModalCreateWindowService;
  modalEditService: ModalEditWindowService;
  modalDeleteService: ModalDeleteWindowService;

  topic: Topic;
  forms: Form[];
  fieldCounts: number[];

  private subscription1: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription;

  constructor(formService: FormService,
              topicService: TopicService,
              fieldService: FieldService,
              activatedRoute: ActivatedRoute,
              sessionService: SessionService,

              modalCreateService: ModalCreateWindowService,
              modalEditService: ModalEditWindowService,
              modalDeleteService: ModalDeleteWindowService) {
    this.formService = formService;
    this.topicService = topicService;
    this.fieldService = fieldService;
    this.activatedRoute = activatedRoute;
    this.sessionService = sessionService;

    this.modalCreateService = modalCreateService;
    this.modalEditService = modalEditService;
    this.modalDeleteService = modalDeleteService;
  }

  ngOnInit() {
    this.subscription1 = this.activatedRoute.params.subscribe(params => {
      let topicId = params['topic_id'];

      this.loading = true;

      this.subscription2 = this.topicService.getTopicById(topicId).subscribe(result => {
        this.topicLoaded = true;
        this.topic = result;
        this.checkLoading();
      });

      this.subscription3 = this.formService.getFormsByTopicId(topicId)
        .subscribe(result => {
          this.forms = result;
          this.formsLoaded = true;
          this.checkLoading();
        });

      this.subscription4 = this.fieldService.getFieldCountsOfTopicForms(topicId)
        .subscribe(result => {
          this.fieldCounts = result;
          this.fieldCountsLoaded = true;
          this.checkLoading();
        });
    });
  }

  getTopicName() {
    if (this.topic) {
      return '"' + this.topic.name + '"';
    }
    return '';
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
    if (this.subscription3)
      this.subscription3.unsubscribe();
    if (this.subscription4)
      this.subscription4.unsubscribe();
  }

  private checkLoading() {
    if (this.formsLoaded && this.topicLoaded && this.fieldCountsLoaded)
      this.loading = false;
  }
}

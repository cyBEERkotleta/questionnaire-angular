import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TopicService} from "../../service/topic.service";
import {Topic} from "../../entity/Topic";
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnDestroy {
  private topicService: TopicService;
  private modalService: ModalCreateWindowService;
  private router: Router;

  showAllErrors = false;
  globalError: string = '';

  private subscription: Subscription;

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.required
    ]),
    description: new FormControl<string>('', [
      Validators.maxLength(250)
    ])
  });

  constructor(topicService: TopicService,
              modalService: ModalCreateWindowService,
              router: Router) {
    this.topicService = topicService;
    this.modalService = modalService;
    this.router = router;
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    if (this.anyErrorExists())
      return;

    this.addTopic();
  }

  private anyErrorExists(): boolean {
    this.resetGlobalError();

    if (this.isAnyErrorInFields()) {
      this.showAllErrors = true;
      return true;
    }
    return false;
  }

  private addTopic() {
    let topic = this.createTopicFromFields();

    this.subscription = this.topicService.saveTopic(topic)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.modalService.close();
          location.reload();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private resetGlobalError() {
    this.globalError = '';
  }

  private createTopicFromFields(): Topic {
    let name = this.getNameFromField();
    let description = this.getDescriptionFromField();

    return new Topic(null, name, description);
  }

  private getNameFromField(): string {
    return this.form.controls.name.getRawValue();
  }

  private getDescriptionFromField(): string {
    return this.form.controls.description.getRawValue();
  }

  private isAnyErrorInFields(): boolean {
    return this.doesControlHaveError(this.form.controls.name) ||
      this.doesControlHaveError(this.form.controls.description);
  }

  private doesControlHaveError(formControl: FormControl): boolean {
    return formControl.errors != null;
  }
}

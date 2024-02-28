import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {INamed} from "../../additional/INamed";
import {TopicService} from "../../service/topic.service";
import {Topic} from "../../entity/Topic";

@Component({
  selector: 'app-combobox-topic',
  templateUrl: './combobox-topic.component.html',
  styleUrls: ['./combobox-topic.component.css']
})
export class ComboboxTopicComponent {
  @Input() formElement: FormControl<Topic>;
  @Input() fieldName: string;
  @Input() showError: boolean = false;

  @Output() listenerToValueChangeReady = new EventEmitter();

  topics: Topic[];
  selectedTopic: Topic;

  private topicService: TopicService;

  private subscription1: Subscription;
  private subscription2: Subscription;

  topicsLoaded = false;

  constructor(topicService: TopicService) {
    this.topicService = topicService;
  }

  ngOnInit() {
    this.subscription1 = this.topicService.getAll()
      .subscribe(topics => {
        this.topics = topics;
        this.topicsLoaded = true;
      });

    this.subscription2 = this.formElement.valueChanges
      .subscribe(topic => {
        this.selectedTopic = topic;
      });
    this.listenerToValueChangeReady.emit();
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
  }


  onChange(item: INamed) {
    this.selectedTopic = item as Topic;
    this.formElement.setValue(this.selectedTopic);
  }

  isFieldRequired(): boolean {
    return this.formElement.hasValidator(Validators.required);
  }
}

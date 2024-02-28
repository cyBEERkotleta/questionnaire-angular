import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {TopicService} from "../../service/topic.service";
import {Topic} from "../../entity/Topic";
import {SessionService} from "../../service/session.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topics-page',
  templateUrl: './topics-page.component.html',
  styleUrls: ['./topics-page.component.css']
})
export class TopicsPageComponent implements OnInit, OnDestroy {
  loading = false;
  term: string = '';

  topicService: TopicService;
  modalService: ModalCreateWindowService;
  sessionService: SessionService;

  topics: Topic[];

  private subscription1: Subscription;

  constructor(topicService: TopicService,
              modalService: ModalCreateWindowService,
              sessionService: SessionService) {
    this.topicService = topicService;
    this.modalService = modalService;
    this.sessionService = sessionService;
  }

  ngOnInit() {
    this.loading = true;

    this.subscription1 = this.topicService.getAll()
      .subscribe(result => {
        this.topics = result;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
  }
}

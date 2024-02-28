import {Component, OnDestroy} from '@angular/core';
import {ModalDeleteWindowService} from "../../service/modal-delete-window.service";
import {Subscription} from "rxjs";
import {TopicService} from "../../service/topic.service";
import {Topic} from "../../entity/Topic";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-topic',
  templateUrl: './delete-topic.component.html',
  styleUrls: ['./delete-topic.component.css']
})
export class DeleteTopicComponent implements OnDestroy {
  deletedTopic: Topic;

  private topicService: TopicService;
  private router: Router;
  private modalDeleteWindowService: ModalDeleteWindowService;

  globalError: string = '';

  private subscription: Subscription;

  constructor(topicService: TopicService,
              router: Router,
              modalDeleteWindowService: ModalDeleteWindowService) {
    this.topicService = topicService;
    this.router = router;
    this.modalDeleteWindowService = modalDeleteWindowService;

    this.deletedTopic = this.modalDeleteWindowService.getDeletableObject() as Topic;
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }

  submit() {
    this.deleteTopic();
  }

  private deleteTopic() {
    this.subscription = this.topicService.deleteTopic(this.deletedTopic)
      .subscribe(result => {
        console.log(result);
        if (result.success) {
          this.modalDeleteWindowService.close();
          this.navigateToTopicsPage();
        }
        else {
          this.globalError = result.message;
        }
      });
  }

  private navigateToTopicsPage() {
    this.router.navigate(['/topics']);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../service/form.service";
import {UserService} from "../../service/user.service";
import {Subscription} from "rxjs";
import {Form} from "../../entity/Form";
import {User} from "../../entity/User";
import {TopicService} from "../../service/topic.service";
import {FieldService} from "../../service/field.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-questionnaires',
  templateUrl: './manage-questionnaires.component.html',
  styleUrls: ['./manage-questionnaires.component.css']
})
export class ManageQuestionnairesComponent implements OnInit, OnDestroy {
  private formService: FormService;
  private userService: UserService;
  private topicService: TopicService;
  private fieldService: FieldService;

  private router: Router;

  user: User;
  forms: Form[];
  fieldCounts: number[];

  private subscriptionUser: Subscription;
  private subscriptionForms: Subscription;
  private subscriptionFieldCounts: Subscription;

  constructor(formService: FormService,
              userService: UserService,
              topicService: TopicService,
              fieldService: FieldService,

              router: Router) {
    this.formService = formService;
    this.userService = userService;
    this.topicService = topicService;
    this.fieldService = fieldService;

    this.router = router;
  }

  ngOnInit() {
    this.subscriptionUser = this.userService.updateCurrentUser()
      .subscribe(result => {
        this.user = result;

        this.subscriptionForms = this.formService.getFormsByUserId(this.user.id)
          .subscribe(forms => {
            this.forms = forms;
          });

        this.subscriptionFieldCounts = this.fieldService.getFieldCountsOfUserForms(this.user.id)
          .subscribe(fieldCounts => {
            this.fieldCounts = fieldCounts;
          });
      });
  }

  ngOnDestroy() {
    if (this.subscriptionUser)
      this.subscriptionUser.unsubscribe();
    if (this.subscriptionForms)
      this.subscriptionForms.unsubscribe();
    if (this.subscriptionFieldCounts)
      this.subscriptionFieldCounts.unsubscribe();
  }

  getRouterLinkForForm(index: number) {
    this.router.navigate(['/my-form-fields', this.forms[index].id]);
  }
}

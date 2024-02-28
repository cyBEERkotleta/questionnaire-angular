import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {ModalCreateWindowService} from "../../service/modal-create-window.service";
import {User} from "../../entity/User";
import {SessionService} from "../../service/session.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  loading = false;
  term: string = '';

  userService: UserService;
  modalService: ModalCreateWindowService;

  users: User[];

  private subscription1: Subscription;

  constructor(userService: UserService,
              modalService: ModalCreateWindowService) {
    this.userService = userService;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.loading = true;

    this.subscription1 = this.userService.getAll()
      .subscribe(result => {
        this.users = result;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    if (this.subscription1)
      this.subscription1.unsubscribe();
  }
}

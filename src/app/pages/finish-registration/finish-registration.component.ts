import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../entity/User";
import {GenderService} from "../../service/gender.service";
import {SessionService} from "../../service/session.service";

@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.css']
})
export class FinishRegistrationComponent implements OnInit, OnDestroy {
  private userService: UserService;
  private genderService: GenderService;
  private activatedRoute: ActivatedRoute;

  successfulReg = false;
  globalError: string = '';

  private subscriptionParams: Subscription;
  private subscriptionGender: Subscription;
  private subscriptionFinishReg: Subscription;

  constructor(userService: UserService,
              activatedRoute: ActivatedRoute,
              genderService: GenderService) {
    this.userService = userService;
    this.activatedRoute = activatedRoute;
    this.genderService = genderService;
  }

  ngOnInit() {
    this.subscriptionParams = this.activatedRoute.queryParams
      .subscribe(params => {
        let email = params['email'];
        let firstName = params['first_name'];
        let lastName = params['last_name'];
        let phoneNumber = params['phone_number'];
        let hashedPassword = params['hashed'];
        let genderId: number = params['gender_id'];

        this.subscriptionGender = this.genderService.getGenderById(genderId)
          .subscribe(gender => {
            let user = new User(null, email, firstName, lastName, phoneNumber, null, gender);

            this.subscriptionFinishReg = this.userService.finishRegistration(user, hashedPassword)
              .subscribe(result => {
                this.successfulReg = result.success;
                if (!result.success)
                  this.globalError = 'Ошибка при подтверждении регистрации: ' + result.message;
              });
          });
      });
  }

  ngOnDestroy() {
    if (this.subscriptionParams)
      this.subscriptionParams.unsubscribe();
    if (this.subscriptionGender)
      this.subscriptionGender.unsubscribe();
    if (this.subscriptionFinishReg)
      this.subscriptionFinishReg.unsubscribe();
  }

  isGlobalErrorSet(): boolean {
    return this.globalError != '';
  }
}

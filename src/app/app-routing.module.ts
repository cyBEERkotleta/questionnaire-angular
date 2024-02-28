import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {UserListComponent} from "./pages/user-list/user-list.component";
import {FinishRegistrationComponent} from "./pages/finish-registration/finish-registration.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ChangePasswordPageComponent} from "./pages/change-password-page/change-password-page.component";
import {
  SuccessfulPasswordChangeComponent
} from "./pages/successful-password-change/successful-password-change.component";
import {TopicsPageComponent} from "./pages/topics-page/topics-page.component";
import {FormsPageComponent} from "./pages/forms-page/forms-page.component";
import {ConfirmRegistrationComponent} from "./pages/confirm-registration/confirm-registration.component";
import {RestorePasswordPageComponent} from "./pages/restore-password-page/restore-password-page.component";
import {SuccessfulRestorationComponent} from "./pages/successful-restoration/successful-restoration.component";
import {
  EmailToRestorePasswordPageComponent
} from "./pages/email-to-restore-password-page/email-to-restore-password-page.component";
import {MailToRestoreSentComponent} from "./pages/mail-to-restore-sent/mail-to-restore-sent.component";
import {UserProfilePageComponent} from "./pages/user-profile-page/user-profile-page.component";
import {UserEditionPageComponent} from "./pages/user-edition-page/user-edition-page.component";
import {SuccessfulFormPassingComponent} from "./pages/successful-form-passing/successful-form-passing.component";
import {MyFormsPageComponent} from "./pages/my-forms-page/my-forms-page.component";
import {MyFieldsPageComponent} from "./pages/my-fields-page/my-fields-page.component";
import {QuestionnairePassingComponent} from "./pages/questionnaire-passing/questionnaire-passing.component";
import {QuestionnaireAnswersComponent} from "./pages/questionnaire-answers/questionnaire-answers.component";

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'register',
    component: RegistrationPageComponent
  },
  {
    path: 'finish-registration',
    component: FinishRegistrationComponent
  },
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'error-page',
    component: ErrorPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordPageComponent
  },
  {
    path: 'successful-password-change',
    component: SuccessfulPasswordChangeComponent
  },
  {
    path: 'topics',
    component: TopicsPageComponent
  },
  {
    path: 'forms-by-topic/:topic_id',
    component: FormsPageComponent
  },
  {
    path: 'confirm-registration',
    component: ConfirmRegistrationComponent
  },
  {
    path: 'restore',
    component: RestorePasswordPageComponent
  },
  {
    path: 'successful-restoration',
    component: SuccessfulRestorationComponent
  },
  {
    path: 'email-to-restore-password',
    component: EmailToRestorePasswordPageComponent
  },
  {
    path: 'mail-to-restore-sent',
    component: MailToRestoreSentComponent
  },
  {
    path: 'user-profiles/:id',
    component: UserProfilePageComponent
  },
  {
    path: 'edit-my-profile',
    component: UserEditionPageComponent
  },
  {
    path: 'successful-form-passing',
    component: SuccessfulFormPassingComponent
  },
  {
    path: 'my-forms',
    component: MyFormsPageComponent
  },
  {
    path: 'my-form-fields/:id',
    component: MyFieldsPageComponent
  },
  {
    path: 'questionnaires/:id',
    component: QuestionnairePassingComponent
  },
  {
    path: 'questionnaire-answers/:id',
    component: QuestionnaireAnswersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

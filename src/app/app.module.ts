import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { UserRowComponent } from "./components/user-row/user-row.component";
import { ErrorComponent } from './components/error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterUsersPipe } from './pipes/filter-users.pipe';
import { ModalCreateWindow } from './components/modal-create-window/modal-create-window.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { FieldNameComponent } from './little-components/field-name/field-name.component';
import { TextFieldComponent } from './little-components/text-field/text-field.component';
import { TextFieldPlaceholderComponent } from './little-components/text-field-placeholder/text-field-placeholder.component';
import { HorizontalLineComponent } from './little-components/horizontal-line/horizontal-line.component';
import { DarkHLineComponent } from './little-components/dark-h-line/dark-h-line.component';
import { LightHLineComponent } from './little-components/light-h-line/light-h-line.component';
import { ChoiceGenderComponent } from './little-components/choice-gender/choice-gender.component';
import { RadioButtonGroupComponent } from './little-components/radio-button-group/radio-button-group.component';
import { FieldValidatorComponent } from './little-components/field-validator/field-validator.component';
import { ErrorParagraphComponent } from './little-components/error-paragraph/error-paragraph.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { NarrowAreaComponent } from './components/narrow-area/narrow-area.component';
import { AboutTextComponent } from './components/about-text/about-text.component';
import {AppRoutingModule} from "./app-routing.module";
import { UserListComponent } from './pages/user-list/user-list.component';
import { LogotypeTextComponent } from './little-components/logotype-text/logotype-text.component';
import { FinishRegistrationComponent } from './pages/finish-registration/finish-registration.component';
import { PlainParagraphComponent } from './little-components/plain-paragraph/plain-paragraph.component';
import { ButtonBackToMainComponent } from './little-components/button-back-to-main/button-back-to-main.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LargeAreaComponent } from './components/large-area/large-area.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MiddleControlComponent } from './little-components/middle-control/middle-control.component';
import { SuccessfulPasswordChangeComponent } from './pages/successful-password-change/successful-password-change.component';
import { TopicsPageComponent } from './pages/topics-page/topics-page.component';
import { TopicItemComponent } from './components/topic-item/topic-item.component';
import { FilterTopicsPipe } from './pipes/filter-topics.pipe';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { FormItemInListComponent } from './components/form-item-in-list/form-item-in-list.component';
import { FilterFormsPipe } from './pipes/filter-forms.pipe';
import { CheckboxComponent } from './little-components/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './little-components/checkbox-group/checkbox-group.component';
import { CheckboxSingleComponent } from './little-components/checkbox-single/checkbox-single.component';
import { ConfirmRegistrationComponent } from './pages/confirm-registration/confirm-registration.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { SuccessfulRestorationComponent } from './pages/successful-restoration/successful-restoration.component';
import { EmailToRestorePasswordPageComponent } from './pages/email-to-restore-password-page/email-to-restore-password-page.component';
import { MailToRestoreSentComponent } from './pages/mail-to-restore-sent/mail-to-restore-sent.component';
import { TextFieldPasswordComponent } from './little-components/text-field-password/text-field-password.component';
import { TextFieldPasswordPlaceholderComponent } from './little-components/text-field-password-placeholder/text-field-password-placeholder.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserEditionPageComponent } from './pages/user-edition-page/user-edition-page.component';
import { SuccessfulFormPassingComponent } from './pages/successful-form-passing/successful-form-passing.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { MyFormsPageComponent } from './pages/my-forms-page/my-forms-page.component';
import { ManageQuestionnairesComponent } from './components/manage-questionnaires/manage-questionnaires.component';
import { LargeAreaWithOpenModalButtonComponent } from './components/large-area-with-open-modal-button/large-area-with-open-modal-button.component';
import { ModalEditWindowComponent } from './components/modal-edit-window/modal-edit-window.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ButtonAddNewComponent } from './little-components/button-add-new/button-add-new.component';
import { ComboboxComponent } from './little-components/combobox/combobox.component';
import { ComboboxTopicComponent } from './little-components/combobox-topic/combobox-topic.component';
import { MultiLineTextComponent } from './little-components/multi-line-text/multi-line-text.component';
import { ModalDeleteWindowComponent } from './components/modal-delete-window/modal-delete-window.component';
import { ButtonEditComponent } from './little-components/button-edit/button-edit.component';
import { ButtonDeleteComponent } from './little-components/button-delete/button-delete.component';
import { DeleteFormComponent } from './components/delete-form/delete-form.component';
import { CreateFormChooseTopicComponent } from './components/create-form-choose-topic/create-form-choose-topic.component';
import { MyFieldsPageComponent } from './pages/my-fields-page/my-fields-page.component';
import { ManageFieldsComponent } from './components/manage-fields/manage-fields.component';
import { CreateFieldComponent } from './components/create-field/create-field.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { ComboboxFieldTypeComponent } from './little-components/combobox-field-type/combobox-field-type.component';
import { OptionListComponent } from './components/option-list/option-list.component';
import { LargeAreaWithActionButtonsComponent } from './components/large-area-with-action-buttons/large-area-with-action-buttons.component';
import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { DeleteTopicComponent } from './components/delete-topic/delete-topic.component';
import { QuestionnairePassingComponent } from './pages/questionnaire-passing/questionnaire-passing.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { ChoiceDateComponent } from './little-components/choice-date/choice-date.component';
import { FlexibleFieldControlComponent } from './little-components/flexible-field-control/flexible-field-control.component';
import { ComboboxOptionsComponent } from './little-components/combobox-options/combobox-options.component';
import { RadioOptionsComponent } from './little-components/radio-options/radio-options.component';
import { CheckboxOptionsComponent } from './little-components/checkbox-options/checkbox-options.component';
import { ChoiceDateStringComponent } from './little-components/choice-date-string/choice-date-string.component';
import { CheckboxOptionsStringComponent } from './little-components/checkbox-options-string/checkbox-options-string.component';
import { ComboboxOptionsStringComponent } from './little-components/combobox-options-string/combobox-options-string.component';
import { RadioOptionsStringComponent } from './little-components/radio-options-string/radio-options-string.component';
import { QuestionnaireAnswersComponent } from './pages/questionnaire-answers/questionnaire-answers.component';
import { ManageAnswersComponent } from './components/manage-answers/manage-answers.component';
import { AnsweredFormItemComponent } from './components/answered-form-item/answered-form-item.component';
import { AnswerItemComponent } from './components/answer-item/answer-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserRowComponent,
    ErrorComponent,
    FilterUsersPipe,
    ModalCreateWindow,
    CreateUserComponent,
    FieldNameComponent,
    TextFieldComponent,
    TextFieldPlaceholderComponent,
    HorizontalLineComponent,
    DarkHLineComponent,
    LightHLineComponent,
    ChoiceGenderComponent,
    RadioButtonGroupComponent,
    FieldValidatorComponent,
    ErrorParagraphComponent,
    NavigationMenuComponent,
    RegistrationPageComponent,
    NarrowAreaComponent,
    AboutTextComponent,
    UserListComponent,
    LogotypeTextComponent,
    FinishRegistrationComponent,
    PlainParagraphComponent,
    ButtonBackToMainComponent,
    MainPageComponent,
    LargeAreaComponent,
    ErrorPageComponent,
    LoginPageComponent,
    LoginUserComponent,
    ChangePasswordPageComponent,
    ChangePasswordComponent,
    MiddleControlComponent,
    SuccessfulPasswordChangeComponent,
    TopicsPageComponent,
    TopicItemComponent,
    FilterTopicsPipe,
    CreateTopicComponent,
    FormsPageComponent,
    FormItemInListComponent,
    FilterFormsPipe,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxSingleComponent,
    ConfirmRegistrationComponent,
    RestorePasswordComponent,
    RestorePasswordPageComponent,
    SuccessfulRestorationComponent,
    EmailToRestorePasswordPageComponent,
    MailToRestoreSentComponent,
    TextFieldPasswordComponent,
    TextFieldPasswordPlaceholderComponent,
    UserProfileComponent,
    UserProfilePageComponent,
    UserEditComponent,
    UserEditionPageComponent,
    SuccessfulFormPassingComponent,
    CreateFormComponent,
    MyFormsPageComponent,
    ManageQuestionnairesComponent,
    LargeAreaWithOpenModalButtonComponent,
    ModalEditWindowComponent,
    EditFormComponent,
    ButtonAddNewComponent,
    ComboboxComponent,
    ComboboxTopicComponent,
    MultiLineTextComponent,
    ModalDeleteWindowComponent,
    ButtonEditComponent,
    ButtonDeleteComponent,
    DeleteFormComponent,
    CreateFormChooseTopicComponent,
    MyFieldsPageComponent,
    ManageFieldsComponent,
    CreateFieldComponent,
    EditFieldComponent,
    ComboboxFieldTypeComponent,
    OptionListComponent,
    LargeAreaWithActionButtonsComponent,
    EditTopicComponent,
    DeleteTopicComponent,
    QuestionnairePassingComponent,
    QuestionnaireComponent,
    ChoiceDateComponent,
    FlexibleFieldControlComponent,
    ComboboxOptionsComponent,
    RadioOptionsComponent,
    CheckboxOptionsComponent,
    ChoiceDateStringComponent,
    CheckboxOptionsStringComponent,
    ComboboxOptionsStringComponent,
    RadioOptionsStringComponent,
    QuestionnaireAnswersComponent,
    ManageAnswersComponent,
    AnsweredFormItemComponent,
    AnswerItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

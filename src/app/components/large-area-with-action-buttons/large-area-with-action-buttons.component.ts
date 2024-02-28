import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UrlService} from "../../service/url.service";

@Component({
  selector: 'app-large-area-with-action-buttons',
  templateUrl: './large-area-with-action-buttons.component.html',
  styleUrls: ['./large-area-with-action-buttons.component.css']
})
export class LargeAreaWithActionButtonsComponent {
  @Input() title: string;
  @Input() itemToPerformActionsWith: Object;
  @Input() buttonBackRoute: [string] | [string, bigint];
  @Input() buttonsAvailable: boolean = true;

  private router: Router;
  private urlService: UrlService;

  constructor(router: Router,
              urlService: UrlService) {
    this.router = router;
    this.urlService = urlService;
  }

  navigateBack() {
    this.router.navigate(this.buttonBackRoute);
  }
}

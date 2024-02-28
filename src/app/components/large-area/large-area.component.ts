import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {UrlService} from "../../service/url.service";

@Component({
  selector: 'app-large-area',
  templateUrl: './large-area.component.html',
  styleUrls: ['./large-area.component.css']
})
export class LargeAreaComponent {
  @Input() title: string;
  @Input() buttonBackRoute: [string] | [string, bigint];

  private router: Router;
  private urlService: UrlService;

  constructor(router: Router,
              urlService: UrlService) {
    this.router = router;
    this.urlService = urlService;
  }

  /*navigateBack() {
    this.router.navigate([this.urlService.getLastPage()]);
  }*/
  navigateBack() {
    this.router.navigate(this.buttonBackRoute);
  }
}

import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-button-back-to-main',
  templateUrl: './button-back-to-main.component.html',
  styleUrls: ['./button-back-to-main.component.css']
})
export class ButtonBackToMainComponent {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  doTransfer() {
    this.router.navigate(['/']);
  }
}

import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private router: Router;

  private lastPage: string;
  private currentPage: string;

  constructor(router: Router) {
    this.router = router;

    this.subscribeToNavigationEvents();
  }

  private subscribeToNavigationEvents(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.saveCurrentPage();
      }
    });
  }

  private saveCurrentPage() {
    let currentPage = this.getCurrentRouterLink();

    let prevPage = this.getCurrentPage();
    if (prevPage != currentPage) {
      this.lastPage = prevPage;
      this.currentPage = currentPage;
    }
  }

  private getCurrentPage() {
    return this.currentPage;
  }

  getLastPage() {
    if (this.lastPage)
      return this.lastPage;
    return '/';
  }

  private getCurrentRouterLink(): string {
    const urlTree = this.router.createUrlTree([], {
      queryParamsHandling: 'merge',
      preserveFragment: true
    });

    return this.router.serializeUrl(urlTree);
  }
}

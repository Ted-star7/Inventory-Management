import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'Inventory-management';
  // hideSidebar: boolean = false;

  constructor(public router: Router) { }

  // ngOnInit() {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.checkRoute(event.urlAfterRedirects);
  //     }
  //   });
  // }
  // checkRoute(url: string) {
  //   const hideSidebarRoutes = ['', '/login'];
  //   this.hideSidebar = hideSidebarRoutes.includes(url);
  // }





  // toggleSidebar() {
  //   const sidebar = document.querySelector('.sidebar');
  //   sidebar?.classList.toggle('show');
  // }
}

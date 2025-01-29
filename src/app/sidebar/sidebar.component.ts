import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isSidebarHidden = false;
  isSmallScreen = false;

  navItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'fas fa-tachometer-alt' },
    { label: 'Inventory', link: '/inventory', icon: 'fas fa-boxes' },
    { label: 'Orders', link: '/orders', icon: 'fas fa-shopping-cart' },
    { label: 'Purchase', link: '/purchase', icon: 'fas fa-shopping-bag' },
    { label: 'Manage', link: '/manage', icon: 'fas fa-cog' },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 768;
    }
  }


 
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const outlet = document.querySelector('.outlet') as HTMLElement;

    // Toggle the 'show' class on the sidebar for smooth animation
    if (this.isSidebarHidden) {
      sidebar.classList.remove('show');
      outlet.classList.remove('sidebar-visible');
    } else {
      sidebar.classList.add('show');
      outlet.classList.add('sidebar-visible');
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = event.target.innerWidth < 768;
      if (!this.isSmallScreen) {
        this.isSidebarHidden = false;
      }
    }
  }

  logout() {
    console.log('Logout clicked');
   
  }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionService } from '../services/session.service';

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

  userName: string = 'User'; // Default placeholder
  role: string = 'Role'; // Default placeholder

  navItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'fas fa-tachometer-alt' },
    { label: 'Inventory', link: '/inventory', icon: 'fas fa-boxes' },
    { label: 'Orders', link: '/orders', icon: 'fas fa-shopping-cart' },
    { label: 'Purchase', link: '/purchase', icon: 'fas fa-shopping-bag' },
  ];

  constructor(private sessionService: SessionService) {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 768;
    }

    // Fetch stored user data from session
    this.userName = this.sessionService.getuserName() || 'User';
    this.role = this.sessionService.getrole() || 'Role';

    // Add 'Manage' and 'Admin' links only if the user is a Superadmin
    if (this.role.toLowerCase() === 'superadmin') {
      this.navItems.push(
        { label: 'Manage', link: '/manage', icon: 'fas fa-cog' },
        { label: 'Admin', link: '/signup', icon: 'fas fa-cog' }
      );
    }
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const outlet = document.querySelector('.outlet') as HTMLElement;

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
    this.sessionService.deleteSessions(); // Clear session on logout
  }
}

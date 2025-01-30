import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ConsumeService } from '../services/consume.service';
import { SessionService } from '../services/session.service';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor, NgClass],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  users: any[] = [];
  token: string | null = null; 

  constructor(
    private router: Router,
    private consumeService: ConsumeService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.token = this.sessionService.getToken(); 
    if (!this.token) {
      console.error('Token not found! Please log in.');
      return;
    }
    this.getUsers();
  }

  
  getUsers(): void {
    if (!this.token) {
      console.error('Token is missing!');
      return;
    }

    this.consumeService.getRequest('/api/open/superadmin/users', this.token).subscribe(
      (data) => {
        this.users = data; // Store users data
        console.log('Users fetched successfully:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Activate a user
  activateUser(userId: string): void {
    if (!this.token) {
      console.error('Token is missing!');
      return;
    }

    this.consumeService.putRequest(`/api/open/users/activate/${userId}`, {}, this.token).subscribe(
      (response) => {
        console.log('User activated:', response);
        this.getUsers(); 
      },
      (error) => {
        console.error('Error activating user:', error);
      }
    );
  }

  // Deactivate a user
  deactivateUser(userId: string): void {
    if (!this.token) {
      console.error('Token is missing!');
      return;
    }

    this.consumeService.putRequest(`/api/open/users/deactivate/${userId}`, {}, this.token).subscribe(
      (response) => {
        console.log('User deactivated:', response);
        this.getUsers(); // Refresh the users list
      },
      (error) => {
        console.error('Error deactivating user:', error);
      }
    );
  }

 
  navigatesignup(): void {
    this.router.navigate(['/signup']);
  }
}

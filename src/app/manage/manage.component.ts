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
        console.log('Raw API Response:', data); // Debugging Step 1
        this.users = data.map((user: any) => ({
          id: user.id || user.userId || user._id,  
          userName: user.userName,
          status: user.status,
          role: user.role,
          email: user.email,
        }));
        console.log('Formatted Users:', this.users); // Debugging Step 2
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
      (response: any) => {
        if (response.status === 200) {
          console.log('User activated successfully:', response.message);
          alert(`Success: ${response.message}`); // Display message
          this.getUsers(); // Refresh user list
        } else {
          console.error('Activation failed:', response.message);
          alert(`Error: ${response.message}`);
        }
      },
      (error) => {
        console.error('Error activating user:', error);
        alert('Failed to activate user. Please try again.');
      }
    );
  }

  // Deactivate a user
  deactivateUser(userId: string | undefined): void {
    if (!userId) {
      console.error('Error: User ID is undefined!');
      alert('Error: User ID is missing.');
      return;
    }

    if (!this.token) {
      console.error('Token is missing!');
      return;
    }

    console.log(`Deactivating user with ID: ${userId}`);

    this.consumeService.putRequest(`/api/open/users/deactivate/${userId}`, {}, this.token).subscribe(
      (response: any) => {
        if (response.status === 200) {
          console.log('User deactivated successfully:', response.message);
          alert(`Success: ${response.message}`);
          this.getUsers();
        } else {
          console.error('Deactivation failed:', response.message);
          alert(`Error: ${response.message}`);
        }
      },
      (error) => {
        console.error('Error deactivating user:', error);
        alert('Failed to deactivate user. Please try again.');
      }
    );
  }




 
  navigatesignup(): void {
    this.router.navigate(['/signup']);
  }
}
